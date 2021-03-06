import { loginAPI, sendDeviceDetailsAPI } from '../../api/auth';
import { isValidLoginId, isValidPassword } from '../../utils/validator';
import config from './../../utils/config';
  
export const INITIAL_STATE = {
    email: {
        value: '',
        placeholder: 'Email/ Phone number',
        key: '1',
        editable: false,
        secureTextEntry: false,
    },
    password: {
        key: '2',
        value: '',
        placeholder: 'Password',
        editable: true,
        secureTextEntry: true,
    }
}

//function to handle any state changes in between the renders
export const handleChange = (key, text, state, setState) => {
    setState({
        ...state,
        [key]: { ...state[key], value: text }
    })
}

//function to dispatch user id to the redux store after successful registration.
const dispatchUserId = (id, jwtToken, dispatch) => {
    dispatch({
        type: 'LOGIN',
        payload: {
            userId: id,
            jwtToken: jwtToken
        }
    })
}

//Logging in user and storing the userid to redux store after successful logging in
export const login = async (navigation, email, password, dispatch, setState) => {
    const url = config.url;    

    if (!isValidLoginId(email)) {
        alert("Please enter valid phone number or Email");
        return false;
    }

    if(!isValidPassword(password)){
        alert("Password invalid");
        return false;
    }

    try {
        const response = await loginAPI(email, password);
        if (response.success) {
            dispatchUserId(response.data.userId, response.data.token , dispatch);
            sendDeviceDetailsAPI();
            setState(INITIAL_STATE);
            navigation.navigate('Welcome');
        }
        else {
            alert(response.err);
        }
    }
    catch (error) {
        console.log(error)
        alert(error);
    }
}

export default login;