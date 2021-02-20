import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, View, StyleSheet, Text, Image, ActivityIndicator } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const FlatListDemo = () => {
    const [state, setState] = useState({ DATA: [], page: 1, refreshing: false });

    renderHeader = () => {
        return (
            <View style={{ alignItems: "center" }}>
                <Text>Header here</Text>
            </View>
        );
    };

    renderFooter = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <ActivityIndicator color='grey' />
            </View>
        )
    }

    useEffect(() => {
        makeRequest();
    }, [state.page]);

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "10%",
                    marginRight: "10%"
                }}
            />
        );
    };

    makeRequest = async (prevState) => {

        const url = await fetch('https://randomuser.me/api/?seed=1&page=' + state.page + '&results=20');
        const res = await url.json();

        for (var i = 0; i < res.results.length; i++) {
            res.results[i].liked = false;
        }

        if (state.page == 1) {
            setState({ ...state, DATA: res.results, refreshing: false });
        }
        else {
            setState({ ...state, DATA: [...state.DATA, ...res.results], refreshing: false });
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>

                <Image
                    style={styles.tinyLogo}
                    source={{ uri: item.picture.thumbnail }}
                />
                <View style={styles.component}>
                    <Text style={styles.title}>
                        {item.name.title}{" "}{item.name.first}{" "}{item.name.last}
                    </Text>
                    <Text style={styles.item}>
                        {item.email}
                    </Text>
                </View>

                <AntDesign name={item.liked ? "heart" : "hearto"} style={{ flex: 1, justifyContent: 'flex-end' }} size={24} color="red" onPress={() => {
                    setState(prevState => ({
                        ...prevState,
                        DATA: prevState.DATA.map(userObject => (
                            userObject.email === item.email ? {
                                ...userObject,
                                liked: !item.liked
                            } : userObject
                        ))
                    }))
                }} />


            </View>
        );
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={state.DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.email}
                ItemSeparatorComponent={renderSeparator}
                refreshing={state.refreshing}
                onRefresh={() => {
                    setState({ ...state, page: 1, refreshing: true });
                }}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}

                onEndReached={() => {
                    setState({ ...state, page: state.page + 1 });
                }}
                onEndReachedThreshold={0.5}
                initialNumToRender={20}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: '2%',
        display: 'flex',
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20
    },
    component: {
        flexDirection: 'column',
        marginLeft: '2%',
        flexWrap: 'wrap',
        flex: 4
    },

    tinyLogo: {
        width: 50,
        height: 50,
        flexWrap: 'wrap',
        borderRadius: 40,
    },

    item: {
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'grey',
        flexWrap: 'wrap'
    },

    title: {
        fontSize: 15,
    },
});

export default FlatListDemo;