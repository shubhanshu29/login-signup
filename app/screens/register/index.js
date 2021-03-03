import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, ScrollView, View } from "react-native";
import styles from './style';
import { register, INITIAL_STATE, handleChange } from './component';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native";


export default Register = () => {
  const navigation = useNavigation();
  const globalParams = useSelector(state => state)
  const dispatch = useDispatch()
  const [state, setState ] = useState(INITIAL_STATE);

  useEffect(() => {
    handleChange('email', globalParams.loginid, state, setState);
  }, [state.email.value])

  return (
    <ScrollView style={styles.container}>
      <Text style={{ color: "white", fontSize: 45, textAlign: "center" }}>{"\n"}Register{"\n"}</Text>
      <Text style={{ color: "white" }}>Account Information{"\n"}</Text>
      <View style={styles.form}>
        {
          Object.keys(INITIAL_STATE).map((key) => {
            const inputObj = state[key]
            return (
              <View key={inputObj.key}>
                <View style={styles.inputView} >
                  <TextInput
                    key={inputObj.key}
                    placeholder={inputObj.placeholder}
                    style={{ height: 60, width: 320 }}
                    backgroundColor="black"
                    color="white"
                    placeholderTextColor="gray"
                    onChangeText={(text) => handleChange(key, text, state, setState)}
                    value={inputObj.value}
                    editable={inputObj.editable}
                    secureTextEntry={inputObj.secureTextEntry}
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
        onPress={() => register(state.name.value, state.email.value, state.password.value, state.repassword.value,  dispatch, navigation)}
        title="Create an account"
      />
      <Text>{"\n"}</Text>

    </ScrollView>
  )
}
