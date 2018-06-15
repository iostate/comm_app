import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

// ==================NOTE==================
// What actions will this component use? 
// fetchPost() and deletePost()
// Will render a singular post, with a button
// that will allow us to delete the post
// Also, a button that will link us back to
// index

class PostsShow extends Component {
	componentDidMount() {
		console.log('this.props.match = ');
		console.log(this.props.match);
		const { id } = this.props.match.params;
		this.props.fetchPost(id);
	}


	// handle deleting the Post
	onDeleteClick() {
		// pull the ID off the URL
		const { id } = this.props.match.params;
		this.props.deletePost(id, () => {
			// Navigate the user back to the index of the posts
			this.props.history.push('/');
		});
	}

	render() {
		const { post } = this.props;

		if (!post) {
			return <div>Loading . . </div>;
		}
		return(
			<div>
				<Link to="/" className="btn btn-primary">Back to Index</Link>
				<button 
					className="btn btn-danger pull-xs-right"
					onClick={this.onDeleteClick.bind(this)}
				>
					Delete Post
				</button>
				<h3>{post.title}</h3>
				<h6>{post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	}
}

/**
 * Assign the post with the post from the API with the 
 * provided ID key.
 *
 * @param {*} {posts} Grab the posts from the state.
 * @param {*} ownProps Object containing the props of this component.
 */
function mapStateToProps({posts}, ownProps) {
	return {post: posts[ownProps.match.params.id]};

}

export default connect(
	mapStateToProps, { fetchPost, deletePost }
)(PostsShow);