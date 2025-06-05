/** @format */
require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const Redis = require("ioredis");
const app = express();
const bcrypt = require("bcryptjs");
const server = http.createServer(app);
const redis = new Redis(process.env.REDIS_URL, {
  tls: {}, // Required by Upstash to enable SSL
}); // defaults to localhost:6379
const allowedOrigins = ['http://localhost:3000',  process.env.FRONTEND_URL];
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST'],
    credentials: true,
  }
});
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, credentials: true,
}));
app.use(express.json());


io.on("connection", (socket) => {
  socket.on("hold-seat", async ({ seat }) => {
    const seatKey = `${seat.Id}:${seat.travelDate}:${seat.departureTime}:${seat.bus}:${seat.seatNumber}`;
    const existing = await redis.get(seatKey);
    if (existing) return; // Seat already held
    // Store seat with owner info
    const seatWithOwner = { ...seat, owner: socket.id };
    await redis.set(seatKey, JSON.stringify(seatWithOwner), "EX", 60 * 30); // 30 mins
    await redis.sadd("active:seats", seatKey);           // Track active seats
    await redis.sadd(`user:${socket.id}`, seatKey);      // Track user's seats

    io.emit("seat-held", { seat });
  });

  socket.on("release-seat", async ({ seat }) => {
    const seatKey = `${seat.Id}:${seat.travelDate}:${seat.departureTime}:${seat.bus}:${seat.seatNumber}`;
    const exists = await redis.get(seatKey);
    if (!exists) return;

    await redis.del(seatKey);
    await redis.srem("active:seats", seatKey);
    await redis.srem(`user:${socket.id}`, seatKey);

    io.emit("seat-released", { seat });
  });

  socket.on("filter-seat", async ({ seat }) => {
    
    const pattern = `${seat.Id}:${seat.travelDate}:${seat.departureTime}:${seat.bus}:*`;
    const keys = await redis.keys(pattern);
    const values = await Promise.all(keys.map((k) => redis.get(k)));
    const availableSeats = values.map((v) => JSON.parse(v));
    io.emit("seat-filtered", { availableSeats });
  });

  socket.on("confirm-seat", async ({ seat }) => {
    const seatKey = `${seat.Id}:${seat.travelDate}:${seat.departureTime}:${seat.bus}:${seat.seatNumber}`;
    const exists = await redis.get(seatKey);
    if (!exists) return;

    await redis.del(seatKey);
    await redis.srem("active:seats", seatKey);
    await redis.srem(`user:${socket.id}`, seatKey);

    io.emit("seat-confirmed", { seat });
  });

  // Clean up expired seats every 10 seconds
  setInterval(async () => {
    const seatKeys = await redis.smembers("active:seats");
    //console.log(seatKeys);
    for (const key of seatKeys) {
      const exists = await redis.exists(key);
      if (!exists) {
        await redis.srem("active:seats", key);
        const [Id, travelDate, departureTime, bus, seatNumber] = key.split(":");
        const seat = { Id, travelDate, departureTime, bus, seatNumber };
       /// console.log(seat);
        io.emit("seat-released", { seat });
      }
    }
  }, 10000);

  // When a user disconnects, release all their held seats
  socket.on("disconnect", async () => {
    const seatKeys = await redis.smembers(`user:${socket.id}`);
    for (const key of seatKeys) {
      await redis.del(key);
      await redis.srem("active:seats", key);
      const [Id, travelDate, departureTime, bus, seatNumber] = key.split(":");
      const seat = { Id, travelDate, departureTime, bus, seatNumber };
      io.emit("seat-released", { seat });
    }
    await redis.del(`user:${socket.id}`);
  });
});

// redis.on('connect', () => console.log('✅ Redis connected'));
// redis.on('error', err => console.error('Redis error:', err));
const db = require("./models");
// db.sequelize.sync({ alter: true }).then(() => {
//   // initialRole();
//   // initialStatus();
//   // initialUser();
//   console.log(
//     "$$$$$$----------$$$$$  table create is success  $$$$$----------$$$$$"
//   );
// });

require("./router/auth")(app);
require("./router/bus")(app);
require("./router/busDepartureTime")(app);
require("./router/busType")(app);
require("./router/busUpdateHistory")(app);
require("./router/city")(app);
require("./router/payment")(app);
require("./router/region")(app);
require("./router/reserve")(app);
require("./router/reserveSeat")(app);
require("./router/role")(app);
require("./router/route")(app);
require("./router/status")(app);
require("./router/user")(app);
require("./router/userUpdateHistory")(app);
require("./router/zone")(app);
require("./router/sendCode")(app);
server.listen(process.env.PORT||3000, () => {
  console.log(process.env.PORT, "port listen...");
});

const initialRole = async () => {
  await db.models.Role.bulkCreate([
    { roleName: "SuperAdmin" },
    { roleName: "Admin" },
    { roleName: "TBA" },
    { roleName: "Ticket Seller" },
    { roleName: "Car Attendant" },
  ]);
};

const initialStatus = async () => {
  await db.models.Status.bulkCreate([
    { status: "active" },
    { status: "inactive" },
    { status: "completed" },
    { status: "cancelled" },
    { status: "pending" },
    { status: "failed" },
    { status: "success" },
    
  ]);
};

const initialUser = async () => {
  await bcrypt.hash(process.env.SUPER_PASSWORD, 10, async function (err, hash) {
    if (err) return res.json(err);
    await db.models.User.create({
      userName: process.env.SUPER_USERNAME,
      passwordHash: hash,
      phoneNumber: process.env.SUPER_PHONE,
      fullName: "Super admin",
      email: process.env.SUPER_EMAIL,
      roleId: process.env.SUPER_ROLE,
      securityStamp: Math.random().toString(36).substring(2, 15),
      isActive: true,
      emailConfirmed: true,
      phoneNumberConfirmed: true,
      twoFactorEnabled: true,
      lockOutEndDateUtc: null,
      lockoutEnabled: false,
      accessFailedCount: 0, // Change the security stamp
    });
  });
};
//const config = {
//   baseUrl: "https://api.telebirr.com",
//   appKey: "YOUR_APP_KEY",
//   appSecret: "YOUR_APP_SECRET",
//   notifyUrl: "https://yourdomain.com/payment/callback",
//   returnUrl: "https://yourdomain.com/payment/success",
// };

// // Function to apply Fabric token
// async function applyFabricToken() {
//   const response = await fetch(`${config.baseUrl}/payment/v1/token`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-APP-Key": config.appKey,
//     },
//     body: JSON.stringify({
//       appSecret: config.appSecret,
//     }),
//   });
//   const result = await response.json();
//   return result.data.accessToken; // Assuming response structure
// }

// // Create Order route
// app.post("/create/order", async (req, res) => {
//   try {
//     const { title, amount } = req.body;
//     const token = await applyFabricToken();

//     const orderPayload = {
//       outTradeNo: "ORDER_" + Date.now(),
//       totalAmount: amount,
//       subject: title,
//       notifyUrl: config.notifyUrl,
//       returnUrl: config.returnUrl,
//       shortCode: "YOUR_SHORT_CODE",
//       timeoutExpress: "30",
//     };

//     const response = await fetch(`${config.baseUrl}/payment/v1/order/create`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(orderPayload),
//     });

//     const result = await response.json();
//     const assembledUrl = result.data.payUrl; // Assuming response contains payUrl

//     res.send(assembledUrl);
//   } catch (error) {
//     console.error("Order creation error:", error);
//     res.status(500).json({ error: "Failed to create payment order." });
//   }
// });

// // Payment Callback (notifyUrl) endpoint
// app.post("/payment/callback", (req, res) => {
//   console.log("Payment callback received:", req.body);
//   // ✅ Verify and process the payment notification
//   res.sendStatus(200);
// })
