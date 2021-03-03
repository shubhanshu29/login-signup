import React, { useState } from "react";
import { Text, View, TextInput, Button, Image } from 'react-native';
import styles from './style';
import createTweeets from './component';
import {useSelector } from 'react-redux';


const CreateTweets = ({ navigation }) => {
    const [state, changeState] = useState({ body: '', userid: '' });
    const globalParams= useSelector(state => state);

    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={{ uri: 'https://image.shutterstock.com/z/stock-photo-valencia-spain-march-twitter-logotype-printed-on-paper-twitter-is-an-online-social-601425683.jpg' }}
            />
            <Text>
                {'\n\n'}What's on your mind?{"\n\n"}
            </Text>

            <TextInput
                multiline={true}
                numberOfLines={10}
                style={styles.textbox}
                onChangeText={(text) => changeState({ ...state, body: text })}
                value={state.body}
            />
            <Text>{'\n'}</Text>
            <Button
                title='Post'
                onPress={() => createTweeets(navigation, state.body, globalParams.loginid)}
            />

        </View>
    );
}

export default CreateTweets;