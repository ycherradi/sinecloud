import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import Modal from "react-modal";
import './Profile.css';
import EditProfileImageForm from '../auth/EditProfileImageForm/EditProfileImageForm';
import Uploaded from './Uploaded';
import Playlist from './Playlist';
import Likes from './Likes';
import Following from './Following';
import Followers from './Followers';


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
const [openProfileUpload, setOpenProfileUpload] = useState(false);
const [openProfilePlaylist, setOpenProfilePlaylist] = useState(false);
const [openProfileLikes, setOpenProfileLikes] = useState(false);
const [openProfileFollowing, setOpenProfileFollowing] = useState(false);
const [openProfileFollowers, setOpenProfileFollowers] = useState(false);

  function openModalSignUp() {
    setIsOpenSignUpModal(true);
  }

  function closeModalSignUp() {
    setIsOpenSignUpModal(false);
  }
  
  const handleProfileUpload = () => {
    setOpenProfileUpload(true);
    setOpenProfilePlaylist(false);
    setOpenProfileLikes(false);
    setOpenProfileFollowing(false);
    setOpenProfileFollowers(false);
  };
  const handleProfilePlaylist = () => {
    setOpenProfilePlaylist(true);
    setOpenProfileUpload(false);
    setOpenProfileLikes(false);
    setOpenProfileFollowing(false);
    setOpenProfileFollowers(false);
  };
  const handleProfileLikes = () => {
    setOpenProfileLikes(true);
    setOpenProfileUpload(false);
    setOpenProfilePlaylist(false);
    setOpenProfileFollowing(false);
    setOpenProfileFollowers(false);
  };
  const handleProfileFollowing = () => {
    setOpenProfileFollowing(true);
    setOpenProfileUpload(false);
    setOpenProfilePlaylist(false);
    setOpenProfileLikes(false);
    setOpenProfileFollowers(false);
  };
  const handleProfileFollowers = () => {
    setOpenProfileFollowers(true);
    setOpenProfileUpload(false);
    setOpenProfilePlaylist(false);
    setOpenProfileLikes(false);
    setOpenProfileFollowing(false);
  };

  return (
    <div className='profile__page'>
    <div className='profile__outer-div'>
      <div className='profile__banner-div'>
        <div className='profile__image-div' onClick={openModalSignUp}>
          {!user?.profile_URL ? (
                          <div>
                              {user?.artist_name[0]}
                          </div>
                        ) :
                      (
                        <img
                            className="profile__image"
                            src={`${user?.profile_URL}`}
                            alt="profile-server"
                        />
                      )}
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
            <button autoFocus className='profile__btn' onClick={handleProfileUpload}>Uploaded</button>
          </div>
          <div className='profile-navbar_link'>
            <button className='profile__btn' onClick={handleProfilePlaylist}>Playlist</button>
          </div>
          <div className='profile-navbar_link'>
            <button className='profile__btn' onClick={handleProfileLikes}>Likes</button>
          </div>
          <div className='profile-navbar_link'>
            <button className='profile__btn' onClick={handleProfileFollowing}>Following</button>
          </div>
          <div className='profile-navbar_link'>
            <button className='profile__btn' onClick={handleProfileFollowers}>Followers</button>
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
      {openProfileUpload && <Uploaded />}
      {openProfilePlaylist && <Playlist/>}
      {openProfileLikes && <Likes />}
      {openProfileFollowing && <Following />}
      {openProfileFollowers && <Followers />}
      </div>

  )
}




export default Profile;