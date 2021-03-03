import config from '../utils/config';

const url= config.url;

//API calling for registering a user.
export const registerAPI = async (name, email, password, repassword) => {
    try {
        console.log('register api workng');
        const response = await fetch(url + 'user/signup/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                loginid: email,
                password: password,
                repassword: repassword
            })
        })
        return response.json();
    }
    catch (error) {
        alert(error);
    }
}


//API for updating the profile of the user
export const updateProfileAPI = async (name, email, password, oldPassword, rePassword) => {
    try {
        const response = await fetch(url + 'user/updateprofile/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                loginId: email,
                password: password,
                oldPassword: oldPassword,
                rePassword: rePassword,
            })
        })
        return response.json();
    }
    catch (error) {
        alert(error);
    }
}


//API for checking whether the user is already registered or not.
export const verifyEmailAPI = async (email) => {
    try {
        const response = await fetch(url + 'user/verify/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                loginid: email
            })
        })
        return response.json();
    }
    catch (error) {
        alert(error);
    }
}

//API for logging the user in
export const loginAPI = async (email, password) => {
    try {
        const response = await fetch(url + 'user/login/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                loginid: email,
                password: password
            })
        })
        return response.json();
    }
    catch(error){
        alert(error);
    }
}