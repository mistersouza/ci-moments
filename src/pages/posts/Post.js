import React from "react";
import { useUser } from "../../Contexts/UserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Post.module.css";
import { axiosResponse } from "../../api/axiosDefault";

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
  setPosts
}) {
  const user = useUser();
  const isOwner = user?.username === owner;

  const handleLikeClick = async () => {
    try {
      const { data } = await axiosResponse.post("/likes/", { post: id });
      setPosts(prevPosts => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  }

  const handleUnlikeClick = async () => {
    try {
      await axiosResponse.delete(`/likes/${like_id}/`);
      setPosts(prevPosts => ({
        ...prevPosts,
        results: prevPosts.results.map(post => (
          post.id === id
          ? { ...post, likes_count: post.likes_count - 1, like_id: null }
          : post
        )),
      }));
    } catch (err) {
      console.log(err);
    }
  }

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
            <span onClick={handleUnlikeClick}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : user ? (
            <span onClick={handleLikeClick}>
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
