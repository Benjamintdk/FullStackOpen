import React from "react";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import Text from './Text';
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    buttons: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteButton: {
        backgroundColor: 'red',
        margin: 10
    },
    viewRepoButton: {
        backgroundColor: theme.colors.primary,
        margin: 10
    }
});

const MyReview = ({ review, refetch }) => {

    history = useHistory();
    const [ deleteReview ] = useMutation(DELETE_REVIEW);

    const handleDelete = async (id) => {
        try {
            const response = await deleteReview({ variables: { id } });
            if (response.data.deleteReview) {
                refetch();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const onDelete = async (id) => {

        Alert.alert( 
            "Delete Review",
            "Are you sure you want to delete this review?",[
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => handleDelete(id)
                }
            ]);
    };

    return (
        <View>
            <ReviewItem review={review}/>
            <View style={styles.buttons}>
                <Pressable style={styles.viewRepoButton} onPress={() => history.push(`/${review.repositoryId}`)}>
                    <Text fontSize='heading' color='white'>View Repository</Text>
                </Pressable>
                <Pressable style={styles.deleteButton} onPress={() => onDelete(review.id)}>
                    <Text fontSize='heading' color='white'>Delete review</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default MyReview;