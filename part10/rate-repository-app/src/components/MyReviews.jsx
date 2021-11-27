import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import MyReview from './MyReview';
import useAuthorizedUser from "../hooks/useAuthorizedUser";

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

const MyReviews = () => {

    const { authorizedUser, loading, fetchMore, refetch } = useAuthorizedUser({ first: 4 });

    if (loading) {
        return <View></View>;
    }

    const onEndReach = () => {
        fetchMore();
    };

    const reviews = authorizedUser.reviews.edges.map(edge => edge.node);

    return (
        <FlatList
          data={reviews}
          renderItem={({ item }) => <MyReview review={item} refetch={refetch} />}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={ItemSeparator}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
    );

};

export default MyReviews;