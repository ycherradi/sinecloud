import React, { useState } from "react";

import "../SignUpForm/SignUpForm.css";
import "./EditProfileImageForm.css";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";

const EditProfileImageForm = ({ closeModalSignUp }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [artistName, setArtistName] = useState("");
  const userId = useSelector((state) => state?.session.user.id);

  const onSignUp = async (e) => {
    e.preventDefault();
    setImageLoading(true);

    const formData2 = new FormData();
    formData2.append("id", userId);
    formData2.append("artist_name", artistName);
    formData2.append("image", image);

    await dispatch(sessionActions.updateExistingUser(formData2));

    setImageLoading(false);
    closeModalSignUp();
  };

  const updateArtistname = (e) => {
    setArtistName(e.target.value);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="SignUpModalWrapper">
      <div className="SignUpModalContainer">
        <div className="SignUpModalFormTitleContainer">
          <div className="UpdateModalFormTitle">Update Profile Image</div>
        </div>
        <form onSubmit={onSignUp}>
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
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={updateImage}
            />
            {imageLoading && <p>Loading...</p>}
          </div>
          <div className="UpdateModalButtonContainer">
            <button className="UpdateModalSubmit" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileImageForm;
