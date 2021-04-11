import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from '../auth/LogoutButton/index';
import LoginForm from '../auth/LoginForm/index';
import SignUpForm from '../auth/SignUpForm/index';
import Profile from '../Profile/index';
import * as sessionActions from '../../store/session';
import UploadForm from '../UploadForm/index';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import {authenticate} from '../../store/session';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from '@material-ui/core/Fade';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from '../../images/Logo.png';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));

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

const NavBar = ({ loaded }) => {
    const dispatch = useDispatch();
    const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
    const [modalIsOpenSignUp, setIsOpenSignUp] = useState(false);
    const [modalIsOpenUpload, setIsOpenUpload] = useState(false);
    const [search, setSearch] = useState('');
    
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
    
    const classes = useStyles();

    // useEffect(() => {
    //     dispatch(sessionActions.authenticate())
    // }, [dispatch])

    return (
        loaded && 
        <nav className="mainNavBar">
            <div className="navbarContainer">
                <NavLink to='/'>
                    <div className="logo">
                        <img
                            src={logo}
                            alt="logo"
                        />
                    </div>
                </NavLink>
                <div>
                    <NavLink className='libraryButton' to='/developer'>
                        Developer
                    </NavLink>
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
                    <button className='musicUploadButton' onClick={user ? (openModalUpload) : (openModalLogin)}>
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
                            
                            closeModalUpload={closeModalUpload}
                            openModalUpload={openModalUpload}
                        />
                    </Modal>
                </div>
                <div className="navbarItem">
                    <div>
                        {!user?.profile_URL ? (
                        <div className="profile__image--container">
                            <div className="label1">
                                <div>
                                    <Avatar className={classes.orange}>{user?.artist_name && user?.artist_name[0]}</Avatar>
                                </div>
                            </div>
                        </div>) :
                        (<div className="profile__image--container">
                            <div className="label">
                                <NavLink to='/profile'>
                                    <img
                                        className="profile__image"
                                        src={`${user?.profile_URL}`}
                                        alt="profile-server"
                                    />
                                </NavLink>    
                            </div>
                        </div>
                        )}
                    </div>
                    {user ? <NavLink to='/profile'>
                        <div className='artist_name'>{user?.artist_name} ∇</div>
                    </NavLink> : ''}
                </div>
                <div className="LoginSignupLogout">
                    <div>
                        {user ? (
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
                                
                                openModalSignUp={openModalSignUp}
                                closeModalLogin={closeModalLogin}
                            />
                        </Modal>
                    </div>
                    <div>
                        {user ? (
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
                                user
                                    ? false
                                    : modalIsOpenSignUp
                            }
                            onRequestClose={closeModalSignUp}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <SignUpForm
                    
                                closeModalSignUp={closeModalSignUp}
                                openModalLogin={openModalLogin}
                            />
                        </Modal>
                    </div>
                    <div>
                        {!user ? (
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
                                                    <NavLink to='/profile' >
                                                        Profile
                                                    </NavLink>   
                                                </div>    
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <div>
                                                    <LogoutButton />
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
