import { createTweeetAPI } from '../../api/tweet';

export const INITIAL_STATE = { 
    body: '', 
    userid: '' 
}


//Calls an API to post a tweet. If successul, redirect to welcome and otherwise alerts the error.
export const createTweeets = async (navigation, body, jwtToken) => {
    const response = await createTweeetAPI(body, jwtToken);
    if (response.success) {
        navigation.navigate('Welcome');
    }
    else {
        alert(response.err);
    }
}