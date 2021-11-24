import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { AUTHORIZED_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingBottom: 10
  }
});

const AppBar = () => {

    const { data } = useQuery(AUTHORIZED_USER);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const authorizedUser = data ? data.authorizedUser : null;

    const signOut = async () => {
        await authStorage.removeAccessToken();
        await apolloClient.resetStore();
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab 
                    to='/'
                    tabName='Repositories'
                />
                {
                    !authorizedUser ? 
                    <AppBarTab
                        to='/sign-in'
                        tabName='Sign in'
                    /> :
                    <AppBarTab 
                        to='/'
                        tabName='Sign out'
                        onPress={() => signOut()}
                    />
                }
            </ScrollView>
        </View>
    );
};

export default AppBar;