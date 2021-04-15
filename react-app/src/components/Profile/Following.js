import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import './Following.css';
import * as followActions from '../../store/follows';


function Following() {

  const history = useHistory();
  const dispatch = useDispatch();
  const followings = useSelector((state) => state?.follows.followers);
  const followers = useSelector((state) => state?.follows.following);
  const user = useSelector((state) => state?.session.user);
  const songs = useSelector((state) => state?.song);
  const [followsChanged, setFollowsChanged] = useState(false);

  const userSongs = Object.values(songs).filter((song) => song.user_id === user.id)

  const onFollow = (e, artistId) => {
    e.stopPropagation()
    dispatch(followActions.addFollow(user.id, artistId));
    setTimeout(() => {
      setFollowsChanged(true);

    }, 100)

  }

  const OnClick = (id) => {
    const to = `/user/songs/${id}`;
    history.push(to)
  }


  const offFollow = (e, artistId) => {
    e.stopPropagation()
    dispatch(followActions.removeFollow(user.id, artistId));

  }

  useEffect(() => {
    dispatch(followActions.fetchUserFollows(user?.id))
    setFollowsChanged(false)
  }, [dispatch, user, followsChanged])

  return (
    <div className='following-area-outer'>
          <div className='following-area-inner'>
            {followings?.map((following) => {
              return (
                <div>
                  <div className='profile__circle'>
                    {!following?.profile_URL ? (
                      <div onClick={() => OnClick(following?.id)}>
                        {following?.artist_name[0]}
                      </div>
                    ) :
                      (
                        <img
                          className="profile__image"
                          src={`${following?.profile_URL}`}
                          alt="profile-server"
                          onClick={() => OnClick(following?.id)}
                        />
                      )}
                  </div>
                  <div className='following-name'>{following?.artist_name}</div>
                  {followings.includes(following) ? <div className='follow1' onClick={(e) => offFollow(e, following?.id)}>unFollow</div> : <div className='follow1' onClick={(e) => onFollow(e, following?.id)}>+ Follow</div>}

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





export default Following;