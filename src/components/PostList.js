import React from "react";
//run action fetchPosts any time our component is mounted on the screen
import { connect } from "react-redux";
import { fetchPosts } from "../actions";

// use class component tu use componentdidmount for fetching data
class PostList extends React.Component {
  componentDidMount() {
    //console.log(this.props.fetchPosts());
    this.props.fetchPosts(); //return type: 'FETCH_POSTS'
  }

  render() {
    return <div>Post List</div>;
  }
}

// null - we havent mapStateToProps just yet
export default connect(null, { fetchPosts })(PostList);
