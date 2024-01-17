import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosResponse } from "../../api/axiosDefault"

import styles from "../../styles/CommentCreateEditForm.module.css";

function CommentEditForm({ id, content, setShowEditForm, setComments }) {
  const [formContent, setFormContent] = useState(content);

  const handleInputChange = ({ target }) => {
    setFormContent(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosResponse.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleInputChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;