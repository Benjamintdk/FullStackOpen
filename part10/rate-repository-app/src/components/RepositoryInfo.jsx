import React from "react";
import { View, Image, Pressable, Linking, StyleSheet } from 'react-native';
import Text from "./Text";
import Stats from "./Stats";
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
    image: {
        marginTop: 20
    },
    language: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-start'
    },
    linkToGithub: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5
    }
});

const RepositoryInfo = ({ repository, id }) => {

    return (
        <View style={styles.main}>
            <View style={styles.image}>
                <Image style={{width: 50, height: 50}} source={{uri: repository.ownerAvatarUrl}}/>
            </View>
            <View style={styles.mainText}>
                <View>
                    <Text testID='full-name' fontSize='heading' fontWeight='bold'>{repository.fullName}</Text>
                </View>
                <View>
                    <Text testID='description' fontSize='subheading' flexWrap='wrap'>{repository.description}</Text>
                </View>
                <View style={styles.language}>
                    <Text 
                        testID='language'
                        color='white'
                        backgroundColor='primary'
                        fontSize='subheading' 
                        fontWeight='bold'>
                            {repository.language}
                    </Text>
                </View>
                <Stats 
                    stars={repository.stargazersCount} 
                    forks={repository.forksCount}
                    reviewCount={repository.reviewCount}
                    ratingAverage={repository.ratingAverage}
                />
                {id ? <Pressable onPress={() => Linking.openURL(repository.url)} style={styles.linkToGithub}>
                    <Text                
                        fontSize='heading' 
                        color='white' 
                        backgroundColor='primary'>
                            Open in Github
                    </Text>
                </Pressable>: null}
            </View>
        </View>
    );
};

export default RepositoryInfo;