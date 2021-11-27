import React, { useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import { useDebounce } from 'use-debounce';
import RepositoryListContainer from './RepositoryListContainer';


const RepositoryList = () => {

    const [ order, setOrder ] = useState({
        orderBy: "CREATED_AT",
        orderDirection: "ASC"
    });

    const [ text, setText ] = useState('');
    useDebounce(text, 500);

    const { repositories, fetchMore } = useRepositories({ ...order, searchKeyword:text, first: 8 });

    const onEndReach = () => {
        fetchMore();
    };

    return (
        <RepositoryListContainer 
            repositories={repositories} 
            order={order} 
            setOrder={setOrder} 
            text={text}
            setText={setText}   
            onEndReach={onEndReach}     
        />
    );
};

export default RepositoryList;