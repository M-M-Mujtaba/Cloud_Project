import axios from "axios";
import React, { useEffect, useState } from "react";
import {useHistory, useParams} from "react-router-dom"

const EditUser = () => {
    const {ID} = useParams();
    const [userinfo, setUserInfo] = useState({
        firstname: "Khizar",
        lastname:"hussain",
        phoneNumber: "125461-561",
        email: "khhis@gmail.com",
        password: "1023",
        designation: "aksi",
        salary: "586"
      });
      
      let history = useHistory();
      console.log(userinfo);

      useEffect(() => {
        fetchUser();
      }, []);

      const fetchUser = async () => {
        try{
            const results = await axios.get(`//${ID}`);
            setUserInfo(results.data);
        }
        catch(err){
            console.log("EDIT SCREEN: ERROR FETCHING USER");
            console.log(err);
        }
      }

      const onUpdate = (event) => {
        setUserInfo({ ...userinfo, [event.target.name]: event.target.value });
        console.log(event.target.name);
      };
    
      const onSubmit = async (event) => {
        try{
            event.preventDefault();
            console.log(userinfo);
            const result = await axios.post("",userinfo);
            
        }
        catch(err){
            console.log("ERROR:EDIT USER... onsubmit");
            console.log(err);
        }
        history.push("/Home");
        
      };
      return (
        <div className="container">
          <div className="w-70 mx-auto shadow p-4">
            <h1>Edit User Info</h1>
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
              {/* <div className="col-12">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  name="address"
                  placeholder="1234 Main St"
                  value={userinfo.address}
                  onChange={(event) => onUpdate(event)}
                />
              </div> */}
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
              {/* <div class="col-md-4">
                <label class="form-label">
                  Country
                </label>
                <select id="inputState" class="form-select">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div> */}
              <div className="col-12">
                <button type="submit" class="btn btn-primary">
                  Edit User
                </button>
              </div>
            </form>
          </div>
        </div>
  );
};
export default EditUser;
