import _ from 'lodash'; // used to map fetch posts' results
import { CREATE_POST, DELETE_POST, FETCH_POST, FETCH_POSTS } from '../actions/types';

/**
 * Think about how the data structure that will hold
 * the values that pass through this reducer.
 * In this case, the data structure that will hold the values
 * will be an object. Thus, provide the default value of the state
 * as an object
 *
 * @export
 * @param {*} [state={}] State of the application. Default value will be an Object
 * if nothing else is provided.
 * @param {*} action The redux action that will be executed. 
 */
export default function(state = {}, action) {
	switch (action.type) {
		case DELETE_POST:

			// omit function does not modify the current state
			// instead, it returns us an entirely new state
			// without the post we're trying to delete
			return _.omit(state, action.payload);
		case FETCH_POST:
			// I think this is using the user specified ID in order to retrieve 
			// that particular post from the state, then assigning it the data
			// from that same post.. we aren't actually mutating or doing anything 
			// to the state.. simply just grabbing something? 
			return {...state, [action.payload.data.id]:action.payload.data};
		case FETCH_POSTS:
			return _.mapKeys(action.payload.data, "id");
		default:
			return state;
	}
}