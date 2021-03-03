import config from '../utils/config';

export const likeComment = async (commentId, userId) => {
    const url= config.url;
    try {
        const response = await fetch(url + 'comments/likecomment/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                commentId: commentId,
                userId: userId
            })
        })

        return response.json();
    }
    catch (error) {
        alert(error);
    }
}

export const unlikeComment = async (commentId, userId) => {
    const url= config.url;
    try {
        const response = await fetch(url + 'comments/unlikecomment/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                commentId: commentId,
                userId: userId
            })
        })

        return response.json();
    }
    catch (error) {
        alert(error);
    }
}