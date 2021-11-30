const fs = require('fs'); // accessing local drives C:drive D:drive E:

fs.readFile("./welcome.txt", "utf-8", (err,data) => {

    console.log(data);

});//node file.js

const quote = "your Awesome! 😎😎";
const niceQuote = "Some Nice Qoute";

fs.writeFile('./awesome.txt', quote , (err) => {


    console.log("Completed Writing!");

});

fs.appendFile('./awesome.txt', niceQuote , (err) => {


    console.log("Completed Writing!");

});

fs.unlink("./awesome.txt,", (err) => {

    console.log("Deleted Successfully");

})



const quote2 = "Live more , worry less 😁";
// text-1.html
// text-2.html ...// text-10.html

const [, ,limit] = process.argv;
console.log(typeof(process.argv));



function createQuote( quote, limit)
{

    for(let i=1 ;i<=limit;i++)
    {
        fs.writeFile(`./Backup/text-${i}.txt`, quote , (err) => {


            console.log("Completed Writing!",i);

        });

    }

    fs.readdir("./Backup" ,(err, files) => {

        if(err){

            console.log(err);
        }
            console.log(files);

        
    })
}

createQuote(quote2, limit)
