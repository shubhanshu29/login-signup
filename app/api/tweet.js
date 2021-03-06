import config from '../utils/config';


const url = config.url;

//API for getting all the tweeets for the user.
export const getTweetsAPI = async (page, loginParams) => {

    try {
        const response = await fetch(url + 'tweets/gettweets', {
            headers: {
                'x-access-token': loginParams.jwtToken,
                'pageno': page,
            }
        });
        return await response.json();
    } catch (error) {
        alert(error);
    }
}

//API for liking a tweet
export const likeTweet = async (jwtToken, tweetId, likeType) => {
    try {
        const response = await fetch(url + 'tweets/liketweet/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': jwtToken,
            },
            body: JSON.stringify({
                postId: tweetId,
                likeType: likeType
            })
        })

        return response.json();
    }
    catch (error) {
        alert(error);
    }
}

//API for unliking a tweet
export const unlikeTweet = async (jwtToken, tweetId) => {
    try {
        const response = await fetch(url + 'tweets/unliketweet/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': jwtToken,
            },
            body: JSON.stringify({
                postId: tweetId,
            })
        })

        return response.json();
    }
    catch (error) {
        alert(error);
    }
}

//API for posting a tweet
export const createTweeetAPI = async (body, jwtToken) => {
    try {
        const response = await fetch(url + 'tweets/addtweet/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': jwtToken,
            },
            body: JSON.stringify({
                tweetText: body
            })
        })
        return await response.json();
    }
    catch (error) {
        alert(error);
    }
}