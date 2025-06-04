const price = [600, 1200, 2200, 3800, 5000];
let antionalProfit = [1, 0, 0, 0, 0];
let pr = 0;
const profit = [98, 218, 438, 798, 1098];
let totalSum = 0, startProfit = 98;
let reaminPrice = 150;
let index = 0;
let count = 0;
for (let i = 1; i <= 34; i++) {
   antionalProfit.map((v, p) => {
      let newVal = (p + 1) * 10;
      if (pr <= newVal && v > 1) {
         pr = newVal;
      }
      return;
   })
   totalSum += (startProfit + pr + 5);
   let result = true;
   index = price[index + 1] <= ((startProfit + pr) * 2) ? index + 1 : index;
   let op = index;
   console.log(`Day ${i}`, pr, totalSum, startProfit);
   // if (totalSum >= 5000) {
   //    while (result) {
   //       antionalProfit[4] = antionalProfit[4] + 1;
   //       console.log("!", totalSum, price[4], startProfit, reaminPrice, antionalProfit);
   //       totalSum -= price[4];
   //       startProfit += profit[4];
   //       console.log(totalSum);
   //       if (totalSum < 5000) {
   //          result = false;
   //       }
   //    }

   // }
   // else if (totalSum >= price[index]) {
   //    antionalProfit[index] = antionalProfit[index] + 1;
   //    console.log("!", totalSum, price[index], startProfit, reaminPrice, antionalProfit);
   //    totalSum -= price[index];
   //    startProfit += profit[index];
   //    console.log(totalSum);
   // } else if (totalSum + reaminPrice >= price[index]) {
   //    antionalProfit[index] = antionalProfit[index] + 1;
   //    console.log(totalSum, price[index], startProfit, reaminPrice, antionalProfit);
   //    let value = price[index] - totalSum;
   //    reaminPrice -= value;
   //    totalSum = 0;
   //    startProfit += profit[index];
   //    console.log(totalSum);
   // }
   while (result) {
      if (totalSum >= price[op]) {
         antionalProfit[op] = antionalProfit[op] + 1;
         console.log("!", totalSum, price[op], startProfit, reaminPrice, antionalProfit);
         totalSum -= price[op];
         startProfit += profit[op];
         console.log(totalSum);
      } else if (totalSum + reaminPrice >= price[op]) {
         antionalProfit[op] = antionalProfit[op] + 1;
         console.log(totalSum, price[op], startProfit, reaminPrice, antionalProfit);
         let value = price[op] - totalSum;
         reaminPrice -= value;
         totalSum = 0;
         startProfit += profit[op];
         console.log(totalSum);
      } else {
         op--;
         if (op < 0) result = false;
      }

   }
}
console.log(totalSum, startProfit, reaminPrice);


// let result = true;
// let total = 23780;
// let start = 23540;
// let counter = 0;
// while (result) {
//    counter++;
//    if ((start * 85) % 100 === 0) {
//       console.log(`test -> ${counter}`, `total = ${start}`, `85% = ${start * 0.85}`, `15% = ${start * 0.15}`);
//    }
//    start++;

//    if (start > total) {
//       result = false;
//       return;
//    }
// }