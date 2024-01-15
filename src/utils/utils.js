import { axiosRequest } from "../api/axiosDefault"

export const fetchMoreData = async (resource, setResource) => {
    try {
        const { data } = axiosRequest.get(resource.next);
        setResource(prevResource => ({
            ...prevResource,
            next: data.next,
            results: data.results.reduce((posts, currentPost) => {
                return posts.some(post => post.id === currentPost.id)
                ? posts
                : [...posts, currentPost]
            }, prevResource.results)
        }))
    } catch (error) {
        console.log(error);
    }
}