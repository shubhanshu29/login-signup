import * as React from 'react';
import { WebView } from 'react-native-webview';

const url = 'https://www.youtube.com/embed/cqyziA30whE';
export const ShowFrame = () => {
    return (
        <WebView
            style = {{justifyContent: 'center', alignContent: 'center'}}
            source={{ html: '<iframe width="100%" height="50%" src="'+ url +'" sandbox frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>' }}
            style={{ marginTop: 20 }}
        />
    )
}