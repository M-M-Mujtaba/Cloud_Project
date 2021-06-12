const sqlite3 = require('sqlite3');

// open the database
let db = new sqlite3.Database('./EMP_DB.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});
// var user_list = []

// db.serialize(() => {

//   db.each(`SELECT * from user` , (err,result) => {
//     if (err) {
//       console.error(err.message);
//     }

//     //console.log(typeof result);
//     user_list.push(result)

//   });
//   console.log(user_list)
// });

// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
//   //console.log(user_list)
// });
exports.Database = db;
exports.today = new Date();
console.log(this.today)