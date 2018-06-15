import axios from 'axios';
// import * from './types'; DON'T DO THIS.. BAD PRACTICE.
import { CREATE_POST, FETCH_POST, FETCH_POSTS, DELETE_POST } from './types';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=ICEPICK2132';

/**
 * Fetch a specific post from the API
 *
 * @export
 * @param {*} id - The id of the post that will be fetched. 
 */
export function fetchPost(id) {
	// Retrieve a specific post identified by the ID from API
	const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

	return {
		type: FETCH_POST,
		payload: request
	};
}

/**
 * Fetch all posts from the API.
 *
 * @export
 * @returns
 */
export function fetchPosts() {
	const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
	console.log(request);

	return {
		type: FETCH_POSTS,
		payload: request
	};
}

/**
 * Create a post and send it to the API.
 *
 * @export
 * @param {*} values - The content of the post. values seems
 * to be the values of the Form with Redux-Form Field components. 
 * @param {*} callback - A function that will be executed once the 
 * comment has been posted. In this case, it will be a function
 * that navigates the user back to the home page.
 */
export function createPost(values, callback) {
	// Post the new comment to API, 
	// then execute the callback function
	const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
		.then( () => callback() );

		return {
			type: CREATE_POST,
			payload: request
		};
}

/**
 * Delete a post from the API and then navigate a user back to the index
 * of all the posts. 
 *
 * @export
 * @param {*} id The ID of the post that I will delete. 
 * @param {*} callback The callback function that will be called 
 * after deleting the post. In this case, it will be a function 
 * that will navigate the user back to the index of all the posts.
 */
export function deletePost(id, callback) {
	// delete post from API then navigate 
	// user back to index of all posts
	const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
		.then( () => callback() );

	return {
		type: DELETE_POST,
		payload: id
	};
}