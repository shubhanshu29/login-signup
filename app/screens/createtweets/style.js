import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        marginTop: '10%',
        marginBottom: '10%',
        display: 'flex',
        marginLeft: '14%',
        marginRight: '14%',
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center'
    },
    
    img: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        borderRadius: 60
    },

    textbox: {
        justifyContent: "center",
        alignItems: "stretch",
        height: 100,
        borderWidth: 1,
        borderColor: "black",

    }
})
