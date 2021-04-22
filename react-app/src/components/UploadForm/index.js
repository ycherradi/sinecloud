import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./UploadForm.css";
import { useDispatch, useSelector } from "react-redux";
import * as musicActions from '../../store/song';
import * as genreActions from '../../store/genre';



const UploadForm = ({closeModalUpload}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session.user)
  const genres = useSelector((state) => state?.genre.genres)
  const [imageLoading, setImageLoading] = useState(false);
  const [musicLoading, setMusicLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");
  const [artist, setArtist] = useState(user?.artist_name);
  const [isArtist, setIsArtist] = useState(true);
  const [genre, setGenre] = useState('');

  const history = useHistory();


  const onUpload = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    setMusicLoading(true);
    

    const formData = new FormData();
    formData.append('id', user.id)
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("audio", audio);
    formData.append("artist", artist);
    formData.append("genre", genre);


   

    const song = await dispatch(musicActions.addNewSong(formData));
    closeModalUpload();
  };

  useEffect(() => {
    dispatch(genreActions.findAllGenres())
  }, [dispatch])
  


  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateArtist = (e) => {
    if(!isArtist) { 
      setArtist(e.target.value);
    } else {
      setArtist(user?.artist_name);
    }
  };

  const updateGenre = (e) => {
    setGenre(e.target.value);
  };

  const updateImage = (e) => {
    
    const file = e.target.files[0];
    setImage(file);
  };

  const updateAudio = (e) => {
    
    const file = e.target.files[0];
    setAudio(file);
  };


  return (
    <div className="UploadModalWrapper">
      <div className="UploadModalContainer">
        <div className="UploadModalFormTitleContainer">
          <div className="UploadModalFormTitle">Upload</div>
        </div>
        <form onSubmit={onUpload}>
          <div className="UploadErrorModalContainer">
            {errors.map((error) => (
              <div className="login-errors__container">{error}</div>
            ))}
          </div>
          <div className="UploadModalInputContainer">
            <label>Title</label>
            <input
              type="text"
              name="Title"
              onChange={updateTitle}
              value={title}
            ></input>
          </div>
          <div className="UploadModalInputContainer">
            <label>Description</label>
            <input
              type="text"
              name="Description"
              onChange={updateDescription}
              value={description}
            ></input>
          </div>
          <div className="UploadModalRadioContainer">
            <p>isArtist:</p>
              <input type="radio" name="drone" value="true" onChange={(e) => setIsArtist(true)}
                    checked={isArtist === true}/>
              <label htmlFor="true">Yes</label>  

              <input type="radio" name="drone" value="false" onChange={(e) => setIsArtist(false)}
                    checked={isArtist === false}/>
              <label htmlFor="false">No</label>
          </div>
          <div className="UploadModalInputContainer">
            <label>Artist</label>
            <input
              type="text"
              name="Artist"
              onChange={updateArtist}
              value={artist}
              required={true}
              disabled={isArtist === true}
            ></input>
          </div>
          <div className="UploadModalInputContainer">
            <label htmlFor="Genre">Genre</label>
            <select
              type="text"
              name="Genre"
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
            >
            {genres?.map((el) => {
              return <option key={el?.name}>{el?.name}</option>
            })}
            </select>
          </div>
          <div className="UploadModalInputContainer">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={updateImage}
            />
            {imageLoading && <p>Loading...</p>}
          </div>
          <div className="UploadModalInputContainer">
            <label>Audio File</label>
            <input
              type="file"
              name="Audio File"
              onChange={updateAudio}
              required={true}
            ></input>
            {musicLoading && <p>Loading...</p>}
          </div>
          <div className="UploadModalButtonContainer">
            <button className="UploadModalSubmit__form" type="submit">
              Add Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
