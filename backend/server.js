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
app.get("/employees", (req, res, next) => {

    
  db.Database.query("SELECT * FROM user", function (err, result, fields) {
    if (err) {
        res.status(400).json({ "error": err.message });
        return;
    };
    result = result.map(v => Object.assign({}, v));
    console.log(result);
    res.status(200).json({"results": result})
  });

});
// get all attendance of an employe from database
app.get("/attendance/:username", (req, res, next) => {
    var user_list = []

    

        db.Database.query(`SELECT att_date, attendance from attendance_info where username = ?` ,[req.params["username"]] , function (err, result, fields) {
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
                result = result.map(v => Object.assign({}, v));
                for (var i = 0; i < result.length; i++){

                    result[i]["att_date"] = JSON.stringify(result[i]["att_date"]).slice(1,11)
                }
                res.status(200).json({"results": result})
                
            }


        });
        //res.status(200).json({ "results": user_list});

    //res.header("Access-Control-Allow-Origin", "*");


    // res.json({"message":"Ok"})
});

app.put("/mark_attendance", (req, res) => {

    today_date =  db.today.getFullYear() + '/' + (db.today.getMonth() + 1) + '/' +  db.today.getDate() ;


        db.Database.query("update attendance_info set attendance = ? where att_date = ? and username = ?",["P", today_date, req.body["username"]], function (err, result, fields) {

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

app.get("/start_day", (req, res) => {


    db.today.setDate(db.today.getDate() + 1)
    today_date =  db.today.getFullYear() + '/' + (db.today.getMonth() + 1) + '/' +  db.today.getDate() ;
    

    

        db.Database.query("SELECT username FROM user", function (err, result, fields) {

            if (err) {
                res.status(400).json({ "error": err.message });
                console.log("failed to get employees for adding new attendance")
                return;
            }
            else{
                result = result.map(v => Object.assign({}, v));
                for (emp of result){
                    db.Database.query("insert into attendance_info values(?, ?, ?)",[emp["username"], today_date,"A" ], function (error, output, fields) {
                        console.log(emp["username"])

                        if (error) {
                            console.log(error)
                            res.status(400).json({ "error": error.message });
                            
                            return;
                        }
                        else {
                                        //console.log(typeof result);
                            //user_list.push(result)
                            console.log(output)
                            
                        }
            
                    });
            

                }
                
            }
            //console.log(typeof result);
            //user_list.push(result)
            res.status(200).json({"results": "success"})
            
    });

        




});

app.post("/user_login", (req, res, next) => {

    console.log(req.body["username"])

        db.Database.query("select password from user where  username = ?" , [req.body["username"]], function (err, result, fields) {


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
                result = result.map(v => Object.assign({}, v));
                result = result[0]
                if (result["password"] != req.body["password"]){
                    res.status(400).json({ "error": "Incorrect Password" });
                    return;
                }
                const token = jwt.sign({ID: req.body["username"]}, "shfailsfhabsk");
                res.status(200).json({"results": "success", "token":token})
                
            }

        });
    


});

app.post("/admin_login", (req, res, next) => {

    console.log(req.body)

        db.Database.query("select password from admin inner join user on admin.admin_name = user.username where admin_name = ? " , [req.body["username"]], function (err, result, fields) {
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
                result = result.map(v => Object.assign({}, v));
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

app.put("/update_emp", (req, res, next) => {
    var user_list = []

    
        for (const [key, value] of Object.entries(req.body)) {
            

            if (key != "username"){
                if (key == "fname"){

                    db.Database.query("update user set fname = ? where username = ?" , [ value, req.body["username"]], function (err, result, fields) {
                        if (err) {
                            console.log(err.message );
                            res.status(400).json({ "error": err.message });
                            return;
                        }
            
                        //console.log(typeof result);
                        //user_list.push(result)
                    
                    });
                }else if (key == "lname"){
                    db.Database.run(`update user set lname = ? where username = ?` , [ value, req.body["username"]], (err,result) => {
                        if (err) {
                            console.log(err.message );
                            res.status(400).json({ "error": err.message });
                            return;
                        }

                    });



                }else if (key == "password"){
                    db.Database.query("update user set password = ? where username = ?" , [ value, req.body["username"]], function (err, result, fields) {
                        if (err) {
                            console.log(err.message );
                            res.status(400).json({ "error": err.message });
                            return;
                        }

                    });



                }else if (key == "designation"){
                    db.Database.query("update user set designation = ? where username = ?" , [ value, req.body["username"]], function (err, result, fields) {
                        if (err) {
                            console.log(err.message );
                            res.status(400).json({ "error": err.message });
                            return;
                        }

                    });



                }else if (key == "salary"){
                    
                    db.Database.query("update user set salary = ? where username = ?" , [ value, req.body["username"]], function (err, result, fields) {
                        if (err) {
                            console.log(err.message );
                            res.status(400).json({ "error": err.message });
                            return;
                        }

                    });
                



                }
                else {
                    res.status(400).json({ "error": "Invalid Column name" });
                    return;
                }
            }



          }
        res.status(200).json({"results": "success"})
        //res.status(200).json({ "results": user_list});


    //res.header("Access-Control-Allow-Origin", "*");

    
    // res.json({"message":"Ok"})
});
app.post("/add_emp", (req, res, next) => {
    var user_list = []



        db.Database.query(`insert into user values(?, ?, ?, ?, ?, ?)`,[req.body["username"], req.body["password"], req.body["fname"], req.body["lname"], req.body["salary"], req.body["designation"]] , function (err, result, fields) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }

            //console.log(typeof result);
            //user_list.push(result)
            res.status(200).json({"results": "success"})
        });
        //res.status(200).json({ "results": user_list});

    //res.header("Access-Control-Allow-Origin", "*");


    // res.json({"message":"Ok"})
});

app.delete("/delete_emp", (req, res, next) => {

    


        db.Database.query(`delete from user where username = ?` , [req.body["username"]] , function (err, result, fields) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }

            //console.log(typeof result);
            //user_list.push(result)
            res.status(200).json({"results": "success"})
        });
        //res.status(200).json({ "results": user_list});

    //res.header("Access-Control-Allow-Origin", "*");


    // res.json({"message":"Ok"})
});

// Default response for any other request
app.use(function (req, res) {
    res.status(404);

});

