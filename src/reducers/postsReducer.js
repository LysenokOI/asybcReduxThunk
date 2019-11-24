// causes error message, postsReducer is undefind
/*use js switch statement to make sure that we always handle every action without error*/
export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return action.payload;
    default:
      return state;
  }
  /*if (action.type === "FETCH_POSTS") {
    return action.payload;
  }*/
};
