const os = require("os");  //requier is node inbuilt 

console.log("Os version : ", os.version());
console.log("Free Memory : ", ((os.freemem()/1024)/1024));
console.log("Total Memory : ", os.totalmem());
// console.log("CPU : " ,os.cpus());