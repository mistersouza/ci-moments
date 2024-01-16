import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { axiosRequest } from "../../api/axiosDefault";
import { useUser } from "../../Contexts/UserContext";

import Post from "../posts/Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  const user = useUser();
  const profileImage = user?.profile_image;

  useEffect(() => {
    (async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosRequest.get(`/posts/${id}`),
          axiosRequest.get(`/comments/?post=${id}`)
        ]);
        setPost({ results: [post] });
        setComments(comments)
      } catch (error) {
        console.log({ error });
      }
    })();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Post {...post.results[0]} setPost={setPost} postPage />
        <Container className={appStyles.Content}>
          {user ? (
            <CommentCreateForm
              profileId={user.profile_id}
              profileImage={profileImage}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            comments.results.map(comment => (
              <Comment 
                key={comment.id} 
                {...comment}
                setPost={setPost}
                setComments={setComments}
              />
            ))
          ) : (
            user ? (
              <span>No comments yet. Be the first to make an impression</span>
            ) : (
              <span>No comments... yet</span>
            )
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;
