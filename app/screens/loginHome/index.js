import React, { useEffect, useState } from "react";
import { Button, Text, View, TextInput, Image } from "react-native";
import styles from './style';
import { loginVerify, INITIAL_STATE, handleChange } from './component';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

export default LoginHome = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [state, setState] = useState(INITIAL_STATE);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={{ width: 600, height: 200 }}
      />
      <Text style={{ fontSize: 15, color: "grey" }}>Please enter your email ID:{"\n\n\n"}</Text>
      <View style={styles.form}>
        {
          Object.keys(state).map((key) => {
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

                    //changes the state of variables and re-renders
                    onChangeText={(text) => { handleChange(key, text, state, setState) }} 
                    value={inputObj.value}
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
      <Text>{"\n"}</Text>

      <Button
        //dispatches the email id to the reducer and navigate accordingly if the email id is registered or not.
        onPress={async () => await loginVerify(navigation, state.email.value, dispatch, setState)}
        title="Continue"
      />
    </View>
  );

}
