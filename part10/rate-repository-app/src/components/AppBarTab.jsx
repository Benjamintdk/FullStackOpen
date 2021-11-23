import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
    container: {
      paddingLeft: 20
    }
  });

const AppBarTab = ({ to, tabName }) => {

    return (
        <Pressable style={styles.container}>
            <Link to={to}>
                <Text fontSize='heading' color='white'>{tabName}</Text>
            </Link>
        </Pressable>
    );
};

export default AppBarTab;
