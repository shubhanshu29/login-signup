import config from './../../utils/config';
import {likeComment, unlikeComment} from '../../api/comment';

export default addcomment = async (postid, comment, id) => {
    console.log(postid, comment);
    try {
        const url= config.url;
        const res = await fetch(url + 'comments/addcomment/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postId: postid,
                commentersId: id,
                commentText: comment
            })
        })

        let response = await res.json();

        if (response.success) {
            makeRequest();
        }
    }
    catch (error) {
        alert(error);
    }
}

export const toggleLike = async (commentId, userId, likeStatus) => {
    if(!likeStatus){
        const response=  await likeComment(commentId , userId);
        console.log(response);
    }
    else{
        const response = await unlikeComment(commentId, userId);
        console.log(response);
    }
}