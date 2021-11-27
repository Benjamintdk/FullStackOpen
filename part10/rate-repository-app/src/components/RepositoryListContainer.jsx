import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import TextInput from './TextInput';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    field: {
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        backgroundColor: '#D3D3D3'
    }
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

const SelectionMenu = ({ order, setOrder }) => {
    return (
        <Picker
            selectedValue={order}
            onValueChange={(itemValue) =>
                setOrder(itemValue)
            }>
            <Picker.Item label='Please select an option...' value={{ orderBy: "CREATED_AT", orderDirection: "ASC" }} />
            <Picker.Item label="Latest" value={{ orderBy: "CREATED_AT", orderDirection: "ASC" }} />
            <Picker.Item label="Highest rated" value={{ orderBy: "RATING_AVERAGE", orderDirection: "DESC" }} />
            <Picker.Item label="Lowest rated" value={{ orderBy: "RATING_AVERAGE", orderDirection: "ASC" }} />
        </Picker>
    );
};

const SearchBar = ({ text, setText }) => {
    return (
        <TextInput
            style={styles.field}
            onChangeText={value => setText(value)}
            value={text}
        />
    );
};


const RepositoryListHeader = ({ order, setOrder, text, setText }) => {
    return (
        <View>
            <SearchBar text={text} setText={setText} />
            <SelectionMenu order={order} setOrder={setOrder} />
        </View>
    );
};

class RepositoryListContainer extends React.Component {
    renderHeader = () => {
      // this.props contains the component's props
      const props = this.props;

      const { order, setOrder, text, setText } = props;
  
      return (
        <RepositoryListHeader 
            order={order} 
            setOrder={setOrder} 
            text={text} 
            settext={setText} 
        />
      );
    };
  
    render() {

      const { repositories, onEndReach } = this.props;

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
            ListHeaderComponent={this.renderHeader}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
      );
    }
}

export default RepositoryListContainer;