import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, TextInput, FlatList, ActivityIndicator, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from '../../utils/config';
import styles from './style';

const AddFriends = () => {

    const [state, setState] = useState({ search: '', page: 1, DATA: [], availability: false, refreshing: false })
    const navigation = useNavigation();


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

    renderFriendStatus = ({item}) => {
        console.log(item);
        if(item.Relationships.length == 0){
            <Ionicons name= "person-add-outline" size={24} color="black" onPress={() => {}} />
        }
        else if(item.Relationships.status==0){
            <Ionicons name= "person-add-sharp" size={24} color="black" onPress={() => {}} />
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
                        {item.loginid}
                    </Text>
                </View>
                <View>
                    {renderFriendStatus({item})}
                </View>
                

            </View>
        );
    };


    return (
        <View style={styles.bigScreen}>
            <View style={styles.search}>
                <TextInput
                    title='Search'
                    style={{ display: 'flex', flex: 8, borderColor: 'black', borderWidth: 2, borderRadius: 1000, height: 30, width: 50 }}
                    value={state.search}
                    onChangeText={(text) => setState({ ...state, search: text })}
                    value={state.search}
                />
                <AntDesign name="search1" size={24} color="black" onPress={makeRequest = async () => {
                    try {
                        console.log('Request Sent');
                        const url = config.url;
                        const res = await fetch(url+'searchusers/', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                currentUserId: '2',
                                searchText: state.search,
                                page: state.page
                            })
                        })

                        let response = await res.json();
                        if (response.Success) {
                            if (response.data.length < 10) {
                                setState({ ...state, availability: false });
                            }
                            if (state.page == 1) {
                                setState({ ...state, DATA: response.data });
                            }
                            else {
                                setState({ ...state, DATA: [...state, ...response.data] });
                            }
                        }
                    }
                    catch (error) {
                        alert(error);
                    }
                }} />
            </View>
            <FlatList
                data={state.DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={renderSeparator}
                refreshing={state.refreshing}
                onRefresh={() => {
                    setState({ ...state, page: 1, refreshing: true });
                }}
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
        </View>

    );

}

export default AddFriends;