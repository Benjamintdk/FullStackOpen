import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import { Route, Switch, Redirect } from 'react-router-native';
import SingleRepositoryItem from './SingleRepositoryItem';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
      <View style={styles.container}>
        <AppBar />
        <Switch>
            <Route path="/" exact>
                <RepositoryList />
            </Route>
            <Route path="/sign-in" exact>
                <SignIn />
            </Route>
            <Route path='/sign-up' exact>
                <SignUp />
            </Route>
            <Route path='/my-reviews' exact>
                <MyReviews />
            </Route>
            <Route path="/create-review" exact>
                <CreateReview />
            </Route>
            <Route path="/:id" exact>
                <SingleRepositoryItem />
            </Route>
            <Redirect to="/" />
        </Switch>
      </View>
  );
};

export default Main;