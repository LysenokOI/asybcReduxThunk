import _ from "lodash";
import jsonPlaceHolder from "../apis/jsonPlaceHolder";

/*(162) bad approach! breaking rules of the action creator. actions must be plain objects.
we are not returning plain js object, ES2015 formarts it in the browser to a huge code due to
async/await and returning request object jsonPlaceHolder.get("/posts").
without async/await we call request and wait for response some time, but reducers must get 
the data immediately.
need to use redux-thunk as middleware to deal with async action creator

export let fetchPosts = async () => {
  let response = await jsonPlaceHolder.get("/posts");
  return {
    type: "FETCH_POSTS",
    payload: response
  };
};
*/
/*redux thunk:
pass actions into dispatch function to change any data. call getState and return all data 
of the redux store. then wait for request to finish, then dispatch action manually and got 
new action, then pass it to the action */
/*export let fetchPosts = (dispatch, getState) => {
  return async function() {
    refactor:*/
//(176)в response получаем слишком много данных, поэтому сократим только до data
export let fetchPosts = () => async dispatch => {
  let response = await jsonPlaceHolder.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};
/*// (179)add action to fetch 1 user at time
рефакторинг memoize в 186 */
export const fetchUser = id => async dispatch => {
  let response = await jsonPlaceHolder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

/*(184,185) memoize не будет работать, потому что  function(dispatch) все равно будет 
запускаться каждый раз с помощью redux thunk, т.к. была передана функция, а не объект.
не прокатит делать memoize function dispatch, т.к. fetchUser каждый раз создает
новую функцию с аргументом id, и memoize тоже каждый раз создается заново  
export const fetchUser = _.memoize(function(id) {
  return async function(dispatch) {
    let response = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({ type: "FETCH_USER", payload: response.data });
  };
});
*/
/*(186) сделаем правильный рфакторинг, использую memoize
export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

let _fetchUser = _.memoize(async (id, dispatch) => {
  let response = await jsonPlaceHolder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
});
*/

/*(187) 2d way get list of posts and iterate over unique users id, fetch them.
(188) в action обращаемся к функции, поэтому нужно добавить dispatch к fetchPosts.
требуется await fetchPosts, чтобы убедиться, что посты загружены, прежде чем 
итерировать User id.
getState - get access to the redux store */
export const fetchPostsAndUsers = id => async (dispatch, getState) => {
  //console.log("about to fetch posts");
  await dispatch(fetchPosts());
  /*(190) replace with _.chain()
  const userIds = _.uniq(_.map(getState().posts, "userId"));
  userIds.forEach(id => dispatch(fetchUser(id))); */

  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value(); //value - execute
  //console.log(userIds);
  //console.log("fetched posts");
  //console.log(getState().posts);
};
