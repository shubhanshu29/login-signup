import React, { Component } from "react";
import { Button, Text, View, TextInput, StyleSheet, } from "react-native";
import { useNavigation } from '@react-navigation/native';
import config from '../../utils/config';
import styles from './style'


class Login extends Component {

  constructor(props) {
    super(props);
    var type=null;
    this.state = {  
      email: {
        value: this.props.route.params.data.loginid,
        placeholder: 'Email/ Phone number',
        key: '1',
        editable: false
      },
      password: {
        key: '2',
        value: '',
        placeholder: 'Password',
        editable: true
      }
    }
  }

  handleChange(key, text) {
    this.setState({
      [key]: { ...this.state[key], value: text }
    })
  }

  render() {
    const url= config.url;
    const {navigation}= this.props;
    return (
      
      <View style={styles.container}>

        <Text style={{ fontSize: 40, color: "white" }}>Welcome back!</Text>
        <Text style={{ fontSize: 15, color: "grey" }}>Login with your email to start talking{"\n\n\n"}</Text>

        <View style={styles.form}>
          <Text style= {{color: "white"}}>Welcome, {this.props.route.params.data.name} {"\n"} </Text>
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
                      editable= {inputObj.editable}
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
          onPress={async () => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var passw = /^[A-Za-z]\w{7,14}$/;
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

            if (!passw.test(this.state.password.value)) {
              alert("Invalid Password");
              return false;
            }

            try {
              const res = await fetch(url + 'login/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  loginid: this.state.email.value,
                  password: this.state.password.value,
                  type: type
                })
              })
              let data = await res.json();
              if (data.Success) {
                navigation.navigate('Welcome', {
                  data: data.data
                });
              }
              else {
                alert(data.data);
              }
            }
            catch (error) {
              console.log(error)
              alert(error);
            }

          }}
          title="Login"
        />


      </View>
    );
  }
}


export default function (props) {
  const navigation = useNavigation();
  return <Login {...props} navigation={navigation} />;
}