import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";

import { axiosRequest } from "../api/axiosDefault";

export const ProfileContext = createContext();
export const SetProfileContext = createContext(); 

export const useProfile = () => useContext(ProfileContext);
export const useSetProfile = () => useContext(SetProfileContext);

export const ProfileProvider = ({ children }) => {
    const user = useUser()
    const [ profiles, setProfiles ] = useState({
        pageProfiles: { results: [] },
        popularProfiles: { results: [] }
    }); 

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
            <SetProfileContext.Provider value={setProfiles}>
                {children}
            </SetProfileContext.Provider>
        </ProfileContext.Provider>
    );
}