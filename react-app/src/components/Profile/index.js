import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import Modal from "react-modal";
import './Profile.css';
import EditProfileImageForm from '../auth/EditProfileImageForm/EditProfileImageForm';



const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#2f3135",
    borderColor: "#2f3135",
  },
};

Modal.setAppElement("#root");


function Profile() {

const user = useSelector((state) => state?.session.user)
const [openSignUpModal, setIsOpenSignUpModal] = useState(false);

  function openModalSignUp() {
    setIsOpenSignUpModal(true);
  }

  function closeModalSignUp() {
    setIsOpenSignUpModal(false);
  }


  return (
    <>
    <div className='profile__outer-div'>
      <div className='profile__banner-div'>
        <div className='profile__image-div' onClick={openModalSignUp}>
          <img src={`${user?.profile_URL}`}></img>
        </div>
        <div className='names__div'>
          <h1>{user?.artist_name}</h1>
          <h3> ID# {user?.id}</h3>
        </div>
      </div>
    </div>
      <div className='profile-navbar'>
        <div className='profile-navbar_links'>
          <div className='profile-navbar_link'>
            <NavLink to='/profile' autofocus>Uploaded</NavLink>
          </div>
          <div className='profile-navbar_link'>
            <NavLink to='/profile/playlist'>Playlist</NavLink>
          </div>
          <div className='profile-navbar_link'>
            <NavLink to='/profile/likes'>Likes</NavLink>
          </div>
          <div className='profile-navbar_link'>
            <NavLink to='/profile/following'>Following</NavLink>
          </div>
          <div className='profile-navbar_link'>
            <NavLink to='/profile/followers'>Followers</NavLink>
          </div>
        </div>
        <div></div>
      </div>
      <div className='profile-navbar_below'>
      </div>
      <Modal
          isOpen={openSignUpModal}
          onRequestClose={closeModalSignUp}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <EditProfileImageForm closeModalSignUp={closeModalSignUp} />
      </Modal>
      </>

  )
}




export default Profile;