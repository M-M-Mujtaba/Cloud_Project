import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../layouts/navBar";

const UserList = () => {
  const history = useHistory();
  if(localStorage.getItem("token") === "null"){
    history.push("/");
  }
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const results = await axios.get("http://khdd.codes:30008/employees");
      console.log(results);
      setUsers(results.data.results);
    } catch (err) {
      console.log("Error: While fetching userss!!!!");
      console.log(err);
    }
  };

  const deleteUser = async username => {
    try{
      console.log(username);
      const result = await axios.post("http://khdd.codes:30008/delete_emp",{
        "username": username
      });
      console.log(result);
      setTimeout(fetchData, 1000);
    }
    catch(err){
      console.log("[Edit Users] Error occured")
    }
  };

  return (
    <div>
      <NavBar />
      &nbsp;
      <h1 className="text-center font-weight-bold">Edit Users</h1>
      <div className="container">
        <div className="py-4">
          <table class="table table-dark table-hover table border shadow">
            <thead>
              <tr>
                <th scope="col">EmpID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{user.fname}</td>
                  <td>{user.lname}</td>
                  <td>{user.username}</td>
                  <td>
                    <Link class="btn btn-primary mx-3 mr-2" to={`/EditUser/${user.username}`}>
                      Edit
                    </Link>{"  "}
      
                    <Link
                      class="btn btn-danger"
                      onClick={() => deleteUser(user.username)}
                      to={"/UserList"}
                    >
                      Delete
                    </Link>{"  "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default UserList;
