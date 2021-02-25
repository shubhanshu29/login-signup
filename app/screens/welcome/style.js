import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    bigScreen: {
        marginLeft: '2%',
        display: 'flex',
        flex: 9,
        flexDirection: 'column',
        marginTop: 20,
        marginBottom: 20,
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
        height: 70,
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        marginRight: '2%'
    },
    component: {
        flexDirection: 'column',
        marginLeft: '2%',
        flex: 4
    },

    tinyLogo: {
        width: 50,
        height: 50,
        borderRadius: 40,
    },

    item: {
        height: 20,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'grey',
        flexWrap: 'wrap'
    },

    title: {
        fontSize: 15,
    },
});
