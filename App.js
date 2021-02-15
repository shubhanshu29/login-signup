// In App.js in a new project
import * as React from 'react';
import { Button, View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './register';
import Login from './login';

function HomeScreen({ navigation }) {
  return (
    <View style={ styles.container }>
      <Image
          source={require('./logo.png')}
          style={{width: 600, height: 200}}
      />
      <Text style={{fontSize: 30, color:"white"}}>Welcome to Discord{"\n"}</Text>
      <Text style={{fontSize: 15, color:"grey", textAlign:"center"}}>Join with people who use Discord to talk with communities 
      and friends.{"\n"}</Text>
      <Button
        style={{height: 40, paddingHorizontal:100, width:"100"}}
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Text>{"\n"}</Text>
      <Button

        color="grey"
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
export default App;