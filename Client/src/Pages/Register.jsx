import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    

  const [FullName, setFullName] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [Phone, setPhone] = useState();

  const handleSubmit = () =>{
    console.log(FullName, Email, Password, Phone)
  }

  return (
    <>
      <div className="loginsection">
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            style={{ height: "calc(100vh - 50px)" }}
          >
            <div className="col-6">
              <form
                id="register"
                method="POST"
                onSubmit={(e) => handleSubmit(e)}
                className="card p-5"
              >
                <h1 className="text-center pb-5">Sign Up</h1>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form2Example1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={FullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="form-control"
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form2Example1">
                    Email Address
                  </label>
                  <input
                    type="text"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form2Example1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="form-control"
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="form-control"
                  />
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-lg btn-dark px-5  rounded-pill"
                  >
                    Register
                  </button>

                  <Link to="/login">
                    <button
                      type="submit"
                      className="btn btn-lg btn-info px-5 rounded-pill"
                    >
                      Sign in
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
