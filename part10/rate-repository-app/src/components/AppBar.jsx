import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingBottom: 10
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <ScrollView horizontal>
            <AppBarTab 
                to='/'
                tabName='Repositories'
            />
            <AppBarTab
                to='/sign-in'
                tabName='Sign in'
            />
        </ScrollView>
    </View>
  );
};

export default AppBar;