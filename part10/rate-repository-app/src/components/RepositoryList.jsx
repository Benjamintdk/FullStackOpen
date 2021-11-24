import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => {
    return (
        <View style={styles.separator} />
    );
};

const renderItem = ({ item }) => {
    return (
        <View>
            <RepositoryItem item={item} />
        </View>
    );
};

const RepositoryList = () => {
    const { repositories } = useRepositories();

    // Get the nodes from the edges array
    const repositoryNodes = repositories && repositories.edges
    ? repositories.edges.map(edge => edge.node)
    : [];
    
    return (
    <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.id}
    />
    );
};

export default RepositoryList;