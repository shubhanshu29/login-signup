import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, View, Text, Image, BackHandler , Alert} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import styles from './style';
import { renderHeader, renderFooter, renderSeparator, toggleLike, makeRequest } from './component';
import { useSelector, useDispatch } from 'react-redux';


const Welcome = () => {
    const reactions = ['heart', 'thumbsup', 'celebrate', 'bulb'];
    const loginParams = useSelector(state => state);
    const [state, setState] = useState({ DATA: [], page: 1, refreshing: false, availability: true, toggle: false });
    const navigation = useNavigation();
    const dispatch = useDispatch();


    const backAction = () => {
        Alert.alert("Log out", "This will log you out... Continue anyway??", [
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
                    <View style={styles.popularity}>
                        <FontAwesome name={item.myLikeType==1 ? "heart" : 'heart-o'} size={24} color="black" style={styles.likeIcon} onPress={() => {
                            if(item.myLikeType==-1){
                                item.myLikeType = 1;
                                item.likeCountObj.heart++;
                                item.selfLike = true;
                            }
                            else if(item.myLikeType!=1){
                                alert('You cannot have more than one reaction to a post.');
                                return;
                            }
                            else{
                                item.likeCountObj.heart--;
                                item.myLikeType = -1;
                                item.selfLike = false;
                            }
                            toggleLike(item.id, loginParams.userId, item.myLikeType);
                            setState({ ...state, toggle: true });
                        }} />
                        <Text>x{item.likeCountObj.heart}</Text>


                        <FontAwesome name={item.myLikeType==0 ? "thumbs-up" : "thumbs-o-up"} size={24} color="black" style={styles.likeIcon} onPress={() => {
                            
                            if(item.myLikeType==-1){
                                item.myLikeType = 0;
                                item.likeCountObj.thumbsup++;
                                item.selfLike = true;
                            }
                            else if(item.myLikeType!=0){
                                alert('You cannot have more than one reaction to a post.');
                                return; 
                            }
                            else{
                                item.likeCountObj.thumbsup--;
                                item.myLikeType = -1;
                                item.selfLike = false;
                            }
                            toggleLike(item.id, loginParams.userId, item.myLikeType);
                            setState({ ...state, toggle: true });
                        }} />
                        <Text>x{item.likeCountObj.thumbsup}</Text>


                        <Ionicons name={item.myLikeType==2 ? "happy-sharp" : "sad-outline"} size={24} color="black" style={styles.likeIcon} onPress={() => {
                            if(item.myLikeType==-1){
                                item.myLikeType = 2;
                                item.likeCountObj.celebrate++;
                                item.selfLike = true;
                            }
                            else if(item.myLikeType!=2){
                                alert('You cannot have more than one reaction to a post.');
                                return;
                            }
                            else{
                                item.likeCountObj.celebrate--;
                                item.myLikeType = -1;
                                item.selfLike = false;
                            }
                            toggleLike(item.id, loginParams.userId, item.myLikeType);
                            setState({ ...state, toggle: true });
                        }} />
                        <Text>x{item.likeCountObj.celebrate}</Text>


                        <Ionicons name={item.myLikeType==3 ? "bulb-sharp" : "bulb-outline"} size={24} color="black" style={styles.likeIcon} onPress={() => {
                            if(item.myLikeType==-1){
                                item.myLikeType = 3;
                                item.likeCountObj.bulb++;
                                item.selfLike = true;
                            }
                            else if(item.myLikeType!=3){
                                alert('You cannot have more than one reaction to a post.');
                                return;
                            }
                            else{
                                item.likeCountObj.bulb--;
                                item.myLikeType = -1;
                                item.selfLike = false;
                            }
                            toggleLike(item.id, loginParams.userId, item.myLikeType);
                            setState({ ...state, toggle: true });
                        }} />
                        <Text>x{item.likeCountObj.bulb}</Text>
                    </View>
                </View>



                <Text>{"        "}</Text>
                <FontAwesome name="comments" size={24} color="black" onPress={() => {
                    navigation.navigate('Comments', {
                        data: item.id
                    });
                }} />

            </View>
        );
    };

    useEffect(() => {
        makeRequest(state, setState, dispatch, loginParams);
    }, [state.page]);

    useEffect(() => {
        setState({ ...state, toggle: false });
    }, [state.toggle]);


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
                    if (state.page == 1) {
                        setState({ ...state, refreshing: false });
                    }
                }}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter(state.availability)}

                onEndReached={() => {
                    if (!state.availability) {
                        return null;
                    }
                    else {
                        setState({ ...state, page: state.page + 1 });
                    }
                }}
                onEndReachedThreshold={0.5}
                initialNumToRender={10}
            />
            <View style={styles.icons}>
                <Ionicons name="add-circle" size={40} color="black" style={styles.addButton} onPress={() => {
                    navigation.navigate('CreateTweets');
                }} />

                <Ionicons name="person-add" size={40} color="black" style={styles.addFriend} onPress={() => {
                    navigation.navigate('AddFriends');
                }} />
                <Ionicons name="person" size={40} color="black" style={styles.profile} onPress={() => {
                    navigation.navigate('Profile');
                }} />
            </View>
        </View>
    );
};

export default Welcome;