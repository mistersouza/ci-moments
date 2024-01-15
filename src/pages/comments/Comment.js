import React from 'react'
import styles from '../../styles/Comment.module.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Media } from 'react-bootstrap'
import Avatar from '../../components/Avatar'

function Comment({ profile_id, profile_image, owner, updated_at, content }) {
  return (
    <div>
        <hr />
        <Media className='d-flex'>
            <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image}/>
            </Link>
            <Media.Body>
                <span className={styles.Owner}>{owner}</span>
                <span className={styles.Date}>{updated_at}</span>
                <p>{content}</p>
            </Media.Body>
        </Media>
    </div>
  )
}

export default Comment