import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        marginLeft: '2%',
        display: 'flex',
        flex: 9,
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 20,
        marginRight: 20,
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    screen: {
        marginLeft: '2%',
        display: 'flex',
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        marginTop: 20,
        marginBottom: 20
    },
    addComment: {
        marginLeft: '2%',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
        marginRight: '2%',
        flexWrap: 'wrap'
    },
    component: {
        flexDirection: 'column',
        marginLeft: '2%',
        flexWrap: 'wrap',
        marginRight: '2%',
        marginEnd: '2%',
        flex: 4,
        alignItems: 'flex-start',
        flexGrow: 1
    },

    tinyLogo: {
        width: 50,
        height: 50,
        flexWrap: 'wrap',
        borderRadius: 40,
    },

    item: {
        flex: 1,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'grey',
        flexWrap: 'wrap'
    },

    title: {
        fontSize: 15,
        flexWrap: 'wrap'
    },

    seperator: {
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%",
        marginRight: "10%"
    }
});