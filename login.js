import React, { Component } from "react";
import { Button, Text, View, TextInput, StyleSheet } from "react-native";


class Cat extends Component {

  constructor() {
    super();
    this.state = {
      email: {
        value: '',
        placeholder: 'Email'
      },
      password: {
        value: '',
        placeholder: 'Password'
      }
    }
  }

  handleChange(key, text) {
    this.setState({
      [key]: { ...this.state[key], value: text }
    })
  }

  render() {

    return (
      <View style={styles.container}>

        <Text style={{ fontSize: 40, color: "white" }}>Welcome back!</Text>
        <Text style={{ fontSize: 15, color: "grey" }}>Login with your email to start talking{"\n\n\n"}</Text>

        <View style={styles.form}>
          {
            Object.keys(this.state).map((key) => {
              const inputObj = this.state[key];
              return (
                <View>
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
        <Text style={{ fontSize: 15, color: "skyblue" }}>{"\n"}Forgot Password?</Text>
        <Text style={{ fontSize: 15, color: "skyblue" }}>Use a Password manager?</Text>
        <Text>{"\n"}</Text>

        <Button
          onPress={async () => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var passw = /^[A-Za-z]\w{7,14}$/;
            if (!re.test(String(this.state.email.value).toLowerCase())) {
              alert("Invalid email");
              return false;
            }

            if (!passw.test(this.state.password.value)) {
              alert("Invalid Password");
              return false;
            }

            try {
              const res = await fetch('http://192.168.1.45:8000/login', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: this.state.email.value,
                  password: this.state.password.value
                })
              })
              let data = await res.json();
              console.log(data)
              alert(data);
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

class Login extends Component {
  render() {
    return (
      <>
        <Cat />
      </>
    );
  }
}

const styles = StyleSheet.create(
  {
    container:
    {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor: '#262624'
    }
  });

export default Login;