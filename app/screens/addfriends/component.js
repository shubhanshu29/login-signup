import {AddFriendsAPI} from '../../api/friends';

export const renderItem = ({ item }) => {
    return (
        <View style={styles.container}>

            <Image
                style={styles.tinyLogo}
                source={{ uri: 'https://image.shutterstock.com/z/stock-photo-valencia-spain-march-twitter-logotype-printed-on-paper-twitter-is-an-online-social-601425683.jpg' }}
            />
            <View style={styles.component}>
                <Text style={styles.title}>
                    {item.name}
                </Text>
                <Text style={styles.item}>
                    {item.loginid}
                </Text>
            </View>
            <View>
                {renderFriendStatus( item )}
            </View>


        </View>
    );
};

export const sendFriendRequest = async (jwtToken, receiversId) => {
    const response = await AddFriendsAPI(jwtToken, receiversId);
    if(response.success){
        alert('Friend request sent');
    }
    else{
        alert(response.err);
    }
}