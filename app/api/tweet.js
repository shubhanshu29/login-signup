import config from '../utils/config';

export const getTweetsAPI = async (page, dispatch, loginParams) => {
    const url = config.url;
    const response = await fetch(url + 'tweets/gettweets/' + loginParams.userId + '/' + page);
    return await response.json();
}

export const likeTweet = async (tweetId, userId, likeType) => {
    const url = config.url;
    try {
        const response = await fetch(url + 'tweets/liketweet/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postId: tweetId,
                userId: userId,
                likeType: likeType
            })
        })

        return response.json();
    }
    catch (error) {
        alert(error);
    }
}

export const unlikeTweet = async (tweetId, userId) => {
    const url = config.url;
    try {
        const response = await fetch(url + 'tweets/unliketweet/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postId: tweetId,
                userId: userId,
            })
        })

        return response.json();
    }
    catch (error) {
        alert(error);
    }
}