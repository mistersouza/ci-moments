import React from "react";
import { useUser } from "../../Contexts/UserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Post.module.css";

function Post({
  id,
  owner,
  profile_id,
  profile_image,
  comments_count,
  likes_count,
  like_id,
  title,
  content,
  image,
  updated_at,
  postPage,
}) {
  const user = useUser();
  const isOwner = user?.username === owner;

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="d-flex align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div>
            <span>{updated_at}</span>
            {isOwner && postPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
          {title && <Card.Title className='text-center'>{title}</Card.Title>}
          {content && <Card.Text>{content}</Card.Text>}
          <div className={styles.PostBar}>
            {isOwner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() => {}}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : user ? (
            <span onClick={() => {}}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
            {likes_count}
            <Link to={`/posts/${id}`}>
              <i className='far fa-comments' />
            </Link>
            {comments_count}
          </div>
      </Card.Body>
    </Card>
  );
}

export default Post;
