import React from "react";

const LoginNavBar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
        <div className="container">
          <a class="navbar-brand" href="#">
            Administration Portal
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  );
};
export default LoginNavBar;
