import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import useSingleRepository from '../hooks/useSingleRepository';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';

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

const SingleRepositoryItem = () => {

    const { id } = useParams();

    const { repository, loading, fetchMore } = useSingleRepository({ id, first: 4 });

    if (loading) {
        return <View></View>;
    }

    const reviews = repository && repository.reviews.edges
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

    const onEndReach = () => {
        fetchMore();
    };

    return (
        <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={({ id }) => id}
          ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
          ItemSeparatorComponent={ItemSeparator}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
    );
};

export default SingleRepositoryItem;