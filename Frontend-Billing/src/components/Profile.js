import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useSelector } from "react-redux";

function Profile() {
  const [redirect, setRedirect] = useState(null);
  const [userReady, setUserReady] = useState(false);
  const currentUser = useSelector((state) => {
    return state.auth.user;
  });

  useEffect(() => {
    if (!currentUser) {
      setRedirect("/home");
    }
    setUserReady(true);
  }, []);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="container">
      {userReady ? (
        <div>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}{" "}
            ...{" "}
            {currentUser.accessToken.substr(
              currentUser.accessToken.length - 20
            )}
          </p>
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
export default Profile;
