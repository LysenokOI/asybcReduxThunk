import React from "react";
//(180) for connection fetchUser and UserHeader
import { connect } from "react-redux";
/* (189) replace with fetchPostsAndUser
import { fetchUser } from "../actions";
*/
class UserHeader extends React.Component {
  /* (180) when ever component appears on the screen we want to make sure that we
  attempt to fetch user. userId получено из renderList() */
  /* (189) replace with fetchPostsAndUsers  
  componentDidMount() {
    
    this.props.fetchUser(this.props.userId);
  }
  */

  render() {
    /* (182.1) вместо того, чтобы обращаиться каждый раз ко всему спивску users,
    будем находить одного из state в mapStateToProps
    const user = this.props.users.find(
      user => user.id === this.props.userId
    );
*/
    /* (182.4) теперь можем обращаться к отдельному user из mapStateToProps
    this.props.user */
    const { user } = this.props;
    //console.log(user);
    if (!user) {
      return null;
    }

    return <div className="header">{user.name}</div>;
  }
}

// (182.3) можем обратиться к props в state через ownProps и получить оттуда userId
const mapStateToProps = (state, ownProps) => {
  /*(182.2) надем одного user, вместо того, чтобы получать всех
  return { users: state.users };*/
  return { user: state.users.find(user => user.id === ownProps.userId) };
};

/* (189) replace with fetchPostsAndUser
export default connect(mapStateToProps, { fetchUser })(UserHeader);
*/
export default connect(mapStateToProps)(UserHeader);
