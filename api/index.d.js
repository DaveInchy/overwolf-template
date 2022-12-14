const jsonString = require("util").inspect;

/* @type Middleware({ route, callback [, isAPI, isCDN ]})
 * * * * * * * * * */

/* @type Endpoint({ route, callback [, isAPI, isCDN ]})
 * * * * * * * * * */
class Endpoint {
    constructor({ route, callback, isAPI = true, isCDN = false }) {

        const endpoint = new Object({
            "api": isAPI && !isCDN ? isAPI : isCDN,
            "cdn": isCDN && !isAPI ? isCDN : isAPI,
            "route": route?.toString(),
            "function": callback,
        });

        console.log(`[Endpoint]`, `Created endpoint:`);
        console.log(`[Endpoint]`, `${jsonString(endpoint)}`)

        return endpoint;
    }
}

/* @type Session({ route, callback [, isAPI, isCDN ]})
 * * * * * * * * * */

module.exports = ({
    Endpoint: Endpoint,
})