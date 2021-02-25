import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, View, StyleSheet, Text, Image, ActivityIndicator } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import  config  from '../../utils/config';
import styles from './style';

const Welcome = () => {
    
    const [state, setState] = useState({ DATA: [], page: 1, refreshing: false, availability: true });
    const navigation= useNavigation();

    renderHeader = () => {
        return (
            <View style={{ alignItems: "center" }}>
                <Text>Header here</Text>
            </View>
        );
    };

    const url = config.url;

    renderFooter = () => {
        if (state.availability) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <ActivityIndicator color='grey' />
                </View>
            )
        }
        else {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Text>List ended here!!</Text>
                </View>
            )
        }
    }

    useEffect(() => {
        makeRequest();
    }, [state.page]);

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "10%",
                    marginRight: "10%"
                }}
            />
        );
    };

    makeRequest = async (prevState) => {

        const result = await fetch(url + 'gettweets/1/' + state.page);
        const res = await result.json();

        if (state.page == 1) {
            setState({ ...state, DATA: res, refreshing: false });
        }
        else {
            setState({ ...state, DATA: [...state.DATA, ...res], refreshing: false });
        }
        if (res.length === 0) {
            setState({ ...state, availability: false });
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>

                <Image
                    style={styles.tinyLogo}
                    source={{ uri: 'https://image.shutterstock.com/z/stock-photo-valencia-spain-march-twitter-logotype-printed-on-paper-twitter-is-an-online-social-601425683.jpg' }}
                />
                <View style={styles.component}>
                    <Text style={styles.title}>
                        {item.name}
                    </Text>
                    <Text style={styles.item}>
                        {item.tweet}
                    </Text>
                </View>
                <FontAwesome name="comments" size={24} color="black" onPress={() => {
                    navigation.navigate('Comments', {
                        data: item.id
                    });
                }} />


            </View>
        );
    };


    return (
        <View style={styles.bigScreen}>
            <FlatList
                data={state.DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={renderSeparator}
                refreshing={state.refreshing}
                onRefresh={() => {
                    setState({ ...state, page: 1, refreshing: true });
                }}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}

                onEndReached={() => {
                    if (!state.availability) {
                        return null;
                    }
                    setState({ ...state, page: state.page + 1 });
                }}
                onEndReachedThreshold={0.5}
                initialNumToRender={10}
            />
            <View style={styles.icons}>
                <Ionicons name="add-circle" size={40} color="black" style={styles.addButton} onPress= {()=> {
                    navigation.navigate('CreateTweets');
                }}/>

                <Ionicons name="person-add" size={40} color="black" style={styles.addFriend} onPress= {()=> {
                    navigation.navigate('AddFriends');
                }}/>
                <Ionicons name="person" size={40} color="black" style={styles.profile} onPress={() => {
                    navigation.navigate('Profile');
                }}/>
            </View>
        </View>
    );
};

export default Welcome;