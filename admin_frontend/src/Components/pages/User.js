import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../layouts/navBar";

const User = () => {
  let history = useHistory();

  if(localStorage.getItem("token") === "null"){
    history.push("/");
  }
  const [userinfo, userState] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    salary: "",
    designation: "",
  });

  // console.log(userinfo);

  const onUpdate = (event) => {
    userState({ ...userinfo, [event.target.name]: event.target.value });
    // console.log(event.target.name);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const new_user = {
        username: userinfo.email,
        password: userinfo.password,
        fname: userinfo.firstname,
        lname: userinfo.lastname,
        salary: userinfo.salary,
        designation: userinfo.designation
      }
      // console.log(new_user);
      const result = await axios.post("http://khdd.codes:30008/add_emp", new_user);
      console.log(result.data.results);
      history.push("/Home");

    }
    catch (err) {
      console.log("[Add User] Error sending new user request to the backedn.");
      console.log(String(err));
    }
  };
  return (
    <div>
      <NavBar />
      <div className="container my-5">
        <div className="w-70 mx-auto shadow p-4">
          <h1>ADD USER FOLL TEZZZ</h1>
          <form class="row g-3" onSubmit={(event) => onSubmit(event)}>
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                class="form-control"
                value={userinfo.firstname}
                onChange={(event) => onUpdate(event)}
                name="firstname"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                class="form-control"
                value={userinfo.lastname}
                onChange={(event) => onUpdate(event)}
                name="lastname"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                value={userinfo.phoneNumber}
                onChange={(event) => onUpdate(event)}
                name="phoneNumber"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Designation</label>
              <input
                type="text"
                class="form-control"
                value={userinfo.designation}
                onChange={(event) => onUpdate(event)}
                name="designation"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="inputEmail4"
                value={userinfo.email}
                onChange={(event) => onUpdate(event)}
                name="email"
              />
            </div>
            <div className="col-md-6">
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

            <div className="col-md-6">
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

            <div className="col-12 my-3">
              <button type="submit" class="btn btn-primary">
                Add User
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default User;
