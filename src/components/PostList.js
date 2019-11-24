import React from "react";
//run action fetchPosts any time our component is mounted on the screen
import { connect } from "react-redux";
import { fetchPosts } from "../actions";
import UserHeader from "./UserHeader";

// use class component tu use componentdidmount for fetching data
/*1.state пустой
2. после того, как получили fetch data и dispatch action to reducer,
reducer видит, что это FETCH_POSTS и возвращает payload.
3. redux видит, что мы вовращаем объект, которого нет в памяти (не пустой state,
  а теперь action.pyload) и сообщает react сделать rerender с новыми данными
*/
class PostList extends React.Component {
  componentDidMount() {
    //console.log(this.props.fetchPosts());
    this.props.fetchPosts(); //return type: 'FETCH_POSTS'
  }

  //posts получено из mapStateToProps >> reducers
  renderList() {
    return this.props.posts.map(post => {
      return (
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user" />
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p> {post.body} </p>
            </div>
            {/*(180) http://jsonplaceholder.typicode.com/posts передадим как prop userId,
            которое находится в инфе каждого post */}
            <div>
              <UserHeader userId={post.userId} />
            </div>
          </div>
        </div>
      );
    });
  }

  /*1.1. вызывается render() с пустым state
  5. props.posts рендериться внутри компонента
  */
  render() {
    //previously added mapStateToProps
    console.log(this.props.posts);
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}

// from ./reducers index posts
/*4 mapStateToProps вызывается 2й раз с новым значеним state.props
 */
let mapStateToProps = state => {
  return { posts: state.posts };
};

/* null - we havent mapStateToProps just yet
export default connect(null, { fetchPosts })(PostList);
*/
// add mapStatToProps
export default connect(mapStateToProps, { fetchPosts })(PostList);
