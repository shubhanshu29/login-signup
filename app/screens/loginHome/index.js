import React, { Component, useEffect } from "react";
import { Button, Text, View, TextInput, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import config from '../../utils/config';
import styles from './style';


class LoginHome extends Component {
  
  constructor(props) {
    super(props);
    this.state = {

      email: {
        value: '',
        placeholder: 'Enter Email',
        key: '1'
      },
    }
    var type=-1;
  }

  handleChange(key, text) {
    this.setState({
      [key]: { ...this.state[key], value: text }
    })
  }
  
  render() {
    const url= config.url;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>

        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 600, height: 200 }}
        />
        <Text style={{ fontSize: 15, color: "grey" }}>Please enter your email ID:{"\n\n\n"}</Text>

        <View style={styles.form}>
          {
            Object.keys(this.state).map((key) => {
              const inputObj = this.state[key];
              return (
                <View key={inputObj.key}>
                  <View>
                    <TextInput
                      style={{ height: 60, width: 320 }}
                      placeholder={inputObj.placeholder}
                      placeholderTextColor="grey"
                      backgroundColor="black"
                      color="white"
                      onChangeText={(text) => this.handleChange(key, text)}
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
          onPress={async () => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const nu= /^[6-9]\d{9}$/;
            if (re.test(String(this.state.email.value).toLowerCase())) {
              type=1;    
            }
            else if(nu.test(String(this.state.email.value).toLowerCase())) {
              type=0;
            }
            else{
              alert("Please enter valid phone number or Email");
              return false;
            }

            try {
              const res = await fetch(url + 'verify/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  loginid: this.state.email.value,
                  type: type
                })
              })
              let data = await res.json();
              if (data.Success) {
                navigation.navigate('Login', {
                  data: data.data,
                });
              }
              else {
                navigation.navigate('Register', {
                  data: this.state.email.value,
                });
              }
            }
            catch (error) {
              console.log(error)
              alert(error);
            }

          }}
          title="Continue"
        />
      </View>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <LoginHome {...props} navigation={navigation} />;
}