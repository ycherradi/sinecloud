import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as musicActions from '../../store/song';
import './Songs.css';
import * as genreActions from '../../store/genre';
import * as likeActions from '../../store/likes';
import * as userActions from '../../store/users';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Modal from 'react-modal';
import LoginForm from '../auth/LoginForm/index';
import SignUpForm from '../auth/SignUpForm/index';

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

function Songs({ setCurrentSong, loaded}) {
  // const genres = useSelector((state) => state?.genre.genres)
  const dispatch = useDispatch();
  const history = useHistory();
  const songs = useSelector((state) => state?.song);
  const user = useSelector((state) => state?.session.user);
  const likes = useSelector((state) => state?.likes);
  const [likesChanged ,setLikesChanged ] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
  const [modalIsOpenSignUp, setIsOpenSignUp] = useState(false);
  const [modalIsOpenUpload, setIsOpenUpload] = useState(false);
  

  
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


  const handleAddLike = (e, songId) => {
    e.stopPropagation()
    dispatch(likeActions.addLike(songId, user.id));
    setLikesChanged(true)
  };

  const handleRemoveLike = (e, songId) => {
    e.stopPropagation()
    dispatch(likeActions.removeLike(songId, user.id));
    setLikesChanged(true)
  };
  
    const onClick = (songId) => {
        
        const to = `/user/songs/${songId}`;
        history.push(to)
  };

    const onClick2 = (songId) => {
        const to = `/songs/${songId}`;
        history.push(to)
  };

  // const onClick3 = (songId) => {
  //     audio.togglePlay()
  //     // e.stopPropagation();
  //     setCurrentSong(songId)
  // };

  useEffect(() => {
      dispatch(musicActions.findExistingSongs())
  }, [dispatch])
  
  useEffect(() => {
        dispatch(likeActions.fetchUserLikes(user?.id));
    }, [dispatch, songs]);

  useEffect(()=>{
    if(likesChanged) {
          setLikesChanged(false)
        }
  }, [likes])

  const RockSongs = useSelector((state) => state.song && Object.values(state.song).filter((el) => el.genre_id === 1))
  const PopSongs = useSelector((state) => state.song && Object.values(state.song).filter((el) => el.genre_id === 2))
  const HiphopSongs = useSelector((state) => state.song && Object.values(state.song).filter((el) => el.genre_id === 3))
  const JazzSongs = useSelector((state) => state.song && Object.values(state.song).filter((el) => el.genre_id === 4))
  const CountrySongs = useSelector((state) => state.song && Object.values(state.song).filter((el) => el.genre_id === 5))
  const MetalSongs = useSelector((state) => state.song && Object.values(state.song).filter((el) => el.genre_id === 6))
  const WorldSongs = useSelector((state) => state.song && Object.values(state.song).filter((el) => el.genre_id === 7))
  const ReggaeSongs = useSelector((state) => state.song && Object.values(state.song).filter((el) => el.genre_id === 8))
  const PunkSongs = useSelector((state) => state.song && Object.values(state.song).filter((el) => el.genre_id === 9))

  const classes = useStyles();

  
  
  return (
    loaded &&
    <div>
      <h1 className="charts">Charts: Top Genres</h1>
      <div className="songs__container">
            <div className='h1'>Rock</div>
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {RockSongs.map((song) => {
                    return ( 
                              <div key={`${song.id}`} className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={user ? (() => onClick2(song.id)) : openModalLogin}>
                                      <img src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={user ? ((e) => setCurrentSong(e.target.id)) : openModalLogin} className="image2">
                                    </div>
                                    <div className='song__user--info'>
                                      {song?.userProfileURL? <img src={`${song?.userProfileURL}`} onClick={user ? (() => onClick(song.id)) : openModalLogin}/> : <div><Avatar className={classes.orange} onClick={user ? (() => onClick(song.id)) : openModalLogin}>{song?.username[0]}</Avatar></div>}
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='user-info-text'>
                                    <div className="title" >{song?.title}</div>
                                    <div className="artist">{song?.artist}</div>
                                  </div>
                                </div>
                              </div>
                            )
                  })}
                  </OwlCarousel>
            </div>      
        </div>
      <div className="songs__container">
          {PopSongs.length > 0 ? <div className='h1'>Pop</div>: ''}
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {PopSongs.map((song) => {
                    return ( 
                              <div key={`${song.id}`} className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={user ? (() => onClick2(song.id)) : openModalLogin}>
                                      <img src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={user ? ((e) => setCurrentSong(e.target.id)) : openModalLogin} className="image2">
                                    </div>
                                    <div className='song__user--info'>
                                      {song?.userProfileURL? <img src={`${song?.userProfileURL}`} onClick={user ? (() => onClick(song.id)) : openModalLogin}/> : <div><Avatar className={classes.orange} onClick={user ? (() => onClick(song.id)) : openModalLogin}>{song?.username[0]}</Avatar></div>}
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='user-info-text'>
                                    <div className="title" >{song?.title}</div>
                                    <div className="artist">{song?.artist}</div>
                                  </div>
                                </div>
                              </div>
                            )
                  })}
                  </OwlCarousel>
            </div>      
        </div>
      <div className="songs__container">
          {HiphopSongs.length > 0 ? <h1>Hip hop</h1>: ''}
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {HiphopSongs.map((song) => {
                    return ( 
                              <div key={`${song.id}`} className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={user ? (() => onClick2(song.id)) : openModalLogin}>
                                      <img src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={user ? ((e) => setCurrentSong(e.target.id)) : openModalLogin} className="image2">
                                    </div>
                                    <div className='song__user--info'>
                                      {song?.userProfileURL? <img src={`${song?.userProfileURL}`} onClick={user ? (() => onClick(song.id)) : openModalLogin}/> : <div><Avatar className={classes.orange} onClick={user ? (() => onClick(song.id)) : openModalLogin}>{song?.username[0]}</Avatar></div>}
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='user-info-text'>
                                    <div className="title" >{song?.title}</div>
                                    <div className="artist">{song?.artist}</div>
                                  </div>
                                </div>
                              </div>
                            )
                  })}
                  </OwlCarousel>
            </div>      
        </div>
      <div className="songs__container">
          {JazzSongs.length > 0 ? <h1>Jazz</h1>: ''}
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {JazzSongs.map((song) => {
                    return ( 
                              <div key={`${song.id}`} className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={user ? (() => onClick2(song.id)) : openModalLogin}>
                                      <img src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={user ? ((e) => setCurrentSong(e.target.id)) : openModalLogin} className="image2">
                                    </div>
                                    <div className='song__user--info'>
                                      {song?.userProfileURL? <img src={`${song?.userProfileURL}`} onClick={user ? (() => onClick(song.id)) : openModalLogin}/> : <div><Avatar className={classes.orange} onClick={user ? (() => onClick(song.id)) : openModalLogin}>{song?.username[0]}</Avatar></div>}
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='user-info-text'>
                                    <div className="title" >{song?.title}</div>
                                    <div className="artist">{song?.artist}</div>
                                  </div>
                                </div>
                              </div>
                            )
                  })}
                  </OwlCarousel>
            </div>      
        </div>
      <div className="songs__container">
          {CountrySongs.length > 0 ? <h1>Country</h1>: ''}
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {CountrySongs.map((song) => {
                    return ( 
                              <div key={`${song.id}`} className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={user ? (() => onClick2(song.id)) : openModalLogin}>
                                      <img src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={user ? ((e) => setCurrentSong(e.target.id)) : openModalLogin} className="image2">
                                    </div>
                                    <div className='song__user--info'>
                                      {song?.userProfileURL? <img src={`${song?.userProfileURL}`} onClick={user ? (() => onClick(song.id)) : openModalLogin}/> : <div><Avatar className={classes.orange} onClick={user ? (() => onClick(song.id)) : openModalLogin}>{song?.username[0]}</Avatar></div>}
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='user-info-text'>
                                    <div className="title" >{song?.title}</div>
                                    <div className="artist">{song?.artist}</div>
                                  </div>
                                </div>
                              </div>
                            )
                  })}
                  </OwlCarousel>
            </div>      
        </div>
      <div className="songs__container">
          {MetalSongs.length > 0 ? <h1>Metal</h1>: ''}
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {MetalSongs.map((song) => {
                    return ( 
                              <div key={`${song.id}`} className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={user ? (() => onClick2(song.id)) : openModalLogin}>
                                      <img src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={user ? ((e) => setCurrentSong(e.target.id)) : openModalLogin} className="image2">
                                    </div>
                                    <div className='song__user--info'>
                                      {song?.userProfileURL? <img src={`${song?.userProfileURL}`} onClick={user ? (() => onClick(song.id)) : openModalLogin}/> : <div><Avatar className={classes.orange} onClick={user ? (() => onClick(song.id)) : openModalLogin}>{song?.username[0]}</Avatar></div>}
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='user-info-text'>
                                    <div className="title" >{song?.title}</div>
                                    <div className="artist">{song?.artist}</div>
                                  </div>
                                </div>
                              </div>
                            )
                  })}
                  </OwlCarousel>
            </div>      
        </div>
      <div className="songs__container">
          {WorldSongs.length > 0 ? <h1>World Music</h1>: ''}
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {WorldSongs.map((song) => {
                    return ( 
                              <div key={`${song.id}`} className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={user ? (() => onClick2(song.id)) : openModalLogin}>
                                      <img src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={user ? ((e) => setCurrentSong(e.target.id)) : openModalLogin} className="image2">
                                    </div>
                                    <div className='song__user--info'>
                                      {song?.userProfileURL? <img src={`${song?.userProfileURL}`} onClick={user ? (() => onClick(song.id)) : openModalLogin}/> : <div><Avatar className={classes.orange} onClick={user ? (() => onClick(song.id)) : openModalLogin}>{song?.username[0]}</Avatar></div>}
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='user-info-text'>
                                    <div className="title" >{song?.title}</div>
                                    <div className="artist">{song?.artist}</div>
                                  </div>
                                </div>
                              </div>
                            )
                  })}
                  </OwlCarousel>
            </div>      
        </div>
      <div className="songs__container">
          {ReggaeSongs.length > 0 ? <h1>Reggae</h1>: ''}
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {ReggaeSongs.map((song) => {
                    return ( 
                              <div key={`${song.id}`} className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={user ? (() => onClick2(song.id)) : openModalLogin}>
                                      <img src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={user ? ((e) => setCurrentSong(e.target.id)) : openModalLogin} className="image2">
                                    </div>
                                    <div className='song__user--info'>
                                      {song?.userProfileURL? <img src={`${song?.userProfileURL}`} onClick={user ? (() => onClick(song.id)) : openModalLogin}/> : <div><Avatar className={classes.orange} onClick={user ? (() => onClick(song.id)) : openModalLogin}>{song?.username[0]}</Avatar></div>}
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='user-info-text'>
                                    <div className="title" >{song?.title}</div>
                                    <div className="artist">{song?.artist}</div>
                                  </div>
                                </div>
                              </div>
                            )
                  })}
                  </OwlCarousel>
            </div>      
        </div>
      <div className="songs__container">
          {PunkSongs.length > 0 ? <h1>Punk</h1>: ''}
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {PunkSongs.map((song) => {
                    return ( 
                              <div key={`${song.id}`} className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={user ? (() => onClick2(song.id)) : openModalLogin}>
                                      <img src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={user ? ((e) => setCurrentSong(e.target.id)) : openModalLogin} className="image2">
                                    </div>
                                    <div className='song__user--info'>
                                      {song?.userProfileURL? <img src={`${song?.userProfileURL}`} onClick={user ? (() => onClick(song.id)) : openModalLogin}/> : <div><Avatar className={classes.orange} onClick={user ? (() => onClick(song.id)) : openModalLogin}>{song?.username[0]}</Avatar></div>}
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='user-info-text'>
                                    <div className="title" >{song?.title}</div>
                                    <div className="artist">{song?.artist}</div>
                                  </div>
                                </div>
                              </div>
                            )
                  })}
                  </OwlCarousel>
            </div>      
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
    </div>
  )
}





export default Songs;