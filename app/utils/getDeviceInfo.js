import Constants from 'expo-constants';

export const getDeviceInfo = async () => {
    let deviceJSON= {};
    deviceJSON.deviceName = Constants.deviceName;
    deviceJSON.deviceId = Constants.deviceId;
    deviceJSON.appversion = Constants.nativeAppVersion;
    deviceJSON.deviceType = Constants.platform;
    deviceJSON.sessionId = Constants.sessionId;
    return deviceJSON;
}