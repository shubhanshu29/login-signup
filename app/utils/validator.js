const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const numberRegex = /^[6-9]\d{9}$/;
const passwordRegex= /^[A-Za-z]\w{7,14}$/;

export const isValidLoginId = (email) => {
    if (emailRegex.test(String(email).toLowerCase()) || numberRegex.test(String(email).toLowerCase())) {
        return true;
    }
    return false;
}

export const isValidPassword = (password) => {
    if (!passwordRegex.test(password)) {
        return false;
    }
    return true;
}