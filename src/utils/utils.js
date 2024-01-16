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