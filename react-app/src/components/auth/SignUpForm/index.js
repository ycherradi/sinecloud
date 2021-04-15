import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./SignUpForm.css";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";

import { usePasswordValidation } from "./usePasswordValitation";

const SignUpForm = ({
  closeModalSignUp,
  openModalLogin,
}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [image, setImage] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  // const user = useSelector((state) => state?.session.user)

  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    setImageLoading(true);

    const formData1 = new FormData();
    formData1.append("artist_name", artistName);
    formData1.append("email", email);

    formData1.append("password", password);

    formData1.append("profile_URL", image);

    const user = await dispatch(sessionActions.signup(formData1));

    if (password === repeatPassword) {
      // console.log(user)
      if (!user.errors) {
        
        setImageLoading(false);
        return history.push("/");
        
      } else {
        console.log(user.errors)
        setErrors(user.errors)
        // console.log(user.payload.errors)
      }
    }
  };

  let passwordValidation = "";

  if (password !== repeatPassword) {
    passwordValidation = "Password must match!";
  }

  const onLogin = (e) => {
    e.preventDefault();
    closeModalSignUp();
    openModalLogin();
  };

  const updateArtistname = (e) => {
    setArtistName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  // if (user) {
  //   return <Redirect to="/" />;
  // }

  const updateImage = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="SignUpModalWrapper">
      <div className="SignUpModalContainer">
        <div className="SignUpModalFormTitleContainer">
          <div className="SignUpModalFormTitle">Register</div>
        </div>
        <form onSubmit={onSignUp}>
          <div className="LoginErrorModalContainer">
            {/* {validLength ? <span>True</span> : <span>False</span>} */}
            <div className="login-errors__container"> {passwordValidation}</div>
            {errors.map((error) => (
              <div className="login-errors__container">{error}</div>
            ))}
          </div>
          <div className="SignUpModalInputContainer">
            <label>Artist Name</label>
            <input
              type="text"
              name="artist_name"
              onChange={updateArtistname}
              value={artistName}
            ></input>
          </div>
          <div className="SignUpModalInputContainer">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className="SignUpModalInputContainer">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              // onChange={setFirst}
              value={password}
              required={true}
            ></input>
          </div>
          <div className="SignUpModalInputContainer">
            <label>Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              // onChange={setSecond}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className="SignUpModalInputContainer">
            <label htmlFor="image">Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={updateImage}
            />
            {imageLoading && <p>Loading...</p>}
          </div>
          <div className="SignUpModalButtonContainer">
            <button className="SignUpModalSubmit__form" type="submit">
              Sign Up
            </button>
          </div>
          <div>
            <button className="already-a-member" onClick={onLogin}>
              Already a Member? Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
