var sql = require('mysql')
var md5 = require('md5')
var Cred = require('./cred')

var connection = sql.createConnection(Cred.CRED);


connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

// connection.query("CREATE TABLE Deliveries" , function (error, results, fields) {
//       if (error) throw error;
//       console.log(results);
//     });
// connection.query("UPDATE Deliveries SET Status = 0 WHERE PackageID = 1" , function (error, results, fields) {
//         if (error) throw error;
//         console.log(results);
//     });
// connection.query("UPDATE Deliveries SET Status = 0 WHERE PackageID = 6" , function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
//    });
// connection.query('INSERT INTO Deliveries SET ?', {Address: 'testing', Status: 0, 'PackageID': 1, 'Employee_ID': 1}, function (error, results, fields) {
//   if (error) throw error;
//   console.log(results.insertId);
// });
// connection.query('INSERT INTO Deliveries SET ?', {Address: 'testing2', Status: 0, 'PackageID':6 ,'Employee_ID': 0}, function (error, results, fields) {
//     if (error) throw error;
//     console.log(results.insertId);
//   });

// connection.query('INSERT INTO Deliveries SET ?', {Address: 'testing2', Status: 2, 'PackageID': 7,'Employee_ID': 0}, function (error, results, fields) {
//   if (error) throw error;
//   console.log(results.insertId);
// });


// connection.query('SELECT * from Attendence', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The Delivery is: ', results);
//   });

// connection.query('INSERT INTO Deliveries SET ?', {Address: 'testing', Status: 'P', 'Package ID': 1}, function (error, results, fields) {
//   if (error) throw error;
//   console.log(results.insertId);
// });

// connection.query('INSERT INTO Attendence SET ?', { 'EmployeeID': 10, Date: "2000/12/27", Status: 'A', Time: "10:14am" }, function (error, results, fields) {
//     if (error) {
//         console.log("ERROR INSERTING EMP")
//         throw error;
//     }
//     console.log(results.results);
// });

// connection.query('SELECT * from Employees', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The Delivery is: ', results);
//   });



exports.con = connection;


