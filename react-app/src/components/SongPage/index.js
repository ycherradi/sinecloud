import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as musicActions from '../../store/song';
import './SongPage.css';
import * as genreActions from '../../store/genre';
import * as likeActions from '../../store/likes';
import { useHistory } from "react-router";



function SongPage() {

  const history = useHistory();
  const songs = useSelector((state) => state?.song.songs);
  const user = useSelector((state) => state?.session.user);
  const likes = useSelector((state) => state?.likes);








  return (
    <div>

    </div>
  )
}



export default SongPage;