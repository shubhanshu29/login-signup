import { verifyEmailAPI } from '../../api/auth';
import { isValidLoginId } from '../../utils/validator';

export const INITIAL_STATE = {
    email: {
        value: '',
        placeholder: 'Enter Email',
        key: '1'
    },
}

//changes the state of the variables from the state map and re-renders.
export const handleChange = (key, text, state, setState) => {
    setState({
        [key]: { ...state[key], value: text }
    })
}

//navigates to proper route after verifying whether the email is registered or not
export const loginVerify = async (navigation, email, dispatch, setState) => {

    if (!isValidLoginId(email)) {
        alert('Please enter valid phone number or email');
        return false;
    }

    //this api returns whether there is any user registered or not with the entered email.
    const response = await verifyEmailAPI(email);
    if (response.success) {
        dispatcher(response.data.loginid, response.data.name, dispatch);
        setState(INITIAL_STATE);
        navigation.navigate('Login', {
            data: response.data,
        })
    }
    else {
        dispatcher(email, '', dispatch);
        setState(INITIAL_STATE);
        navigation.navigate('Register', {
            data: email,
        })
    }
}

//dispatches the corresponding values to redux for future use.
const dispatcher = (email, name, dispatch) => {
    dispatch(
        {
            type: 'VERIFY',
            payload: {
                loginid: email,
                name: name
            }
        }
    )
}
