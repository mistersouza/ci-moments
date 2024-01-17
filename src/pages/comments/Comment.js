import React, { useState } from "react";

import styles from "../../styles/Comment.module.css";
import { useUser } from "../../contexts/UserContext";
import { axiosResponse } from "../../api/axiosDefault";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Media from "react-bootstrap/Media";

import Avatar from "../../components/Avatar";
import CommentEditForm from "./CommentEditForm";
import { MoreDropdown } from "../../components/MoreDropdown";

function Comment({
  profile_id,
  profile_image,
  owner,
  updated_at,
  content,
  id,
  setPost,
  setComments,
}) {
  const [showEditForm, setShowEditForm] = useState(false);
  const user = useUser();
  const isOwner = user?.username === owner;

  const handleDeleteClick = async () => {
    try {
      await axiosResponse.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <div>
      <hr />
      <Media className="d-flex">
        <div className="d-flex flex-grow-1">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
          </Link>
          <Media.Body className="container">
            <span className={styles.Owner}>{owner}</span>
            <span className={styles.Date}>{updated_at}</span>
            {showEditForm 
                ? <CommentEditForm
                    id={id}
                    profileId={profile_id}
                    content={content}
                    profileImage={profile_image}
                    setComments={setComments}
                    setShowEditForm={setShowEditForm}
                    /> 
                : <p>{content}</p>
            }
          </Media.Body>
        </div>
        {isOwner && !showEditForm && (
          <MoreDropdown
            handleEditClick={() => setShowEditForm(true)}
            handleDeleteClick={handleDeleteClick}
          />
        )}
      </Media>
    </div>
  );
}

export default Comment;
