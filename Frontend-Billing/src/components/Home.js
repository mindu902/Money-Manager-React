import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import "../App.css";

function Home() {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        setContent(
          (error.response && error.response.data) ||
            error.message ||
            error.toString()
        );
      }
    );
  });

  return (
    <img
      class="img-fluid"
      src="https://firebasestorage.googleapis.com/v0/b/test-pets-22825.appspot.com/o/IMG_2514.JPG?alt=media&token=24ed9b4b-d03f-4023-9932-8a67e3e77e84"
    ></img>
  );
}

export default Home;
