import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Post from './Post'
import Asset from '../../components/Asset'

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosRequest } from '../../api/axiosDefault'

import NoResults from '../../assets/no-results.png'
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function PostsPage({ message, filter='' }) {
  const [ posts, setPosts ] = useState({ results: [] });
  const [ query, setQuery ] = useState(''); 
  const [ isLoaded, setIsLoaded ] = useState(false); 
  const { pathname } = useLocation(); 

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axiosRequest.get(`/posts/?${filter}search=${query}`);
          setPosts(data)
          setIsLoaded(true)
        } catch (error) {
          console.log(error);
        }
      }
      setIsLoaded(false)
      const timer = setTimeout(() => {
        fetchData(); 
      }, 1200)
      return () => clearTimeout(timer); 
    }, [filter, query, pathname])
    
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile/>
        <i className={`fa fa-search ${styles.SearchIcon}`} />
        <Form 
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            type='text'
            className='mr-sm-2'
            placeholder='Search posts'
            value={query}
            onChange={({target}) => setQuery(target.value)}
          />
        </Form>
        {isLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={
                  posts.results.map(post => (
                    <Post key={post.id} {...post} setPosts={setPosts}/>
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )
            }
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner/>
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;