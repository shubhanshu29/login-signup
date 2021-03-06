import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, View, Text, BackHandler, Alert, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import config from '../../utils/config';
import styles from './style';
import { addcomment, toggleLike, renderSeparator, renderFooter, renderHeader } from './component';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

const Comments = ({ navigation, route }) => {
    const [state, setState] = useState({ DATA: [], page: 1, refreshing: false, name: '', tweet: '', toggle: false, availability: true, comment: '' });
    const globalParams = useSelector(state => state);

    useEffect(() => {
        makeRequest();
    }, [state.page]);

    useEffect(() => {
        setState({ ...state, toggle: false })
    }, [state.toggle]);

    const loadMore = () => {
        if (state.availability)
            setState(prevState => ({ ...state, page: prevState.page + 1 }))
    }

    makeRequest = async () => {
        const url = config.url;
        const result = await fetch(url + 'comments/getcomments', {
            headers: {
                'x-access-token': globalParams.jwtToken,
                'pageNo' : state.page,
                'postId': route.params.data,
                'userId':  globalParams.userId,
            }
        });
        const res = await result.json();
        if (res.success) {
            if (state.page == 1) {
                setState({ ...state, DATA: res.data.Comments, refreshing: false, name: res.data.name, tweet: res.data.tweet, comment: '' });
            }
            else {
                setState({ ...state, DATA: [...state.DATA, ...res.data.Comments], refreshing: false, name: res.data.name, tweet: res.data.tweet, comment: '' });
            }
            if (res.data.Comments.length == 0) {
                setState({ ...state, availability: false, name: res.data.name, tweet: res.data.tweet });
            }
        }
        else{
            alert(res.error);
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
                    <FontAwesome name={item.myLikeType === "heart" ? "heart" : 'heart-o'} size={24} color="black" onPress={() => {
                        if (item.myLikeType === "heart") {
                            item.myLikeType = "unliked";
                        }
                        else {
                            item.myLikeType = "heart";
                        }
                        toggleLike(item.id, globalParams.jwtToken, item.myLikeType);
                        setState({ ...state, toggle: true });
                    }} />
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
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={renderSeparator}
                    refreshing={state.refreshing}
                    onRefresh={() => {
                        setState({ ...state, page: 1, refreshing: true });
                    }}
                    ListHeaderComponent={renderHeader(state.name, state.tweet)}
                    ListFooterComponent={renderFooter(state.availability)}

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
                    onPress={() => addcomment(route.params.data, state.comment, globalParams.jwtToken, makeRequest)}
                />
            </View>
        </View>
    );
};


export default Comments;