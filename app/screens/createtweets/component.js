import config from '../../utils/config';

export default createTweeets = async (navigation , body, loginId) => {
    try {
        const url = config.url;
        const res = await fetch(url + 'tweets/addtweet/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tweetText: body,
                loginId: loginId
            })
        })

        let response = await res.json();
        if (response.success) {
            navigation.navigate('Welcome');
        }
        else {
            alert(response.err);
        }
    }
    catch (error) {
        alert(error);
    }
}