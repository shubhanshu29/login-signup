import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, View, Text, Image, BackHandler, Alert, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import styles from './style';
import { renderHeader, renderFooter, renderSeparator, makeRequest, toggleLike, INITIAL_STATE } from './component';
import renderExpressions from './component';
import { useSelector, useDispatch } from 'react-redux';
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";


const Welcome = (props) => {
    const loginParams = useSelector(state => state);
    const [state, setState] = useState(INITIAL_STATE);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const WalkthroughableText = walkthroughable(TouchableOpacity);

    useEffect(() => {
        props.copilotEvents.on('stepChange', () => { });
        props.start();

        const backAction = () => {
            Alert.alert("Logout !", "This will log you out.. COntinue anyway?", [
                {
                    text: "Cancel",
                    onPress: () => null
                },
                {
                    text: "YES",
                    onPress: () => navigation.goBack()
                }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

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
                    {/* <renderExpressions item={item} loginParams={loginParams} state={state} setState={setState}/> */}
                    <View style={styles.popularity}>
                        <FontAwesome name={item.myLikeType === "heart" ? "heart" : 'heart-o'} size={24} color="black" style={styles.likeIcon} onPress={() => {
                            if (item.myLikeType === "unliked") {
                                item.myLikeType = "heart";
                                item.likeCountObj.heart++;
                                item.selfLike = true;
                            }
                            else if (item.myLikeType != "heart") {
                                alert('You cannot have more than one reaction to a post.');
                                return;
                            }
                            else {
                                item.likeCountObj.heart--;
                                item.myLikeType = "unliked";
                                item.selfLike = false;
                            }
                            toggleLike(loginParams.jwtToken, item.id, item.myLikeType);
                            setState({ ...state, toggle: true });
                        }} />
                        <Text>x{item.likeCountObj.heart}</Text>


                        <FontAwesome name={item.myLikeType === "thumbsup" ? "thumbs-up" : "thumbs-o-up"} size={24} color="black" style={styles.likeIcon} onPress={() => {

                            if (item.myLikeType === "unliked") {
                                item.myLikeType = "thumbsup";
                                item.likeCountObj.thumbsup++;
                                item.selfLike = true;
                            }
                            else if (item.myLikeType != "thumbsup") {
                                alert('You cannot have more than one reaction to a post.');
                                return;
                            }
                            else {
                                item.likeCountObj.thumbsup--;
                                item.myLikeType = "unliked";
                                item.selfLike = false;
                            }
                            toggleLike(loginParams.jwtToken, item.id, item.myLikeType);
                            setState({ ...state, toggle: true });
                        }} />
                        <Text>x{item.likeCountObj.thumbsup}</Text>


                        <Ionicons name={item.myLikeType === "celebrate" ? "happy-sharp" : "sad-outline"} size={24} color="black" style={styles.likeIcon} onPress={() => {
                            if (item.myLikeType === "unliked") {
                                item.myLikeType = "celebrate";
                                item.likeCountObj.celebrate++;
                                item.selfLike = true;
                            }
                            else if (item.myLikeType != "celebrate") {
                                alert('You cannot have more than one reaction to a post.');
                                return;
                            }
                            else {
                                item.likeCountObj.celebrate--;
                                item.myLikeType = "unliked";
                                item.selfLike = false;
                            }
                            toggleLike(loginParams.jwtToken, item.id, item.myLikeType);
                            setState({ ...state, toggle: true });
                        }} />
                        <Text>x{item.likeCountObj.celebrate}</Text>


                        <Ionicons name={item.myLikeType === "bulb" ? "bulb-sharp" : "bulb-outline"} size={24} color="black" style={styles.likeIcon} onPress={() => {
                            if (item.myLikeType === "unliked") {
                                item.myLikeType = "bulb";
                                item.likeCountObj.bulb++;
                                item.selfLike = true;
                            }
                            else if (item.myLikeType != "bulb") {
                                alert('You cannot have more than one reaction to a post.');
                                return;
                            }
                            else {
                                item.likeCountObj.bulb--;
                                item.myLikeType = "unliked";
                                item.selfLike = false;
                            }
                            toggleLike(loginParams.jwtToken, item.id,  item.myLikeType);
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
            <View style={{ flex: 8 }}>
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

            </View>
            <View style={{ ...styles.icons }}>
                <CopilotStep
                    order={1}
                    name="Add tweet "
                    text="Add tweet"
                >
                    <WalkthroughableText>
                        <Ionicons name="add-circle" size={40} color="black" style={styles.addButton} onPress={() => {
                            navigation.navigate('CreateTweets');
                        }} />
                    </WalkthroughableText>
                </CopilotStep>
                <CopilotStep
                    order={2}
                    name="Add friend"
                    text="Add friends from here"
                >
                    <WalkthroughableText>
                        <Ionicons name="person-add" size={40} color="black" style={styles.addFriend} onPress={() => {
                            navigation.navigate('AddFriends');
                        }} />
                    </WalkthroughableText>
                </CopilotStep>
                <CopilotStep
                    order={3}
                    name="Profile"
                    text="Update Profile"
                >
                    <WalkthroughableText>
                        <Ionicons name="person" size={40} color="black" style={styles.profile} onPress={() => {
                            navigation.navigate('Profile');
                        }} />
                    </WalkthroughableText>
                </CopilotStep>

            </View>
        </View>
    );
};

export default copilot()(Welcome);