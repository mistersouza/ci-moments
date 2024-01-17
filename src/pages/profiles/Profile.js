import React from 'react'
import styles from '../../styles/Profile.module.css'
import btnStyle from '../../styles/Button.module.css'
import { useUser } from '../../Contexts/UserContext'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Avatar from '../../components/Avatar'
import { Button } from 'react-bootstrap'
import { useSetProfile } from '../../Contexts/ProfileContext'

const Profile = ({ profile, mobile}) => {
    const user = useUser()
    const { id, following_id, image,  owner } = profile; 
    const isOwner = user?.username === owner;
    const { handleFollowClick, handleUnfollowClick } = useSetProfile(); 

  return (
    <div className={`my-3 d-flex`}>
        <div className={`d-flex align-items-center flex-grow-1 ${mobile && 'flex-column'}`}>
            <Link to={`/profiles/${id}`}>
                <Avatar src={image} height={55} />
            </Link>
            <div className={`${styles.WordBreak} mx-2`}>
                <strong>{owner.slice(0,9)}</strong>
            </div>
        </div>
        <div className={`d-flex ${!mobile && 'ml-auto'}`}>
            {!mobile && !isOwner && user && (
                following_id ? (
                    <Button
                        className={`${btnStyle.Button} ${btnStyle.BlackOutline}`}
                        onClick={() => handleUnfollowClick(profile)}
                    >unfolllow</Button>
                ) : (
                    <Button
                        className={`${btnStyle.Button} ${btnStyle.Black}`}
                        onClick={() => handleFollowClick(profile)}
                    >follow</Button>
                ))}
        </div>
    </div>
  )
}

export default Profile