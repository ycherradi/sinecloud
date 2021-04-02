
import React from 'react';
import { useDispatch, useSelector } from "react-redux"





function Rock({setCurrentSong}) {

const songs = useSelector((state) => state?.song.songs);
const RockSongs = songs?.filter((el) => el?.genre_id === 1);

  return (
    <>
    {RockSongs?.map((song) => {
                    return ( 
                              <div className="song">
                                <div className="image__container" >

                                    <div className="image1" >
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    </div>
                                    <div id={`${song?.audio_file}`} onClick={(e) => setCurrentSong(e.target.id)} className="image2"></div>
                                </div>
                                
                                <div className="title">{song?.title}</div>
                                <div className="artist">{song?.artist}</div>
                              </div>
                            )
                  })}

  </>
  )
}

export default Rock;