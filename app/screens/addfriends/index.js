import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { View, TextInput, FlatList, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from '../../utils/config';
import styles from './style';
// import renderFriendStatus from './component';
// import renderItem from './component';
import { useSelector } from 'react-redux';
import { sendFriendRequest } from './component';

const AddFriends = () => {
    const [state, setState] = useState({ search: '', DATA: [], requestStatus : false })
    const loginParams = useSelector(state => state);
    const navigation = useNavigation();

    useEffect(() => {
        setState({...state, requestStatus: false})
    }, [state.requestStatus]);

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
                    {renderFriendStatus(item)}
                </View>


            </View>
        );
    };


    renderFriendStatus = (item) => {
        return (
            <View>
                {
                    item.friendshipStatus === 'unknown' &&
                    <Ionicons name="person-add-outline" size={24} color="black" onPress={() => {
                        sendFriendRequest(loginParams.userId, item.id)
                        item.id = 'pending'
                        setState({ ...state, requestStatus: true })
                    }} />
                }
                {
                    item.friendshipStatus === 'accepted' &&
                    < Ionicons name="person-add-sharp" size={24} color="black" onPress={() => { alert('You are friends with this person') }} />
                }
                {
                    item.friendshipStatus === 'pending' &&
                    <Text onPress={() => { alert('Friend request already sent') }}>...</Text>
                }

            </View>
        )
    }
    const makeRequest = async () => {
        try {
            const url = config.url;
            const res = await fetch(url + 'user/searchusers/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentUserId: loginParams.userId,
                    searchText: state.search,
                })
            })

            let response = await res.json();
            console.log(response);
            if (response.success) {
                setState({ ...state, DATA: response.data });
            }
            else {
                alert(response.err);
            }
        }
        catch (err) {
            alert(err);
        }
    }

    return (
        <View style={styles.bigScreen}>
            <View style={styles.search}>
                <TextInput
                    placeholder='Type loginid here...'
                    style={styles.searchbox}
                    value={state.search}
                    onChangeText={(text) => setState({ ...state, search: text })}
                    value={state.search}
                />
                <AntDesign name="search1" size={24} color="black" onPress={() => makeRequest()} />
            </View>
            <FlatList
                data={state.DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

export default AddFriends;