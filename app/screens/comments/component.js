import React from 'react';
import { addCommentAPI, likeComment, unlikeComment } from '../../api/comment';
import { View, Text, Image, ActivityIndicator } from "react-native";
import styles from './style';

export const addcomment = async (postid, comment, jwtToken, makeRequest) => {
    const response = await addCommentAPI(postid, comment, jwtToken);
    if (response.success) {
        makeRequest();
    }
}

export const renderSeparator = () => {
    return (
        <View
            style={styles.seperator}
        />
    );
};

export const toggleLike = async (commentId, jwtToken, likeStatus) => {
    if (likeStatus === "unliked") {
        const response = await unlikeComment(commentId, jwtToken);
        console.log("Unlike status: ", response);
    }
    else {
        const response = await likeComment(commentId, jwtToken, likeStatus);
        console.log("Like Sttatus: ", response);
    }
}

export const renderFooter = (availability) => {
    if (availability) {
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

export const renderHeader = (name, tweet) => {
    return (
        <View style={{ ...styles.container, height: 150 }}>

            <Image
                style={styles.tinyLogo}
                source={{ uri: 'https://image.shutterstock.com/z/stock-photo-valencia-spain-march-twitter-logotype-printed-on-paper-twitter-is-an-online-social-601425683.jpg' }}
            />
            <View style={styles.component}>
                <Text style={styles.title}>
                    {name}
                </Text>
                <Text style={styles.item}>
                    {tweet}
                </Text>
            </View>

        </View>
    );
};