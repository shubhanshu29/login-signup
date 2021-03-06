import React from 'react';
import imageCompression from 'browser-image-compression';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { onChange } from 'react-native-reanimated';
import { Input } from 'react-native-elements';

const options = {
    maxSizeMB: 5,          // (default: Number.POSITIVE_INFINITY)
    maxWidthOrHeight: 200,   // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
    // optional, a function takes one progress argument (percentage from 0 to 100) 
    useWebWorker: true,      // optional, use multi-thread web worker, fallback to run in main-thread (default: true)

    // following options are for advanced users
    maxIteration: 2,       // optional, max number of iteration to compress the image (default: 10)
    exifOrientation: 1,    // optional, see https://stackoverflow.com/a/32490603/10395024
    initialQuality: 1      // optional, initial quality value between 0 and 1 (default: 1)
}

export default Compressor = async (event) => {
    return (
        <View>
            <Input
                type="file"
                onChange={await handleImageUpload(event)}
            />
        </View>
    );
}

const handleImageUpload = async (event) => {

    fetch(myRequest)
        .then(response => response.blob())
        .then(function (myBlob) {
            var objectURL = URL.createObjectURL(myBlob);
            imageFile.src = objectURL;
        });

    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }
    try {
        const compressedFile = await imageCompression(imageFile, options);
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
        console.log(error);
    }

}