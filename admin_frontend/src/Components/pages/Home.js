import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import add1 from "../../Images/add1.png";
import user from "../../Images/user.png";
import NavBar from "../layouts/navBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="py-4">
          <h1> Home page</h1>
          <div class="row row-cols-1 row-cols-md-3 g-4 ">
            <div class="col">
              <div class="card card text-center">
                <img
                  src={add1}
                  class="card-img-top"
                  alt="..."
                  style={{
                    height: 240,
                    width: 240,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                <div class="card-body">
                  <a
                    href="/UserScreen"
                    class="btn btn-primary btn-lg btn-block"
                  >
                    Add User
                  </a>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card card text-center">
                <img
                  src={user}
                  class="card-img-top"
                  alt="..."
                  style={{
                    height: 240,
                    width: 240,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                <div class="card-body">
                  <a href="/UserList" class="btn btn-primary btn-lg btn-block">
                    Edit User
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
