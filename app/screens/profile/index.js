import React, { useState, useEffect } from "react";
import { Button, Text, View, TextInput } from "react-native";
import styles from './style';
import { useSelector , useDispatch} from 'react-redux';
import { INITIAL_STATE, handleChange , updateProfile} from './component';

const Profile = () => {
    const globalParams = useSelector(state => state);
    const [state, setState] = useState(INITIAL_STATE);
    const dispatch = useDispatch();

    useEffect(() => {
        handleChange('email', globalParams.loginid, state, setState);
    }, [state.email.value])

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, color: "white" }}>Profile!{"\n"}</Text>
            <View style={styles.form}>
                {
                    Object.keys(INITIAL_STATE).map((key) => {
                        const inputObj = state[key];
                        return (
                            <View key={inputObj.key}>
                                <View>
                                    <TextInput
                                        style={{ height: 60, width: 320 }}
                                        placeholder={inputObj.placeholder}
                                        placeholderTextColor="grey"
                                        backgroundColor="black"
                                        color="white"
                                        onChangeText={(text) => handleChange(key, text, state, setState)}
                                        value={inputObj.value}
                                        editable={inputObj.editable}
                                    />
                                </View>

                                <Text>
                                    {inputObj.err}
                                </Text>

                            </View>
                        )
                    })
                }
            </View>
            <Button
                onPress={() => updateProfile(state.name.value, state.email.value, state.password.value, state.oldPassword.value, state.rePassword.value, dispatch)}
                title="Reset"
            />


        </View>
    );

}

export default Profile;