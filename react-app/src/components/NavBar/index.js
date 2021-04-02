import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from '../auth/LogoutButton/index';
import LoginForm from '../auth/LoginForm/index';
import SignUpForm from '../auth/SignUpForm/index';
import Profile from '../Profile/index';
import UploadForm from '../UploadForm/index';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import {authenticate} from '../../store/session';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from '@material-ui/core/Fade';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from '../../images/Logo.png';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 5,
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#2c2f33',
        border: 'none',
    },
};


Modal.setAppElement('#root');

const NavBar = ({ authenticated, setAuthenticated }) => {
    const dispatch = useDispatch();
    const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
    const [modalIsOpenSignUp, setIsOpenSignUp] = useState(false);
    const [modalIsOpenUpload, setIsOpenUpload] = useState(false);
    const [search, setSearch] = useState('')
    
    const user = useSelector((state) => state?.session.user);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    function openModalLogin() {
        setIsOpenLogin(true);
    }

    function openModalSignUp() {
        setIsOpenSignUp(true);
    }

    function closeModalLogin() {
        setIsOpenLogin(false);
    }

    function closeModalSignUp() {
        setIsOpenSignUp(false);
    }
 
    function openModalUpload() {
        setIsOpenUpload(true);
    }
    
    function closeModalUpload() {
        setIsOpenUpload(false);
    }

    return (
        <nav className="mainNavBar">
            <div className="navbarContainer">
                <div className="logo">
                    <img
                        src={logo}
                        alt="logo"
                    />
                    </div>
                <div>
                    <button className='libraryButton'>
                        Library
                    </button>
                </div>
                <div className="navbarItem">
                    <input
                        type="text"
                        placeholder="  Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div>
                    <button className='musicUploadButton' onClick={openModalUpload}>
                        Upload
                    </button>
                </div>
                <div>
                    <Modal
                        isOpen={modalIsOpenUpload}
                        onRequestClose={closeModalUpload}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <UploadForm
                            authenticated={authenticated}
                            setAuthenticated={setAuthenticated}
                            closeModalUpload={closeModalUpload}
                            openModalUpload={openModalUpload}
                        />
                    </Modal>
                </div>
                <div className="navbarItem">
                    {user ? (<div>
                        {!user.profile_URL ? (
                        <div className="profile__image--container">
                            <div className="label1">
                                <div>
                                    {/* {`${user.artist_name[0]}`} */}
                                </div>
                            </div>
                        </div>) :
                        (<div className="profile__image--container">
                            <div className="label">
                            <img
                                className="profile__image"
                                src={`${user.profile_URL}`}
                                alt="profile-server"
                            />
                            </div>
                        </div>
                        )}
                    </div>) : ""}
                </div>
                <div className="LoginSignupLogout">
                    <div>
                        {authenticated === true ? (
                            ''
                        ) : (
                            <button
                                className="LoginModalSubmit"
                                onClick={openModalLogin}
                            >
                                Sign in
                            </button>
                        )}
                    </div>
                    <div>
                        <Modal
                            isOpen={modalIsOpenLogin}
                            onRequestClose={closeModalLogin}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <LoginForm
                                setIsOpenLogin={setIsOpenLogin}
                                authenticated={authenticated}
                                setAuthenticated={setAuthenticated}
                                openModalSignUp={openModalSignUp}
                                closeModalLogin={closeModalLogin}
                            />
                        </Modal>
                    </div>
                    <div>
                        {authenticated === true ? (
                            ''
                        ) : (
                            <button
                                className="SignUpModalSubmit"
                                onClick={openModalSignUp}
                            >
                                Create account
                            </button>
                        )}
                    </div>
                    <div>
                        <Modal
                            isOpen={
                                authenticated === true
                                    ? false
                                    : modalIsOpenSignUp
                            }
                            onRequestClose={closeModalSignUp}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <SignUpForm
                                authenticated={authenticated}
                                setAuthenticated={setAuthenticated}
                                closeModalSignUp={closeModalSignUp}
                                openModalLogin={openModalLogin}
                            />
                        </Modal>
                    </div>
                    <div>
                        {authenticated === false ? (
                                        ''
                                    ) : (
                                        <>
                                        <button
                                            className="iconButton"
                                            onClick={handleClick}
                                        >
                                            <MoreVertIcon fontSize='large' />
                                        </button>
                                        <Menu
                                            id="fade-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={open}
                                            onClose={handleClose}
                                            TransitionComponent={Fade}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <div>
                                                    <NavLink to='/profile' setAuthenticated={setAuthenticated}>
                                                        Profile
                                                    </NavLink>   
                                                </div>    
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <div>
                                                    <LogoutButton setAuthenticated={setAuthenticated} />
                                                </div>    
                                            </MenuItem>
                                        </Menu> 
                                        </>)}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
