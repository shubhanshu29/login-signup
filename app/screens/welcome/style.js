import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    bigScreen: {
        marginLeft: '2%',
        display: 'flex',
        flex: 9,
        flexDirection: 'column',
        marginTop: 20,
        marginRight: '2%'
    },
    icons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around'
    },
    addFriend: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    profile: {
        justifyContent: 'center',
        alignContent: 'flex-end',
    },
    addButton: {
        justifyContent: 'center',
        alignContent: 'flex-end',
    },
    container: {
        marginLeft: '2%',
        display: 'flex',
        flex: 1,
        height: '50%',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        marginRight: '2%'
    },
    component: {
        flexDirection: 'column',
        height : '30%',
        marginLeft: '2%',
        flex: 4,
    },

    tinyLogo: {
        width: 50,
        height: 50,
        borderRadius: 40,
    },

    item: {
        marginBottom:10,
        height: 20,
        flexDirection: 'row',
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'grey',
        flexWrap: 'wrap'
    },

    title: {
        flex: 0.1,
        flexDirection: 'row',
        fontSize: 15,
    },

    seperator: {
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%",
        marginRight: "10%"
    },

    searchbox: {
        display: 'flex',
        flex: 8,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 1000,
        height: 30,
        width: 50
    },

    popularity: {
        flex: 0.3,
        flexDirection: 'row',
        alignContent: 'space-around',
        alignItems: 'stretch',
        alignSelf: 'stretch',
    },

    likeIcon: {
        marginStart: '8%',
        marginTop: '8%'
    }
});
