const Service = require("node-windows").Service;
const svc = new Service({
  name: "Real_Node_Server1",
  description: "real project deployment port-8000 folder name build-server",
  script: "C:\\xampp\\htdocs\\build-server\\index.js",
});
svc.on("install", function () {
  svc.start();
});
svc.install();
