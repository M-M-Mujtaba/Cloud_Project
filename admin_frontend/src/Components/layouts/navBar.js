import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
            <div className="container">
                  <a class="navbar-brand" href="#">Admin User</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                          <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                          </li>
                          {/* <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                          </li> */}
                        </ul>
                        <Link class="btn btn-outline-success" type="submit" to="/">Logout</Link>
                    </div>
            </div>
        </nav>        
    )
}
export default NavBar;