import React from "react";
import Text from "./Text";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    stats: {
        display: 'flex',
        flexDirection: 'row'
    },
    stat: {
        flexDirection: 'column',
        padding: 10
    }   
});

const Stats = ({ stars, forks, reviewCount, ratingAverage }) => {

    const formatData = num => {
        return (num / 1000).toFixed(1);
    };

    return (
        <View style={styles.stats}>
            <View style={styles.stat}>
                <Text fontWeight='bold'>{formatData(stars)}k</Text>
                <Text color="textSecondary">Stars</Text>
            </View>
            <View style={styles.stat}>
                <Text fontWeight='bold'>{formatData(forks)}k</Text>
                <Text color="textSecondary">Forks</Text>
            </View>
            <View style={styles.stat}>
                <Text fontWeight='bold'>{reviewCount}k</Text>
                <Text color="textSecondary">Reviews</Text>
            </View>
            <View style={styles.stat}>
                <Text fontWeight='bold'>{ratingAverage}k</Text>
                <Text color="textSecondary">Rating</Text>
            </View>
        </View>
    );
};

export default Stats;