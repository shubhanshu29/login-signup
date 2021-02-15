import React, { Component , useState} from "react";
import { Button, Text, View,  TextInput, StyleSheet} from "react-native";

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
      <View style = { styles.container }>


        <Text style={{fontSize:40, color:"white"}}>Welcome back!</Text>
        <Text style={{fontSize:15, color:"grey"}}>Login with your email to start talking{"\n\n\n"}</Text> 


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
        <Text style={{fontSize:15, color:"skyblue"}}>{"\n"}Forgot Password?</Text>
        <Text style={{fontSize:15, color:"skyblue"}}>Use a Password manager?</Text>
        <Text>{"\n"}</Text>
        
        <Button
          onPress={async () => {
            console.log(JSON.stringify({
              username: this.state.email,
              password: this.state.password
            }));
            try{
              const res= await fetch('http://192.168.1.45:8000/login', {
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
              let data=await res.json();
              console.log(data)
              alert(data);
            }
            catch(error){
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
        <Cat/>
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

export default  Login;