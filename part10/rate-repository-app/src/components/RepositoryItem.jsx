import React from 'react';
import { Pressable } from 'react-native';
import { useHistory } from 'react-router-native';
import RepositoryInfo from './RepositoryInfo';


const RepositoryItem = ({ item }) => {

    const history = useHistory();

    return (
        <Pressable onPress={() => history.push(`/${item.id}`)}>
            <RepositoryInfo repository={item} />
        </Pressable>
    );
};

export default RepositoryItem;