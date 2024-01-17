import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";

import { axiosRequest, axiosResponse } from "../api/axiosDefault";
import { handleFollow } from "../utils/utils";

export const ProfileContext = createContext();
export const SetProfileContext = createContext(); 

export const useProfile = () => useContext(ProfileContext);
export const useSetProfile = () => useContext(SetProfileContext);

export const ProfileProvider = ({ children }) => {
    const user = useUser()
    const [ profiles, setProfiles ] = useState({
        pageProfile: { results: [] },
        popularProfiles: { results: [] }
    }); 

    const handleFollowClick = async (targetProfile) => {
        try {
            const { data } = await axiosResponse.post('/followers/', {
                followed_by: targetProfile.id,
            })
            setProfiles(prevProfiles => ({
                ...prevProfiles,
                pageProfile: {
                    results: prevProfiles.pageProfile.results.map(profile => 
                        handleFollow(profile, targetProfile, data.id)
                    )
                },
                popularProfiles: {
                    ...prevProfiles.popularProfiles,
                    results: prevProfiles.popularProfiles.results.map(profile => 
                        handleFollow(profile, targetProfile, data.id)
                    )
                }
            }))
        } catch (error) {
            console.log(error);
        }
    }

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
        <ProfileContext.Provider value={profiles}>
            <SetProfileContext.Provider value={{setProfiles, handleFollowClick}}>
                {children}
            </SetProfileContext.Provider>
        </ProfileContext.Provider>
    );
}