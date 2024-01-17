import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";


import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import Asset from "../../components/Asset";
import PopularProfiles from "./PopularProfiles";
import Post from "../posts/Post";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import NoResults from '../../assets/no-results.png'
import { useUser } from "../../contexts/UserContext";
import { useParams } from 'react-router'
import { axiosRequest } from "../../api/axiosDefault";
import { useProfile, useSetProfile } from "../../contexts/ProfileContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function ProfilePage() {
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const [ isLoaded, setIsLoaded ] = useState(false);
  const user = useUser();
  const { setProfiles, handleFollowClick, handleUnfollowClick } = useSetProfile()
  const { id } = useParams()
  const { pageProfile } = useProfile(); 
  const [ profile ] = pageProfile.results;
  const isOwner = user?.username === profile?.owner; 
    
  useEffect(() => {
    (async () => {
        try {
            const [{ data: pageProfile }, { data: profilePosts }] = await Promise.all([
                axiosRequest.get(`/profiles/${id}/`),
                axiosRequest.get(`/posts/?owner__profile=${id}`),
            ])
            setProfiles(prevProfile => ({
                ...prevProfile,
                pageProfile: { results: [pageProfile] }
            }))
            setProfilePosts(profilePosts);
            setIsLoaded(true);
        } catch (error) {
            // console.log(error)
        }
    })()
  }, [setProfiles, id])

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image 
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className='justify-content-center no-gutters'>
            <Col xs={3} className="my-2">
                <div>{profile?.posts_count}</div>
                <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
                <div>{profile?.followers_count}</div>
                <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
                <div>{profile?.following_count}</div>
                <div>following</div>
            </Col>
          </Row>
          
        </Col>
        <Col lg={3} className="d-flex justify-content-center">
        {user && !isOwner && (profile?.following_id ? (
            <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => handleUnfollowClick(profile)}
            >unfolllow</Button>
        ) : (
            <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollowClick(profile)}
            >follow</Button>
        ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll 
          children={
            profilePosts.results.map(post => (
              <Post key={post.id} {...post} setProfilePosts={setProfilePosts} />
            ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Container>
          <Asset 
            src={NoResults} 
            message={`No results found, ${profile?.owner} hasn't posted yet`}
          />
        </Container>
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {isLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;