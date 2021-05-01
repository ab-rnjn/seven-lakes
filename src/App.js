import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import PostListComponent from './Components/PostListComponent';
import ApplicationContext from './Contexts';
import { getPostComments, getPostList, getUserList } from './Services';
import PostComponent from './Components/PostComponent';
import UserComponent from './Components/UserComponent';

const ContextWrapper = ({
  children,
}) => {
  const [postList, setPostList] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [currentPost, setCurrentPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchPostList = async () => {
    try {
      const fetchedPostList = await getPostList();
      setPostList(fetchedPostList);
    } catch (error) {
      setPostList([]);
    }
  }

  const fetchUserMap = async () => {
    try {
      const fetchedUserList = await getUserList();
      const userMap = fetchedUserList.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});
      setUserMap(userMap);
    } catch (error) {
      setUserMap({});
    }
  }

  const fetchPostComments = async (postId) => {
    try {
      const commentList = await getPostComments(postId);
      return commentList;
    } catch (error) {
    }
  }

  return (
    <ApplicationContext.Provider
      value={{
        postList,
        userMap,
        currentPost,
        currentUser,
        fetchPostList,
        fetchUserMap,
        setCurrentPost,
        setCurrentUser,
        fetchPostComments,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

function App() {
  return (
    <div className="app-routes">
      <ContextWrapper>
        <Router>
          <Switch>
            <Route path="/" exact component={PostListComponent} />
            <Route path="/post" exact component={PostComponent} />
            <Route path="/user" exact component={UserComponent} />
          </Switch>
        </Router>
      </ContextWrapper>
    </div>
  );
}

export default App;
