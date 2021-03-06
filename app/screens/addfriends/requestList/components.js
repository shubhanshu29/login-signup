import { AddFriendsAPI, getAllFriendRequestsAPI } from "../../../api/friends";
import React from 'react';
import config from '../../../utils/config';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const INITIAL_STATE = {
    DATA: [],
    toggle: false,
    refreshing: true,
    requestStatus: false,
}

export const getFriendRequest = async (jwtToken, state, setState) => {
    const response= await getAllFriendRequestsAPI(jwtToken);
    if(response.success){
        setState({ ...state, DATA: response.data, refreshing: false });
    }
    else{
        alert(response.err);
    }
}

const sendFriendRequest = (jwtToken, friendUserId, status) => {
    AddFriendsAPI(jwtToken, friendUserId, status);
}

export const renderFriendStatus = (item, state, setState, jwtToken) => {
    return (
        <View>
            {
                item.status === 'pending' &&
                <Ionicons name="person-add-outline" size={24} color="black" onPress={() => {
                    sendFriendRequest(jwtToken, item.userOneId, 'accepted')
                    item.status = 'accepted'
                    setState({ ...state, requestStatus: true })
                }} />
            }
            {
                item.status === 'accepted' &&
                < Ionicons name="person-add-sharp" size={24} color="black" onPress={() => { alert('You are friends with this person') }} />
            }

        </View>
    )
}
