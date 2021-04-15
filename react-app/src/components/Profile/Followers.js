import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import * as followActions from '../../store/follows';
import './Followers.css';


function Followers() {

  const history = useHistory();
  const dispatch = useDispatch();
  const followings = useSelector((state) => state?.follows.followers);
  const followers = useSelector((state) => state?.follows.following);
  const user = useSelector((state) => state?.session.user);
  const songs = useSelector((state) => state?.song);
  const [followsChanged, setFollowsChanged] = useState(false);

  const userSongs = Object.values(songs).filter((song) => song.user_id === user.id)


  const OnClick = (id) => {
    const to = `/user/songs/${id}`;
    history.push(to)
  }


  useEffect(() => {
    dispatch(followActions.fetchUserFollows(user?.id))
    setFollowsChanged(false)
  }, [dispatch, user, followsChanged])

  return (
    <div className='follower-area-outer'>
      <div className='follower-area-inner'>
        {followers?.map((follower) => {
          return (
            <div>
              <div className='profile__circle'>
                {!follower?.profile_URL ? (
                  <div onClick={() => OnClick(follower?.id)}>
                    {follower?.artist_name[0]}
                  </div>
                ) :
                  (
                    <img
                      className="profile__image"
                      src={`${follower?.profile_URL}`}
                      alt="profile-server"
                      onClick={() => OnClick(follower?.id)}
                    />
                  )}
              </div>
              <div className='follower-name'>{follower?.artist_name}</div>

            </div>


          )
        })}
      </div>
      <div className='user__info1'>
        <div className='following1'> Following
              <div>{followings?.length}</div>
        </div>
        <div className='followers1'> Followers
              <div>{followers?.length}</div>
        </div>
        <div className='tracks1'> Tracks
              <div>{userSongs?.length}</div>
        </div>
      </div>
    </div>
  )
}





export default Followers;