import React from "react";
import { StyleSheet, View } from "react-native";
import { format } from 'date-fns';
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
        padding: 15
    },
    mainText: {
        display: 'flex',
        marginLeft: 10,
        flexDirection: 'column'
    },
    rating: {
        width: 40,
        height: 40,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const ReviewItem = ({ review }) => {

    const date = format(new Date(review.createdAt.slice(0, 10)), 'MM-dd-yyyy');

    return (
        <View style={styles.main}>
            <View style={styles.rating}>
                <Text color="primary" fontSize='rating'>{review.rating}</Text>
            </View>
            <View style={styles.mainText}>
                <Text fontSize='heading' fontWeight='bold'>{review.user.username}</Text>
                <Text fontSize='subheading' color='textSecondary'>{date}</Text>
                <Text fontSize='subheading' flexWrap='wrap'>{review.text}</Text>
            </View>
        </View>
    );
};

export default ReviewItem;