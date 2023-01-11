import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { withRouter } from "../common/with-router";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        navigate("/profile");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default withRouter(Login);
