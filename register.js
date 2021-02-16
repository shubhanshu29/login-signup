import React, { Component, useState } from "react";
import { Button, Text, TextInput, StyleSheet, ScrollView, View } from "react-native";

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
      <ScrollView style={styles.container}>
        <Text style={{ color: "white", fontSize: 45, textAlign: "center" }}>{"\n"}Register{"\n"}</Text>
        <Text style={{ color: "white" }}>Account Information{"\n"}</Text>

        <View style={styles.form}>
          {
            Objects.key(this.state).map((key) => {
              const inputObj = this.state[key];
              return (
                <View>
                  <View>
                    <TextInput
                      style={{ height: 60, width: 320 }}
                      placeholder={inputObj.placeholder}
                      placeholderTextColor="grey"
                      color="white"
                      onChangeText={(text) => this.handleChange(key, text)}
                      value= {inputObj.value}
                    />
                  </View>

                  <Text>
                    {this.state[inputObj.err]}
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

            if (!re.test(String(this.state.email.value).toLowerCase())) {
              alert("Invalid email");
              return false;
            }

            if (!passw.test(this.state.password.value)) {
              alert("Invalid Password");
              return false;
            }

            try {
              const res = await fetch('http://192.168.1.45:8000/register/', {
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
              let response = await res.json();
              alert(response);
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

class Register extends Component {
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
      flex: 1,
      backgroundColor: '#262624'
    }
  });

export default Register;