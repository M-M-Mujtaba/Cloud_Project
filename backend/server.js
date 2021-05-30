var express = require("express")
var app = express()
var db = require("./database.js")
var cors = require("cors")
var jwt = require('jsonwebtoken')

// Server port
var HTTP_PORT = 8000

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: true }));
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});
// Root endpoint
app.get("/Deliveries", (req, res, next) => {
    db.con.query('SELECT * from Deliveries', function (error, results, fields) {
        if (error) {
            res.status(400).json({ "error": error.message });
            return;
        }
        res.header("Access-Control-Allow-Origin", "*")
        res.status(200).json({ "Data": results });
    });
    // res.json({"message":"Ok"})
});


app.post("/time", (req, res) => {
    console.log(req.body.data['user'], typeof req.body.data['stime'], req.body.data['pkgID'], req.body.data['stat']);
    if (req.body.data['stat'] === 1) {
        var quer = "UPDATE Deliveries SET Employee_ID =? , Start_Time =?, Status=? WHERE Package_ID = ?";
        db.con.query(quer, [req.body.data['user'], req.body.data['stime'], req.body.data['stat'], req.body.data['pkgID']], function (error, results, fields) {
            if (error) {
                res.status(400).json({ "error": error.message });
                return;
            }
            console.log(results);
            console.log(results.message);
            res.header("Access-Control-Allow-Origin", "*");
            res.status(200).json({ "results": results });
        });
    }
    else if (req.body.data['stat'] === 2) {
        var quer = "UPDATE Deliveries SET Employee_ID =? , End_Time =?, Status=? WHERE Package_ID = ?";
        db.con.query(quer, [req.body.data['user'], req.body.data['stime'], req.body.data['stat'], req.body.data['pkgID']], function (error, results, fields) {
            if (error) {
                res.status(400).json({ "error": error.message });
                return;
            }
            console.log(results);
            console.log(results.message);
            res.header("Access-Control-Allow-Origin", "*");
            res.status(200).json({ "results": results });
        });
    }


});

app.post("/Attendance", (req, res, next) => {
    console.log(req.body);
    db.con.query('SELECT * from Attendence WHERE EmployeeID=?',[req.body.userid], function (error, results, fields) {
        if (error) {
            console.log("error in attendance query")
            res.status(400).json({ "error": error.message });
            return;
        }
        console.log("query worked")
        res.header("Access-Control-Allow-Origin", "*")
        res.status(200).json({ "Data": results });
    });
    // res.json({"message":"Ok"})
});

app.post("/login", (req, res, next) => {
    console.log(req.body.email);
    db.con.query('SELECT * from Employees WHERE email=?', [req.body.email], function (error, results, fields) {
        if (error) {
            res.status(400).json({ "error": error.message });
            return;
        }
        let user = results[0]
        if(user['pswd'] !== req.body.password){
            res.status(400).json({"ERROR": "Password is incorrect!"});
            return;
        }
        const token = jwt.sign({ID: user.ID}, "shfailsfhabsk")
        console.log(user.EmployeeType)
        res.header("Access-Control-Allow-Origin", "*")
        res.status(200).json({ "user": user , "token": token });
       
    });

});

// app.post("/mark", (req, res, next) => {
//     console.log(req.body)
//     db.con.query('INSERT INTO Attendence SET Status=? ,Date =?, Time=? , EmployeeID=?', 
//         ['P','2020/12/19', req.body.time, req.body.uid], function (error, results, fields) {
//         if (error) {
//             console.log("ERROR")
//             res.status(400).json({ "error": error.message });
//             return;
//         }
//         console.log(results);
//         res.header("Access-Control-Allow-Origin", "*")
//         res.status(200).json({"Message": "Success"});
       
//     });

// });

// app.get("/getattendance",(req,res,next) => {
//     db.con.query('SELECT * FROM Attendence WHERE EmployeeID=?' ,[req.body.uid], function (error,results,fields){
//         if(error){
//             res.status(400).json({"error":error.message});
//             return;
//         }
//         console.log(results);
//         res.header("Access-Control-Allow-Origin", "*");
//         res.status(200).json({"Message": "Success", "status":results[0]})
//     })

// });

// app.get("/getatten", (req, res, next) => {
//     console.log(req.body);
//     console.log(req.params);
//     console.log(req.query);
//     db.con.query('SELECT * FROM Attendence WHERE EmployeeID=?', 
//         [ req.body.uid], function (error, results, fields) {
//         if (error) {
//             res.status(400).json({ "error": error.message });
//             return;
//         }
//         console.log(results);
//         res.header("Access-Control-Allow-Origin", "*");
//         res.status(200).json({"Message": "Success","status": results[0]});
       
//     });

// });

// Insert here other API endpoints
app.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    res.json({ "message": "pls work" })
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.post("/mark", (req, res, next) => {
    console.log(req.body)
    db.con.query('UPDATE Attendence SET Status=? WHERE _Date=?', 
        ['P','2012-08-19'], function (error, results, fields) {
        if (error) {
            console.log("ERROR IN MARK")
            res.status(400).json({ "error": error.message });
            return;
        }
        console.log(results);
        console.log("LEAVING MARK ")
        res.header("Access-Control-Allow-Origin", "*")
        res.status(200).json({"Message": "Success"});
       
    });

});

app.post("/getattendance",(req,res,next) => {
    console.log("INSIDE GET ATTENDANCE SERVER")
    console.log( req.body.time, req.body.uid)
    db.con.query('INSERT INTO Attendence SET Status=? ,_Date =?, Time=? , EmployeeID=?', 
    ['A','2012/08/19', req.body.time, req.body.uid], function (error, results, fields) {
    if (error) {
        console.log("ERROR IN GET ATTENDANCE")
        res.status(400).json({ "error": error.message });
        return;
    }
    console.log(results);
    res.header("Access-Control-Allow-Origin", "*")
    res.status(200).json({"Message": "Success","status": results});
    });

});

// Default response for any other request
app.use(function (req, res) {
    res.status(404);
    //res.json({"message": "wronge page"})
});

