import { loginAPI } from '../../api/auth';
import { isValidLoginId, isValidPassword } from '../../utils/validator';
import config from './../../utils/config';

export const INITIAL_STATE = {
    email: {
        value: '',
        placeholder: 'Email/ Phone number',
        key: '1',
        editable: false,
    },
    password: {
        key: '2',
        value: '',
        placeholder: 'Password',
        editable: true
    }
}

export const handleChange = (key, text, state, setState) => {
    setState({
        ...state,
        [key]: { ...state[key], value: text }
    })
}


const dispatchUserId = (id, dispatch) => {
    dispatch({
        type: 'LOGIN',
        payload: {
            userId: id,
        }
    })
}

export const login = async (navigation, email, password, dispatch, state, setState) => {
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
            dispatchUserId(response.data.userId, dispatch);
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