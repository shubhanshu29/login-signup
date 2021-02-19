import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, View, StyleSheet, Text, Image, ActivityIndicator } from "react-native";

const FlatListDemo = () => {
    const [DATA, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

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
    }, [page]);

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

    makeRequest = async () => {

        const url = await fetch('https://randomuser.me/api/?seed=1&page=' + page + '&results=20');
        const res = await url.json();
        if (page == 1) {
            setData(res.results);
        }
        else {
            setData(DATA.concat(res.results));
        }
        setRefreshing(false);
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
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.email}
                ItemSeparatorComponent={renderSeparator}
                refreshing={refreshing}
                onRefresh={() => {
                    setRefreshing(true);
                    setPage(1);
                    setRefreshing(false);
                }}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                
                onEndReached={() => {
                    setPage(page + 1);
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
        flexWrap: 'wrap'
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