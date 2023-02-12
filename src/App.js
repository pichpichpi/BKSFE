import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {Switch} from 'react-router-dom';

import store from './redux/store';
import setAuthToken from './redux/auth/auth.utils';
import {loadUser} from './redux/auth/auth.actions';

import Header from './components/organisms/Header/Header.component';
import Alert from './components/Alert/Alert.component';
import HomePage from './modules/HomePage/HomePage.component';
import QuestionsPage from './modules/QuestionsPage/QuestionsPage.component';
import AllTagsPage from './modules/AllTagsPage/AllTagsPage.component';
import AllUsersPage from './modules/AllUsersPage/AllUsersPage.component';
import Register from './modules/Register/Register.component';
import Login from './modules/Login/Login.component';
import Post from './modules/Post/Post.component';
import PostForm from './modules/PostForm/PostForm.component';
import TagPage from './modules/TagPage/TagPage.component';
import ProfilePage from './modules/ProfilePage/ProfilePage.component';
import NotFound from './modules/NotFound/NotFound.component';

import { BaseRoute, LayoutRoute } from './Router';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className='App'>
        <Header />
        <Alert />
        <Switch>
          <LayoutRoute
            exact
            path='/'
            title='BKSeach'
          >
            <HomePage/>
          </LayoutRoute>
          <LayoutRoute
            exact
            path='/questions'
            title='All Questions '
          >
            <QuestionsPage/>
          </LayoutRoute>
          <LayoutRoute
            exact
            path='/tags'
            title='Tags'
          >
            <AllTagsPage/>
          </LayoutRoute>
          <LayoutRoute
            exact
            path='/users'
            title='Users'
          >
            <AllUsersPage/>
          </LayoutRoute>
          <BaseRoute
            exact
            path='/register'
            title='Sign Up'
          >
            <Register/>
          </BaseRoute>
          <BaseRoute
            exact
            path='/login'
            title='Log In'
          >
            <Login/>
          </BaseRoute>
          <LayoutRoute
            exact
            path='/questions/:id'
            title='Users'
          >
            <Post/>
          </LayoutRoute>
          <LayoutRoute
            exact
            path='/users/:id'
            title='Users'
          >
            <ProfilePage/>
          </LayoutRoute>
          <LayoutRoute
            exact
            path='/tags/:tagname'
            title='Users'
          >
            <TagPage/>
          </LayoutRoute>
          <BaseRoute
            exact
            path='/add/question'
            title='Ask a Question'
          >
            <PostForm/>
          </BaseRoute>
          <BaseRoute
            path='*'
            title='Error 404'
          >
            <NotFound/>
          </BaseRoute>
        </Switch>
      </div>
    </Provider>
  );
};

export default App;
