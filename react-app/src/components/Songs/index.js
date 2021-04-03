import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as musicActions from '../../store/song';
import './Songs.css';
import * as genreActions from '../../store/genre';
import * as likeActions from '../../store/likes';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';




function Songs({setCurrentSong, genres}) {
  // const genres = useSelector((state) => state?.genre.genres)
  const dispatch = useDispatch();

  const songs = useSelector((state) => state?.song.songs);
  const user = useSelector((state) => state?.session.user);
  const likes = useSelector((state) => state?.likes);
  const ids = {}
  const likeIds = Object.values(likes).map((el) => ids[el.id] = el.id);

  useEffect(() => {
    dispatch(genreActions.findAllGenres())
  }, [dispatch])

  useEffect(() => {
    dispatch(musicActions.findExistingSongs())
  }, [dispatch])

  const RockSongs = songs?.filter((el) => el?.genre_id === 1);
  const PopSongs = songs?.filter((el) => el?.genre_id === 2);
  const HiphopSongs = songs?.filter((el) => el?.genre_id === 3);
  const JazzSongs = songs?.filter((el) => el?.genre_id === 4);
  const CountrySongs = songs?.filter((el) => el?.genre_id === 5);
  const MetalSongs = songs?.filter((el) => el?.genre_id === 6);
  const WorldSongs = songs?.filter((el) => el?.genre_id === 7);
  const ReggaeSongs = songs?.filter((el) => el?.genre_id === 8);
  const PunkSongs = songs?.filter((el) => el?.genre_id === 9);


  const handleAddLike = (songId) => {
    dispatch(likeActions.addLike(songId, user.id));
  };

  const handleRemoveLike = (songId) => {
    dispatch(likeActions.removeLike(songId, user.id));
  };

  useEffect(() => {
        dispatch(likeActions.fetchUserLikes(user?.id));
    }, [dispatch, songs]);



  return (

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
                  {RockSongs?.map((song) => {
                    return ( 
                              <div className="item">
                                <div className="image__container" >
                                    <div className="image1" >
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (user && song.id in ids ? <button id={`${song.id}`} className='liked' onClick={() => handleRemoveLike(song.id)}></button> : <button id={`${song.id}`} className='like' onClick={() => handleAddLike(song.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.audio_file}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className="title">{song?.title}</div>
                                <div className="artist">{song?.artist}</div>
                              </div>
                            )
                  })}
                  </OwlCarousel>
            </div>      
        </div>
      <div className="songs__container">
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
                                    <div className="image1" >
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (user && song.id in ids ? <button id={`${song.id}`} className='liked' onClick={() => handleRemoveLike(song.id)}></button> : <button id={`${song.id}`} className='like' onClick={() => handleAddLike(song.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.audio_file}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className="title">{song?.title}</div>
                                <div className="artist">{song?.artist}</div>
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
                                    <div className="image1" >
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (user && song.id in ids ? <button id={`${song.id}`} className='liked' onClick={() => handleRemoveLike(song.id)}></button> : <button id={`${song.id}`} className='like' onClick={() => handleAddLike(song.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.audio_file}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className="title">{song?.title}</div>
                                <div className="artist">{song?.artist}</div>
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
                                    <div className="image1" >
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (user && song.id in ids ? <button id={`${song.id}`} className='liked' onClick={() => handleRemoveLike(song.id)}></button> : <button id={`${song.id}`} className='like' onClick={() => handleAddLike(song.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.audio_file}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className="title">{song?.title}</div>
                                <div className="artist">{song?.artist}</div>
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
                                    <div className="image1" >
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (user && song.id in ids ? <button id={`${song.id}`} className='liked' onClick={() => handleRemoveLike(song.id)}></button> : <button id={`${song.id}`} className='like' onClick={() => handleAddLike(song.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.audio_file}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className="title">{song?.title}</div>
                                <div className="artist">{song?.artist}</div>
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
                                    <div className="image1" >
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (user && song.id in ids ? <button id={`${song.id}`} className='liked' onClick={() => handleRemoveLike(song.id)}></button> : <button id={`${song.id}`} className='like' onClick={() => handleAddLike(song.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.audio_file}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className="title">{song?.title}</div>
                                <div className="artist">{song?.artist}</div>
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
                                    <div className="image1" >
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (user && song.id in ids ? <button id={`${song.id}`} className='liked' onClick={() => handleRemoveLike(song.id)}></button> : <button id={`${song.id}`} className='like' onClick={() => handleAddLike(song.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.audio_file}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className="title">{song?.title}</div>
                                <div className="artist">{song?.artist}</div>
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
                                    <div className="image1" >
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (user && song.id in ids ? <button id={`${song.id}`} className='liked' onClick={() => handleRemoveLike(song.id)}></button> : <button id={`${song.id}`} className='like' onClick={() => handleAddLike(song.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.audio_file}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className="title">{song?.title}</div>
                                <div className="artist">{song?.artist}</div>
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
                                    <div className="image1" >
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    {user ?  (user && song.id in ids ? <button id={`${song.id}`} className='liked' onClick={() => handleRemoveLike(song.id)}></button> : <button id={`${song.id}`} className='like' onClick={() => handleAddLike(song.id)}></button>) : ''}
                                    </div>
                                    <div id={`${song?.audio_file}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2">
                                    </div>
                                </div>
                                <div className="title">{song?.title}</div>
                                <div className="artist">{song?.artist}</div>
                              </div>
                            )
                  })}
                  </OwlCarousel>
            </div>      
        </div>
    </div>
  )
}





export default Songs;