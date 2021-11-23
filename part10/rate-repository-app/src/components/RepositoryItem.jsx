import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Stats from './Stats';
import Text from './Text';

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15
    },
    mainText: {
        display: 'flex',
        marginLeft: 10,
        flexDirection: 'column'
    },
    image: {
        marginTop: 20
    },
    language: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-start'
    }
});

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.main}>
            <View style={styles.image}>
                <Image style={{width: 50, height: 50}} source={{uri: item.ownerAvatarUrl}}/>
            </View>
            <View style={styles.mainText}>
                <View>
                    <Text fontSize='heading' fontWeight='bold'>{item.fullName}</Text>
                </View>
                <View>
                    <Text fontSize='subheading' flexWrap='wrap'>{item.description}</Text>
                </View>
                <View style={styles.language}>
                    <Text 
                        color='white'
                        backgroundColor='primary'
                        fontSize='subheading' 
                        fontWeight='bold'>
                            {item.language}
                    </Text>
                </View>
                <Stats 
                    stars={item.stargazersCount} 
                    forks={item.forksCount}
                    reviewCount={item.reviewCount}
                    ratingAverage={item.ratingAverage}
                />
            </View>
        </View>
    );
};

export default RepositoryItem;