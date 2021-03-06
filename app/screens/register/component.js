import { registerAPI } from '../../api/auth';
import { isValidLoginId, isValidPassword } from '../../utils/validator';

export const INITIAL_STATE = {
    name: {
        value: '',
        placeholder: 'Name',
        key: '0',
        editable: true,
        secureTextEntry: false
    },
    email: {
        value: '',
        placeholder: 'Email',
        key: '1',
        editable: false,
        secureTextEntry: false
    },
    password: {
        value: '',
        placeholder: 'Password',
        key: '2',
        editable: true,
        secureTextEntry: true
    },
    repassword: {
        value: '',
        placeholder: 'Re- Password',
        key: '3',
        editable: true,
        secureTextEntry: true
    }
}

//function to dispatch name and email after successfully resgistering
const dispatcher = async (email, name, dispatch) => {
    await dispatch(
        {
            type: 'REGISTER',
            payload: {
                loginid: email,
                name: name
            }
        }
    )
}

//setting email id field from redux store
export const setDefaultEmail = (key, globalParams, state, setState) => {
    handleChange(key, globalParams.loginid, state, setState);
}

//function to register the user and dispatch the values to redux store
export const register = async (name, email, password, repassword, dispatch, navigation) => {
    if (!isValidLoginId(email)) {
        alert('Please enter valid phone number or email');
        return false;
    }

    if(!isValidPassword(password)){
        alert('Invalid password');
        return false;
    }

    if (password != repassword) {
        alert("Passwords doesn't match");
        return false;
    }

    const response = await registerAPI(name, email, password, repassword);
    if (response.success) {
        await dispatcher(email, name, dispatch);
        navigation.navigate('Login')
    }
    else {
        alert(response.err);
    }
}


//function to handle any state changes in between the renders
export const handleChange = (key, text, state, setState) => {
    setState({
        ...state,
        [key]: { ...state[key], value: text }
    })
}