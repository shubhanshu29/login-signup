import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { getFriendRequest, INITIAL_STATE, renderFriendStatus } from './components';
import styles from './styles';
import { EvilIcons } from '@expo/vector-icons';


export const ReceivedFriendRequests = () => {
    const [state, setState] = useState(INITIAL_STATE);
    const globalParams = useSelector(state => state);

    useEffect(() => {
        getFriendRequest(globalParams.jwtToken, state, setState);
    }, []);

    useEffect(() => {
        setState({ ...state, toggle: false })
    }, [state.toggle]);

    renderItem = ({ item }) => {
        console.log(item);
        return (
            <View style={styles.container}>

                <EvilIcons name="user" size={60} color="black" style={styles.tinyLogo} />
                <View style={styles.component}>
                    <Text style={styles.title}>
                        {item.User.name}
                    </Text>
                    <Text style={styles.item}>
                        {item.User.loginid}
                    </Text>
                </View>
                <View>
                    {renderFriendStatus(item, state, setState, globalParams.jwtToken)}
                </View>
            </View>
        );
    };


    return (
        <View style={styles.bigScreen}>
            <FlatList
                data={state.DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}