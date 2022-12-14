import { Config } from "./global";

export async function logMessage(origin: string, message: string)
{
    var request = await fetch((Config.debug.ssl ? "https://" : "http://") + Config.debug.host + ':' + Config.debug.port + '/'
        + '?time=' + encodeURIComponent(`${Date.now()}`)
        + '&subject=' + encodeURIComponent(`${origin}`)
        + '&message=' + encodeURIComponent(`${message}`)
        + '&type=' + encodeURIComponent(`${origin}`), {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Header": "*"
            }
        });
    return request;
};

export async function logError(origin: string, message: string) {
    return await logMessage(origin, message);
}

var debug = { log: logMessage, error: logError };

export default debug;