var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "11970870",
  database: "emp_att"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
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

exports.Database = con;
exports.today = new Date();
console.log(this.today.toLocaleString().split(',')[0])