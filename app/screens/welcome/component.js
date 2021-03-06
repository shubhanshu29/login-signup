import styles from './style';
import React from 'react';
import { View, Text, Image, ActivityIndicator } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { likeTweet, unlikeTweet, getTweetsAPI } from '../../api/tweet';
import { TweetsSkeleton } from "./skeleton";
import { Ionicons } from '@expo/vector-icons';

export const INITIAL_STATE = {
    DATA: [],
    page: 1,
    refreshing: true,
    availability: true,
    toggle: false,
    likes: {
        heart: {
            selectedName: "heart",
            unSelectedName: "heart-o",
            count: 0,
        }
    }
}

const loadTweets = async (tweets, dispatch) => {
    await dispatch({
        type: 'GET_TWEETS',
        payload: {
            tweets: tweets,
        }
    })
}

export const makeRequest = async (state, setState, dispatch, loginParams) => {
    const response = await getTweetsAPI(state.page, loginParams);
    if (response.success) {
        if (state.page == 1) {
            await loadTweets(response.data, dispatch);
            setState({ ...state, DATA: response.data, refreshing: false });
        }
        else {
            setState({ ...state, DATA: [...state.DATA, ...response.data], refreshing: false });
        }
        if (response.data.length === 0) {
            setState({ ...state, refreshing: false, availability: false });
        }
    }
    else {
        alert(response.err);
        return;
    }
}

export const renderHeader = () => {
    return (
        <View style={{ alignItems: "center" }}>
            <Text>Header here</Text>
        </View>
    );
};

export const renderSeparator = () => {
    return (
        <View
            style={styles.seperator}
        />
    );
};

export const renderItem = ({ item }) => {
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


export const renderFooter = (availability) => {
    if (availability) {
        return (
            <View>
                <View><TweetsSkeleton /><TweetsSkeleton /><TweetsSkeleton /><TweetsSkeleton /><TweetsSkeleton /><TweetsSkeleton /><TweetsSkeleton /><TweetsSkeleton /><TweetsSkeleton /><TweetsSkeleton /></View>
                <View style={{ alignItems: 'center' }}>

                    <ActivityIndicator color='grey' />
                </View>
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

export const toggleLike = async (jwtToken, tweetId, likeStatus) => {

    if (likeStatus === "unliked") {
        const response = unlikeTweet(jwtToken, tweetId);
    }
    else {
        const response = likeTweet(jwtToken, tweetId, likeStatus);
    }

}

// export default renderExpressions = (item, loginParams, state, setState) => {
//     return (
        
//     )
// }