import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import appStyles from '../../App.module.css'
import { axiosRequest } from '../../api/axiosDefault';
import { useUser } from '../../Contexts/UserContext';
import Asset from '../../components/Asset';

function PopularProfiles({ mobile }) {
    const user = useUser()
    const [ profiles, setProfiles ] = useState({
        pageProfiles: { results: [] },
        popularProfiles: { results: [] }
    }); 

    const { popularProfiles } = profiles;

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axiosRequest.get(
                    '/profiles/?ordering=-followers_count'
                )
                setProfiles(prevProfiles => ({
                    ...prevProfiles,
                    popularProfiles: data
                }))
            } catch (error) {
                console.log(error);
            }
        })()
    }, [user])
  return (
    <Container className={`${appStyles.Content} ${mobile && 'd-lg-none text-center mb-3'}`}>
        {popularProfiles.results.length ? (
            <>
                <p>Most followed profiles</p>
                {mobile ? (
                    <div className='d-flex justify-content-around'>
                        {popularProfiles.results.slice(0,4).map(profile => (
                            <p key={profile.id}>{profile.owner}</p>
                        ))}
                    </div>
                ) : (
                    popularProfiles.results.map(profile => (
                        <p key={profile.id}>{profile.owner}</p>
                    ))
                )}
            </>
        ) : (
            <Asset spinner />
        )}
    </Container>
  )
}

export default PopularProfiles