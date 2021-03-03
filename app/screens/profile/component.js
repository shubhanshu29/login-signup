import {updateProfileAPI} from '../../api/auth';

export const INITIAL_STATE = {
    name: {
        value: '',
        placeholder: 'Name',
        key: '0',
        editable: true
    },
    email: {
        value: '',
        placeholder: 'Email/ Phone number',
        key: '1',
        editable: false
    },
    oldPassword: {
        key: '2',
        value: '',
        placeholder: 'Password',
        editable: true
    },
    password: {
        key: '3',
        value: '',
        placeholder: 'New Password',
        editable: true
    },
    rePassword: {
        key: '4',
        value: '',
        placeholder: 'Repeat Password',
        editable: true
    },
}

export const handleChange = (key, text, state, setState) => {
    setState({
        ...state,
        [key]: { ...state[key], value: text }
    })
}

const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const nu = /^[6-9]\d{9}$/;
    if (re.test(String(email).toLowerCase()) || nu.test(String(email).toLowerCase())) {
        return true;
    }
    return false;
}

const isValidPassword = (password) => {
    var passw = /^[A-Za-z]\w{7,14}$/;
    if(!passw.test(password)){
        return false;
    }
    return true;

}
export const updateProfile = async(name, email, password, oldPassword, rePassword, dispatch) => {
    if(!isValidEmail(email)) {
        alert("Please enter valid phone number or Email");
        return false;
    }
    if (!isValidPassword(oldPassword) || !isValidPassword(password) || !isValidPassword(rePassword)) {
        alert("Invalid Password");
        return false;
    }
    const response = await updateProfileAPI(name, email, password, oldPassword, rePassword);
    if(response.success){
        dispatcher(name, dispatch);
        alert(response.data);
    }
    else{
        alert(response.err);
    }
}

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