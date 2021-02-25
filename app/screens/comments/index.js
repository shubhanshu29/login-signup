import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, View, StyleSheet, Text, Image, ActivityIndicator, BackHandler, Alert, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import config from '../../utils/config';
import styles from './style';

const Comments = ({ navigation, route }) => {
    const [state, setState] = useState({ DATA: [], page: 1, refreshing: false, name: '', tweet: '', availability: false, comment: '' });

    renderHeader = () => {
        return (
            <View style={styles.container}>

                <Image
                    style={styles.tinyLogo}
                    source={{ uri: 'https://image.shutterstock.com/z/stock-photo-valencia-spain-march-twitter-logotype-printed-on-paper-twitter-is-an-online-social-601425683.jpg' }}
                />
                <View style={styles.component}>
                    <Text style={styles.title}>
                        {state.name}
                    </Text>
                    <Text style={styles.item}>
                        {state.tweet}
                    </Text>
                </View>

            </View>
        );
    };

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
                    <Text>No further comments!!</Text>
                </View>
            )
        }
    }

    useEffect(() => {
        makeRequest();
    }, [state.page]);

    const backAction = () => {
        Alert.alert("Title", "This will exit the app... Continue anyway??", [
            {
                text: "Cancel",
            },
            {
                text: "OK",
                onPress: () => navigation.goBack()
            }
        ]);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, []);

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

    const loadMore = () => {
        if (state.availability)
            setState(prevState => ({ ...state, page: prevState.page + 1 }))
    }

    makeRequest = async (prevState) => {
        const url = config.url;
        const result = await fetch(url + 'comments/getcomments/' + route.params.data + '/' + state.page);
        const res = await result.json();

        if (res.Comments.length == 0) {
            setState({ ...state, availability: false });
        }
        if (state.page == 1) {
            setState({ ...state, DATA: res.Comments, refreshing: false, name: res.name, tweet: res.tweet, comment: '' });
        }
        else {
            setState({ ...state, DATA: [...state.DATA, ...res.Comments], refreshing: false, name: res.name, tweet: res.tweet, comment: '' });
        }

    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>


                <View style={styles.component}>
                    <Text style={styles.title}>
                        {item.commentersName}
                    </Text>
                    <Text style={styles.item}>
                        {item.comment}
                    </Text>
                </View>
            </View>
        );
    };


    return (
        <View style={styles.screen}>
            <View style={styles.container}>
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

                    onEndReached={state.availability ? loadMore : null}
                    onEndReachedThreshold={0.5}
                    initialNumToRender={10}
                />

            </View>
            <View style={styles.addComment}>
                <TextInput
                    style={{ display: 'flex', flex: 5 }}
                    placeholder='Comment'
                    onChangeText={(text) => setState({ ...state, comment: text })}
                    value={state.comment}
                />
                <Button
                    title='Send'
                    onPress={async () => {
                        try {
                            const res = await fetch(url + 'comments/addcomments/', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    postId: route.params.data,
                                    commentersId: '4',
                                    commentText: state.comment
                                })
                            })

                            let response = await res.json();

                            if (response.Success) {
                                console.log('Done')
                                makeRequest();
                            }
                        }
                        catch (error) {
                            alert(error);
                        }
                    }}
                />
            </View>
        </View>
    );
};


export default Comments;