import React, { Component, useState} from "react";
import { Button, Text, TextInput, StyleSheet, ScrollView , View} from "react-native";

class Cat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    
    this.inputFields= [
      {
        name: "email",
        placeholder: "Email"
      },
      {
        name:"password",
        placeholder: "Password"
      }
    ]
  }
  render(props) {
    return (
      <ScrollView style = { styles.container }>
        <Text style={{ color: "white", fontSize:45, textAlign:"center"}}>{"\n"}Register{"\n"}</Text>
        <Text style={{ color: "white"}}>Account Information{"\n"}</Text>

        <View style={styles.form}>
        {
          this.inputFields.map( (inputObj) => {
              return(
                  <View>
                      <View>
                          <TextInput 
                              style={{height: 60, width:320}}
                              placeholder= {inputObj.placeholder}
                              placeholderTextColor = "grey"
                              color="white"
                              onChangeText = {(text)=>{
                                  this.setState({ [inputObj.name] : text })
                                  this.setState({ [inputObj.err] : "" })
                              }}
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
            var passw=  /^[A-Za-z]\w{7,14}$/;

            if(!re.test(String(this.state.email).toLowerCase())){
              alert("Invalid email");
              return false;
            }

            if(!passw.test(this.state.password)){
              alert("Invalid Password");
              return false;
            }
            
            try{
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
              alert(response);
            }
            catch(error){
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