import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import NavBar from "../layouts/navBar";

const EditUser = () => {
  const { ID } = useParams();
  let history = useHistory();
  if(localStorage.getItem("token") === "null"){
    history.push("/");
  }
  console.log("outsied use effect " + ID);

  const [userinfo, setUserInfo] = useState({});

  console.log(userinfo);

  const fetchUser = async () => {
    try {
      const result = await axios.get("http://khdd.codes:30008/employees");
      const ulist = result.data.results;
      const user = ulist.filter(elem => elem.username === ID);
      console.log(user);
      setUserInfo(user[0]);
    }
    catch (err) {
      console.log("EDIT SCREEN: ERROR FETCHING USER");
      console.log(err);
    }
  }
  useEffect(() => {
    console.log("Inside user effec: " + ID);
    fetchUser();
  }, [ID]);



  const onUpdate = (event) => {
    setUserInfo({ ...userinfo, [event.target.name]: event.target.value });
    console.log(event.target.name);
  };

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(userinfo);
      const result = await axios.put("http://khdd.codes:30008/update_emp", userinfo);
      console.log(result);
      history.push("/Home");

    }
    catch (err) {
      console.log("ERROR:EDIT USER... onsubmit");
      console.log(err);
    }

  };
  return (
    <div>
      <NavBar />
      <div className="container my-5">
        <div className="w-70 mx-auto shadow p-4">
          <h1>Edit User Info</h1>
          <form class="row g-3" onSubmit={(event) => onSubmit(event)}>
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                class="form-control"
                value={userinfo.fname}
                onChange={(event) => onUpdate(event)}
                name="firstname"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                class="form-control"
                value={userinfo.lname}
                onChange={(event) => onUpdate(event)}
                name="lastname"
              />
            </div>

            <div className="col-md-6 my-3">
              <label className="form-label">Designation</label>
              <input
                type="text"
                class="form-control"
                value={userinfo.designation}
                onChange={(event) => onUpdate(event)}
                name="designation"
              />
            </div>
            <div className="col-md-6 my-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="inputEmail4"
                value={userinfo.username}
                onChange={(event) => onUpdate(event)}
                name="email"
              />
            </div>
            <div className="col-md-6 my-3">
              <label className="form-label">Password</label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                value={userinfo.password}
                onChange={(event) => onUpdate(event)}
                name="password"
              />
            </div>

            <div className="col-md-6 my-3">
              <label className="form-label">Salary</label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                value={userinfo.salary}
                onChange={(event) => onUpdate(event)}
                name="salary"
              />
            </div>

            <div className="col-12 my-5 my-2">
              <button type="submit" class="btn btn-primary btn-lg btn-block">
                Edit User
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditUser;
