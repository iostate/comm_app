import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostsNew extends Component {

	/**
	 * Renders the reduxForm Field component. Called inside the
	 * render() function within this component. 
	 *
	 * @param {*} field - Object containing the props of the Field
	 * component from which this function was called for. 
	 * @memberof PostsNew
	 */
	renderField(field) {

		// Destructure validation properties for use with validation
		const { meta: { touched, error } } = field; 

		// turn the field component red if there's an error
		const className = `form-group ${touched && error ? 'has-danger' : '' }`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				{
					// passing the props of Field into this input by using spread operator
				}
				<input
					className="form-control"
					type="text"
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	/**
	 * Submit the values of the form to the API.
	 *
	 * @param {*} values - Object containing the values of the form.
	 * @memberof PostsNew
	 */
	onSubmit(values) {
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}

	render() {
		// handleSubmit() == onSubmit()
		const { handleSubmit } = this.props;

		return(
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field 
					label="Title"
					name="title"
					component={this.renderField}
				/>
				<Field 
					label="Categories"
					name="categories"
					component={this.renderField}
				/>
				<Field 
					label="Post Content"
					name="content"
					component={this.renderField}
				/>
				<button className="btn  btn-primary" type="submit">Submit</button>
				<Link className="btn btn-danger" to="/">Cancel</Link>
			</form>
		);
	}
}

/**
 * Used for notifying the user if there are any validation errors
 * with their input values.
 * Returns an object with the validation errors for the form.
 * @param {*} values - The values from the form. 
 * @returns {} errors - The errors that were found after 
 * validating the form.
 */
function validate(values) {
	
	// Object that holds all the errors for the form
	const errors = {};
	if (!values.title) {
		errors.title = "Enter a title";
	}
	if (!values.categories) {
		errors.categories = "Enter some categories";
	}
	if (!values.content) {
		errors.content = "Enter some content";
	}

	return errors;

}

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
	connect(
		null, {createPost}
	)(PostsNew));