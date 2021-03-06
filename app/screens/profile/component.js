import {updateProfileAPI} from '../../api/auth';
import {isValidLoginId, isValidPassword} from '../../utils/validator';

export const INITIAL_STATE = {
    name: {
        value: '',
        placeholder: 'Name',
        key: '0',
        editable: true,
        secureTextEntry: false,
    },
    email: {
        value: '',
        placeholder: 'Email/ Phone number',
        key: '1',
        editable: false,
        secureTextEntry: false,
    },
    oldPassword: {
        key: '2',
        value: '',
        placeholder: 'Password',
        editable: true,
        secureTextEntry: true,
    },
    password: {
        key: '3',
        value: '',
        placeholder: 'New Password',
        editable: true,
        secureTextEntry: true,
    },
    rePassword: {
        key: '4',
        value: '',
        placeholder: 'Repeat Password',
        editable: true,
        secureTextEntry: true,
    },
}


/**
 * function to handle the state changes before the render
 * @param {String} key 
 * @param {String} text 
 * @param {Object} state 
 * @param {Object} setState 
 */
export const handleChange = (key, text, state, setState) => {
    setState({
        ...state,
        [key]: { ...state[key], value: text }
    })
}

//First calls the update profile API and at its successful response, update the values at redux store.
export const updateProfile = async(jwtToken, name, email, password, oldPassword, rePassword, dispatch, navigation) => {
    if(!isValidLoginId(email)) {
        alert("Please enter valid phone number or Email");
        return false;
    }
    if (!isValidPassword(oldPassword)) {
        alert("Invalid Password");
        return false;
    }
    const response = await updateProfileAPI(jwtToken, name, email, password, oldPassword, rePassword);
    if(response.success){
        dispatcher(name, dispatch);
        navigation.navigate('Welcome');
    }
    else{
        alert(response.err);
    }
}


//dispatches the new name to the redux store.
const dispatcher = ( name, dispatch) => {
    dispatch(
        {
            type: 'UPDATE_PROFILE',
            payload: {
                name: name
            }
        }
    )
}