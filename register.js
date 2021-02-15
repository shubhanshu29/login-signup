import React, { Component, useState} from "react";
import { Button, Text, TextInput, StyleSheet, ScrollView , View} from "react-native";

class Cat extends Component {
    state = {
      email: '',
      password: '',
      isValid: false
    };
  render(props) {
    const { isValid } = this.state;
    console.log('isValid', isValid);
    return (
      <ScrollView style = { styles.container }>
        <Text style={{ color: "white", fontSize:45, textAlign:"center"}}>{"\n"}Register{"\n"}</Text>
        <Text style={{ color: "white"}}>What should everyone call you?</Text>
        <TextInput
          style={{height: 60}}
          placeholder="Username"
          backgroundColor="black"
          color= "white"
          placeholderTextColor= "grey"
          
        />
        <Text style={{ color: "white"}}>{"\n\n"}Account Information:</Text>
        <TextInput
          style={{height: 60}}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          backgroundColor="black"
          color= "white"
          placeholderTextColor= "grey"
        />
        
        <Text>{"\n"}</Text>
        <TextInput
          style={{height: 60}}
          placeholder="Password"
          backgroundColor="black"
          color= "white"
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholderTextColor= "grey"
          pattern={[
            '^.{8,}$'
          ]}
          onValidation={isValid => this.setState({ isValid })}
        />
        <View>
          <Text style={{ color: isValid && isValid[0] ? 'green' : 'red' }}>
            Rule 1: min 8 chars
          </Text>
        </View>
        <Text>{"\n"}</Text>
        <Button
          onPress={async () => {
            try{
              console.log(this.state.isValid);
              const res = await fetch('http://192.168.1.45:8000/register/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: this.state.email,
                  password: this.state.password
                })
              })
              let response= await res.json();
              console.log(response);
            }
            catch(error){
              console.log(error);
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
        <Cat/>
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

export default  Register;