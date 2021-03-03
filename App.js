// In App.js in a new project
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './app/screens/register/index';
import Login from './app/screens/login/index';
import Welcome from './app/screens/welcome/index';
import LoginHome from './app/screens/loginHome/index';
import Profile from './app/screens/profile/index';
import Comments from './app/screens/comments/index';
import CreateTweets from './app/screens/createtweets/index';
import AddFriends from './app/screens/addfriends/index';
import { Provider } from 'react-redux';
import configStore from './app/store/';


const store = configStore();


const HomeScreen = () => {

  return (
    <>
      <LoginHome />
    </>
  )
}

const Stack = createStackNavigator();


function App() {
  return (
    <Provider store= {store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="LoginHome" component={LoginHome} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="Comments" component={Comments} options={{ headerShown: false }} />
          <Stack.Screen name="CreateTweets" component={CreateTweets} options={{ headerShown: false }} />
          <Stack.Screen name="AddFriends" component={AddFriends} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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