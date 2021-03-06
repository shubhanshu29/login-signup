import  config from '../utils/config';
const url= config.url;

export const AddFriendsAPI = async (jwtToken, receiversId, status) => {
    try {
        const response = await fetch(url + 'relationship/friendstatus', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': jwtToken,
            },
            body: JSON.stringify({
                friendUserId: receiversId,
                status: status,
            })
        })

        return response.json();
    }
    catch (error) {
        alert(error);
    }
}

export const getAllFriendRequestsAPI = async (jwtToken) => {
    try{
        const response = await fetch(url + 'user/friendrequestlist/', {
            header: {
                'x-access-token': jwtToken,
            }
        });
        return await response.json();
    }
    catch(error){
        alert(error);
    }
}