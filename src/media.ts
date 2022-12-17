import debug from "./debug";
const jsonToString = require('util').inspect

export const requestUserMediaStream = async (callback) => {

    var deviceInfo = await navigator.mediaDevices.enumerateDevices()
    var deviceList = new Array<[key: string, value: any]>();

    deviceInfo.forEach(value => {
        debug.log("Devices", value.label);
        var struct = {
            id: {
                device: value.deviceId,
                group: value.groupId,
            },
            title: value.label,
            type: value.kind,
            data: value.toJSON(),
        }
        deviceList.push([struct.title, struct]);
    });

    const streamList = deviceList.map(async device => {
        const [key, value] = device;
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                // mediaSource: "screen",
                deviceId: value.id.device,
            } as MediaTrackConstraints,
        } as MediaStreamConstraints);
        return stream;
        //.then(mediaStream => callback(mediaStream) && mediaStream)
        //.catch(e => debug.error('MediaStream', e.toString()) && console.error(e.toString()))
    });

    return streamList;
};