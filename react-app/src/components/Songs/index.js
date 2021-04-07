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

function Songs({setCurrentSong, loaded}) {
  // const genres = useSelector((state) => state?.genre.genres)
  const dispatch = useDispatch();
  const history = useHistory();
  const songs = useSelector((state) => state?.song);
  const user = useSelector((state) => state?.session.user);
  const likes = useSelector((state) => state?.likes);
  const [likesChanged ,setLikesChanged ] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  console.log(songs)

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
  // const RockSongs = Object.values(songs).filter((el) => el?.genre_id === 1);
  console.log(RockSongs)
  // const PopSongs = Object.values(songs).filter((el) => el?.genre_id === 2);
  // const HiphopSongs = Object.values(songs).filter((el) => el?.genre_id === 3);
  // const JazzSongs = Object.values(songs).filter((el) => el?.genre_id === 4);
  // const CountrySongs = Object.values(songs).filter((el) => el?.genre_id === 5);
  // const MetalSongs = Object.values(songs).filter((el) => el?.genre_id === 6);
  // const WorldSongs = Object.values(songs).filter((el) => el?.genre_id === 7);
  // const ReggaeSongs = Object.values(songs).filter((el) => el?.genre_id === 8);
  // const PunkSongs = Object.values(songs).filter((el) => el?.genre_id === 9);

  const classes = useStyles();

  return (
    loaded &&
    <div>
      <h1 className="charts">Charts: Top Genres</h1>
      <div className="songs__container">
          <h1>Rock</h1>
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
                                    <div className="image1" onClick={() => onClick2(song.id)}>
                                      <img src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='song__user--info'>
                                    
                                    {user ? (song?.userProfileURL? <img src={`${song?.userProfileURL}`} onClick={() => onClick(song.id)}/> : <div><Avatar className={classes.orange} onClick={() => onClick(song.id)}>{song?.username[0]}</Avatar></div>) : ''}
                                  </div>
                                  <div>
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
      {/* <div className="songs__container">
          <h1>Pop</h1>
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {RockSongs?.map((song) => {
                    return ( 
                              <div className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={() => onClick(song.id)}>
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='song__user--info'>
                                    
                                    {user ? (song?.userProfileURL? <img src={`${song?.userProfileURL}`} /> : <div><Avatar className={classes.orange}>{song?.username[0]}</Avatar></div>) : ''}
                                  </div>
                                  <div>
                                    <div className="title" onClick={() => onClick(song.id)}>{song?.title}</div>
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
          <h1>Hip Hop</h1>
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {RockSongs?.map((song) => {
                    return ( 
                              <div className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={() => onClick(song.id)}>
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='song__user--info'>
                                    
                                    {user ? (song?.userProfileURL? <img src={`${song?.userProfileURL}`} /> : <div><Avatar className={classes.orange}>{song?.username[0]}</Avatar></div>) : ''}
                                  </div>
                                  <div>
                                    <div className="title" onClick={() => onClick(song.id)}>{song?.title}</div>
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
          <h1>Jazz</h1>
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {RockSongs?.map((song) => {
                    return ( 
                              <div className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={() => onClick(song.id)}>
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='song__user--info'>
                                    
                                    {user ? (song?.userProfileURL? <img src={`${song?.userProfileURL}`} /> : <div><Avatar className={classes.orange}>{song?.username[0]}</Avatar></div>) : ''}
                                  </div>
                                  <div>
                                    <div className="title" onClick={() => onClick(song.id)}>{song?.title}</div>
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
          <h1>Country</h1>
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {RockSongs?.map((song) => {
                    return ( 
                              <div className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={() => onClick(song.id)}>
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='song__user--info'>
                                    
                                    {user ? (song?.userProfileURL? <img src={`${song?.userProfileURL}`} /> : <div><Avatar className={classes.orange}>{song?.username[0]}</Avatar></div>) : ''}
                                  </div>
                                  <div>
                                    <div className="title" onClick={() => onClick(song.id)}>{song?.title}</div>
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
          <h1>Metal</h1>
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {RockSongs?.map((song) => {
                    return ( 
                              <div className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={() => onClick(song.id)}>
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='song__user--info'>
                                    
                                    {user ? (song?.userProfileURL? <img src={`${song?.userProfileURL}`} /> : <div><Avatar className={classes.orange}>{song?.username[0]}</Avatar></div>) : ''}
                                  </div>
                                  <div>
                                    <div className="title" onClick={() => onClick(song.id)}>{song?.title}</div>
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
          <h1>World Music</h1>
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {RockSongs?.map((song) => {
                    return ( 
                              <div className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={() => onClick(song.id)}>
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='song__user--info'>
                                    
                                    {user ? (song?.userProfileURL? <img src={`${song?.userProfileURL}`} /> : <div><Avatar className={classes.orange}>{song?.username[0]}</Avatar></div>) : ''}
                                  </div>
                                  <div>
                                    <div className="title" onClick={() => onClick(song.id)}>{song?.title}</div>
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
          <h1>Reggae</h1>
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {RockSongs?.map((song) => {
                    return ( 
                              <div className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={() => onClick(song.id)}>
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='song__user--info'>
                                    
                                    {user ? (song?.userProfileURL? <img src={`${song?.userProfileURL}`} /> : <div><Avatar className={classes.orange}>{song?.username[0]}</Avatar></div>) : ''}
                                  </div>
                                  <div>
                                    <div className="title" onClick={() => onClick(song.id)}>{song?.title}</div>
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
          <h1>Punk</h1>
            <div className="genre__container" >
              <OwlCarousel items={7}  
                className="owl-carousel owl-theme"  
                loop  
                autoWidth
                nav={true}
                navText={["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"]}
                dots={false}
              >  
                  {RockSongs?.map((song) => {
                    return ( 
                              <div className="item">
                                <div className="image__container" >
                                    <div className="image1" onClick={() => onClick(song.id)}>
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (likes?.includes(song.id) ? <button id={`${song.id}`} className='liked' onClick={(e) => handleRemoveLike(e, song?.id)}></button> : <button id={`${song.id}`} className='like' onClick={(e) => handleAddLike(e, song?.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.id}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className='song__info'>
                                  <div className='song__user--info'>
                                    
                                    {user ? (song?.userProfileURL? <img src={`${song?.userProfileURL}`} /> : <div><Avatar className={classes.orange}>{song?.username[0]}</Avatar></div>) : ''}
                                  </div>
                                  <div>
                                    <div className="title" onClick={() => onClick(song.id)}>{song?.title}</div>
                                    <div className="artist">{song?.artist}</div>
                                  </div>
                                </div>
                              </div>
                            )
                  })}
                  </OwlCarousel>
            </div>       */}
        {/* </div> */}
    </div>
  )
}





export default Songs;