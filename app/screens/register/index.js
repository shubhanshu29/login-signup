import React, { Component } from "react";
import { Button, Text, TextInput, StyleSheet, ScrollView, View, Objects } from "react-native";
import { useNavigation } from '@react-navigation/native';
import config from '../../utils/config';
import styles from './style';


class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        placeholder: 'Name',
        key: '0',
        editable: true
      },
      email: {
        value: this.props.route.params.data,
        placeholder: 'Email',
        key: '1',
        editable: false
      },
      password: {
        value: '',
        placeholder: 'Password',
        key: '2',
        editable: true
      },
      repassword: {
        value: '',
        placeholder: 'Re- Password',
        key: '3',
        editable: true
      }
    }
    var type = null;
  }

  handleChange(key, text) {
    this.setState({
      [key]: { ...this.state[key], value: text }
    })
  }


  render() {
    const url = config.url;
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.container}>
        <Text style={{ color: "white", fontSize: 45, textAlign: "center" }}>{"\n"}Register{"\n"}</Text>
        <Text style={{ color: "white" }}>Account Information{"\n"}</Text>

        <View style={styles.form}>
          {
            Object.keys(this.state).map((key) => {
              const inputObj = this.state[key]
              return (
                <View key={inputObj.key}>
                  <View style={styles.inputView} >
                    <TextInput
                      placeholder={inputObj.placeholder}
                      style={{ height: 60, width: 320 }}
                      backgroundColor="black"
                      color="white"
                      placeholderTextColor="gray"
                      onChangeText={(text) => this.handleChange(key, text)}
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
        <Text>{"\n"}</Text>
        <Button
          onPress={async () => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var passw = /^[A-Za-z]\w{7,14}$/;
            const nu = /^[6-9]\d{9}$/;

            if (re.test(String(this.state.email.value).toLowerCase())) {
              type = 1;
            }
            else if (nu.test(String(this.state.email.value).toLowerCase())) {
              type = 0;
            }
            else {
              alert("Please enter valid phone number or Email");
              return false;
            }

            if (!passw.test(this.state.password.value)) {
              alert("Invalid Password");
              return false;
            }

            if (this.state.password.value != this.state.repassword.value) {
              alert("Passwords doesn't match");
              return false;
            }

            try {
              const res = await fetch(url + 'signup/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: this.state.name.value,
                  loginid: this.state.email.value,
                  password: this.state.password.value,
                  repassword: this.state.repassword.value,
                  type: type
                })
              })

              let response = await res.json();
              if (response.Success) {
                navigation.navigate('Login', {
                  data: response.data
                });
              }
              else {
                alert(response.data);
              }
            }
            catch (error) {
              alert(error);
            }
          }}
          title="Create an account"
        />
        <Text>{"\n"}</Text>

      </ScrollView>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <Register {...props} navigation={navigation} />;
}

