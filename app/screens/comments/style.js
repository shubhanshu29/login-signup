import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        marginLeft: '2%',
        display: 'flex',
        flex: 9,
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20
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
        marginRight: '2%'
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