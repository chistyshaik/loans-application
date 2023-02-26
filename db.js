const sqlite3 = require("sqlite3").verbose();

//to connect database connection we need to create a connection in the next step

const db = new sqlite3.Database("./loans.db", sqlite3.OPEN_READWRITE, (error) => {
    if(error){
        console.log("unable to connect db........");
    }
    console.log("DATABASE CONNECTED........")
});


module.exports = db ;


// db.serialize( function(){
//     // get all application from the loans table
//     // SELECT * FROM loans  --> its the command which we apply in our EXECUTE SQL 

//     db.each('SELECT * FROM loans', (error , dbRow)=>{
//         console.log(":: ERROR ::", error);
//         console.log(":: DB ROW ::", dbRow);
//     });
// });
