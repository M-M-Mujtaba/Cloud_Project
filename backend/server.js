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
// get all employees from database
// Root endpoint
app.get("/Employees", (req, res, next) => {
    var user_list = []

    db.Database.serialize(() => {

        db.Database.all(`SELECT * from user` , (err,result) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }

            //console.log(typeof result);
            //user_list.push(result)
            res.status(200).json({"results": result})
        });
        //res.status(200).json({ "results": user_list});
    });
    //res.header("Access-Control-Allow-Origin", "*");


    // res.json({"message":"Ok"})
});
// get all attendance of an employe from database
app.get("/Attendance/:username", (req, res, next) => {
    var user_list = []

    db.Database.serialize(() => {

        db.Database.all(`SELECT att_date, attendance from attendance_info where username = ?` ,[req.params["username"]] , (err,result) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                console.log(err)
                return;
            }
            else if (result.length == 0) {
                res.status(400).json({ "error": "No records found" });
                console.log("No Record found")
                return;
            } else {
                            //console.log(typeof result);
                //user_list.push(result)
                console.log(req.params)
                res.status(200).json({"results": result})
                
            }


        });
        //res.status(200).json({ "results": user_list});
    });
    //res.header("Access-Control-Allow-Origin", "*");


    // res.json({"message":"Ok"})
});

app.put("/mark_attendance", (req, res) => {

    today_date =  db.today.getDate() + '-' + (db.today.getMonth() + 1) + '-' + db.today.getFullYear();

    db.Database.serialize(() => { 

        db.Database.run(`update attendance_info set attendance = ? where att_date = ? and username = ?` ,["P", today_date, req.body["username"]] , (err,result) => {

            if (err) {
                res.status(400).json({ "error": err.message });
                console.log(req.body)
                return;
            }
             else {
                            //console.log(typeof result);
                //user_list.push(result)
                console.log(req.body)
                res.status(200).json({"results": "success"})
                
            }

        });



    });


});

app.get("/start_day", (req, res) => {

    db.today.setDate(db.today.getDate() + 1)
    today_date =  db.today.getDate() + '-' + (db.today.getMonth() + 1) + '-' + db.today.getFullYear();
    

    
    db.Database.serialize(() => { 

        db.Database.each(`SELECT username from user` , (err,result) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                console.log("failed to get employees for adding new attendance")
                return;
            }
            else{
                db.Database.run(`insert into attendance_info values(?, ?, ?)` ,[result.username, today_date,"A" ], (error,output) => {

                    if (error) {
                        res.status(400).json({ "error": error.message });
                        console.log(error)
                        return;
                    }
                     else {
                                    //console.log(typeof result);
                        //user_list.push(result)
                        console.log(output)
                        
                    }
        
                });
        

            }

            //console.log(typeof result);
            //user_list.push(result)
            
        });

        
        res.status(200).json({"results": "success"})

    });


});

app.post("/user_login", (req, res, next) => {

    console.log(req.body["username"])
    db.Database.serialize(() => { 

        db.Database.each(`select password from user where  username = ? ` ,[req.body["username"]] , (err,result) => {

            if (err) {
                res.status(400).json({ "error": err.message });
                console.log(req.body)
                return;
            }
            else if (result.length == 0) {
                res.status(400).json({ "error": "user not found" });
                console.log("No Record found")
                return;
            }
             else {
                            //console.log(typeof result);
                //user_list.push(result)
                //console.log(req.body)
                if (result["password"] != req.body["password"]){
                    res.status(400).json({ "error": "Incorrect Password" });
                    return;
                }
                const token = jwt.sign({ID: req.body["username"]}, "shfailsfhabsk");
                res.status(200).json({"results": "success", "token":token})
                
            }

        });
    

    });
});

app.post("/admin_login", (req, res, next) => {

    console.log(req.body)
    db.Database.serialize(() => { 

        db.Database.all(`select password from admin inner join user on admin.admin_name = user.username where admin_name = ? ` ,[req.body["username"]] , (err,result) => {
            console.log(result)
            if (err) {

                res.status(400).json({ "error": err.message });
                console.log(req.body)
                return;
            }
            else if (result.length == 0) {
                console.log("here1");
                res.status(400).json({ "error": "admin not found" });
                console.log("No Record found")
                return;
            }
             else {

                            //console.log(typeof result);
                //user_list.push(result)
                result = result[0]
                console.log(req.body)
                if (result["password"] != req.body["password"]){
                    res.status(400).json({ "error": "Incorrect Password" });
                    return;
                }
                const token = jwt.sign({ID: req.body["username"]}, "shfailsfhabsk");
                res.status(200).json({"results": "success", "token":token})
                return
                
            }


        });
    

    });
});



// Default response for any other request
app.use(function (req, res) {
    res.status(404);

});

