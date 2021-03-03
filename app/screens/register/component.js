import { registerAPI } from '../../api/auth';

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

export const setDefaultEmail = (key, globalParams, state, setState) => {
    handleChange(key, globalParams.loginid, state, setState);
}


const isNumber = (email) => {
    const nu = /^[6-9]\d{9}$/;
    if (nu.test(String(email).toLowerCase())) {
        type = 0;
        return true;
    }
    else {
        return false;
    }
}

const isEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
        type = 1;
        return true;
    }
    return false;
}

const isCorrectPassword = (password) => {
    var passw = /^[A-Za-z]\w{7,14}$/;
    if (!passw.test(password)) {
        return false;
    }
    return true;
}

export const register = async (name, email, password, repassword, dispatch, navigation) => {
    if (!isNumber(email) && !isEmail(email)) {
        alert('Please enter valid phone number or email');
        return false;
    }

    if (!isCorrectPassword(password)) {
        alert("Invalid Password");
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
        console.log(response.err);
    }
}

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

export const handleChange = (key, text, state, setState) => {
    setState({
        ...state,
        [key]: { ...state[key], value: text }
    })
}