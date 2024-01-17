import { axiosRequest } from "../api/axiosDefault"

export const fetchMoreData = async (resource, setResource) => {
    try {
        const { data } = await axiosRequest.get(resource.next);
        console.log({data})
        setResource(prevResource => ({
            ...prevResource,
            next: data.next,
            results: data.results.reduce((posts, currentPost) => {
                return posts.some(post => post.id === currentPost.id)
                ? posts
                : [...posts, currentPost]
            }, prevResource.results),
        }))
    } catch (error) {
        console.log(error);
    }
}

export const handleFollow = (profile, targetProfile, followingId) => {
    return profile.id === targetProfile.id
      ? {
          ...profile,
          followers_count: profile.followers_count + 1,
          following_id: followingId,
        }
      : profile.is_owner
        ? { 
            ...profile, 
            following_count: profile.following_count + 1 
        }
        : profile;
  };

  export const handleUnfollow = (profile, targetProfile, followingId) => {
    return profile.id === targetProfile.id
      ? {
          ...profile,
          followers_count: profile.followers_count - 1,
          followingId,
        }
      : profile.is_owner
        ? { 
            ...profile, 
            following_count: profile.following_count - 1 
        }
        : profile;
  };