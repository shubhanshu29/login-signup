import config from '../utils/config';
const url= config.url;


export const likeComment = async (commentId, jwtToken, likeType) => {
    try {
        const response = await fetch(url + 'comments/likecomment/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': jwtToken,
            },
            body: JSON.stringify({
                commentId: commentId,
                likeType: likeType,
            })
        })

        return response.json();
    }
    catch (error) {
        alert(error);
    }
}

export const unlikeComment = async (commentId, jwtToken) => {
    try {
        const response = await fetch(url + 'comments/unlikecomment/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token' : jwtToken,
            },
            body: JSON.stringify({
                commentId: commentId,
            })
        })

        return response.json();
    }
    catch (error) {
        alert(error);
    }
}

export const addCommentAPI = async(postid,  comment, jwtToken) => {
    try{
        const response = await fetch(url + 'comments/addcomment/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token' : jwtToken,
            },
            body: JSON.stringify({
                postId: postid,
                commentText: comment
            })
        })
        return response.json();
    }
    catch(error){
        alert(error);
    }
}