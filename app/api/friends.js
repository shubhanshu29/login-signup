import  config from '../utils/config';

export const AddFriendsAPI = async (sendersId, receiversId) => {
    const url= config.url;
    try {
        const response = await fetch(url + 'relationship/friendstatus', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentUserId: sendersId,
                friendUserId: receiversId,
                status: 0
            })
        })

        return response.json();
    }
    catch (error) {
        alert(error);
    }
}