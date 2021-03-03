import React, { useEffect, useState } from "react";
import { Button, Text, View, TextInput, } from "react-native";
import styles from './style';
import { login, INITIAL_STATE, handleChange } from './component';
import { useSelector, useDispatch } from 'react-redux';


export default Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const globalParams = useSelector(state => state)
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    handleChange('email', globalParams.loginid, state, setState);
  }, [state.email.value])


  return (

    <View style={styles.container}>

      <Text style={{ fontSize: 40, color: "white" }}>Welcome back!</Text>
      <Text style={{ fontSize: 15, color: "grey" }}>Login with your email to start talking{"\n\n\n"}</Text>

      <View style={styles.form}>
        <Text style={{ color: "white" }}>Welcome, {globalParams.name} {"\n"} </Text>
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
      <Text style={{ fontSize: 15, color: "skyblue" }}>{"\n"}Forgot Password?</Text>
      <Text style={{ fontSize: 15, color: "skyblue" }}>Use a Password manager?</Text>
      <Text>{"\n"}</Text>

      <Button
        onPress={() => login(navigation, state.email.value, state.password.value, dispatch, state, setState)}
        title="Login"
      />
    </View>
  );

}

