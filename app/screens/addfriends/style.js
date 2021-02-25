import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    search: {
        marginTop: '10%',
        display: 'flex',
        marginLeft: '4%',
        marginRight: '4%',
        flex: 1,
        flexDirection: 'row',
    },
    bigScreen: {
        marginLeft: '2%',
        display: 'flex',
        flex: 9,
        flexDirection: 'column',
        marginTop: 20,
        marginBottom: 20,
        marginRight: '2%'
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
})