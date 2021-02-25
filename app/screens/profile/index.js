import React, { Component } from "react";
import { Button, Text, View, TextInput, StyleSheet, } from "react-native";
import  config  from '../../utils/config';
import style from "../createtweets/style";
import styles from './style';


class Profile extends Component {

    constructor(props) {
        super(props);
        var type = null;
        this.state = {
            name: {
                value: '',
                placeholder: 'Name',
                key: '0',
                editable: true
            },
            email: {
                value: '',
                placeholder: 'Email/ Phone number',
                key: '1',
                editable: true
            },
            oldPassword: {
                key: '2',
                value: '',
                placeholder: 'Password',
                editable: true
            },
            password: {
                key: '3',
                value: '',
                placeholder: 'New Password',
                editable: true
            },
            rePassword: {
                key: '4',
                value: '',
                placeholder: 'Repeat Password',
                editable: true
            },
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

                <Text style={{ fontSize: 20, color: "white" }}>Profile!{"\n"}</Text>

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

                        if (!passw.test(this.state.oldPassword.value)) {
                            alert("Invalid Password");
                            return false;
                        }

                        try {
                            const url = config.url;
                            const res = await fetch(url + 'updateprofile/', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    name: this.state.name.value,
                                    loginId: this.state.email.value,
                                    password: this.state.password.value,
                                    oldPassword: this.state.oldPassword.value,
                                    rePassword: this.state.rePassword.value,
                                    type: type
                                })
                            })
                            let data = await res.json();
                            if (data.Success) {
                                alert(data.data);
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
                    title="Reset"
                />


            </View>
        );
    }
}

export default Profile;