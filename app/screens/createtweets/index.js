import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, Image } from 'react-native';
import config from '../../utils/config';
import styles from './style';

const CreateTweets = ({ navigation }) => {
    const [state, changeState] = useState({ body: '', userid: '' });

    return (
        <View style={styles.container}>
            <Image
                style={{
                    alignSelf: 'center',
                    width: 100,
                    height: 100,
                    borderRadius: 60
                }}
                source={{ uri: 'https://image.shutterstock.com/z/stock-photo-valencia-spain-march-twitter-logotype-printed-on-paper-twitter-is-an-online-social-601425683.jpg' }}
            />
            <Text>
                {'\n\n'}What's on your mind?{"\n\n"}
            </Text>

            <TextInput
                multiline={true}
                numberOfLines={10}
                style={{
                    justifyContent: "center",
                    alignItems: "stretch",
                    height: 100,
                    borderRadius: 1000,
                    borderWidth: 1,
                    borderColor: "black",

                }}
                onChangeText={(text) => changeState({ ...state, body: text })}
                value={state.body}
            />
            <Text>{'\n'}</Text>
            <Button
                title='Post'
                onPress={async () => {
                    try {
                        const url = config.url;
                        const res = await fetch(url + 'addtweet/', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                tweetText: state.body,
                                loginid: 'Asdf@asdf.com',
                                type: '1'
                            })
                        })

                        let response = await res.json();
                        if (response.Success) {
                            navigation.goBack();
                        }
                        else {
                            alert(response.data);
                        }
                    }
                    catch (error) {
                        alert(error);
                    }
                }}
            />

        </View>
    );
}

export default CreateTweets;