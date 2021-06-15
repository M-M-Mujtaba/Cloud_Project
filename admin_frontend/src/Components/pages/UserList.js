import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([{"ID": 1,
    "firstname": "Khizar",
    "lastname": "dumb Bitch",
    "email": "dumhoe@gmail.com"}]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const results = await axios.get("");
      console.log(results);
      setUsers(results.data);
    } catch (err) {
      console.log("Error: While fetching userss!!!!");
      console.log(err);
    }
  };

  const deleteUser = async id => {
    console.log(id);
    await axios.delete("");
    fetchData();
  };

  return (
    <div>
      <h1> Edit User</h1>
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
                <tr>
                  <td>{user.ID}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link class="btn btn-primary mr-2" to={"/UserList"}>
                      View
                    </Link>{"  "}
                    <Link class="btn btn-outline-primary mr-2" to={`/EditUser/${user.ID}`}>
                      Edit
                    </Link>{"  "}
                    <Link
                      class="btn btn-danger"
                      onClick={() => deleteUser(user.ID)}
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
