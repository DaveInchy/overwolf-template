
const express = require('express');

const fs = require('fs');
const path = require('path');
const { ServerResponse, ClientRequest } = require('http');

const jsonString = require("util").inspect;

const { Endpoint } = require("./index.d.js");

class Serverless
{

    app = new Object({});
    sessions = new Array({});
    port = new Number("80");
    api = new express.Router();
    cdn = new express.Router();

    routes = [
        new Endpoint({
            route: '/:file',
            callback: (req = Request, res = Response) => {
                fs.readFile(
                    path.resolve(__dirname, './index.html'), {
                        "encoding": "utf8"
                    }
                ).then((file) => {
                    res.send(file);
                })
            },
            isCDN: true,
        })
    ];

    constructor() {

        setup();

        middleware();

        endpoints();

        finalize();

        return this.app;
    }

    setup = () => {
        this.app = express();
        return this;
    }

    finalize = () => {
        this.app.listen(this.port);
        return this;
    }

    middleware = () => {
        return this;
    }

    endpoints = () => {

        var apiEndpoints = this.routes.map(v, i, a => v.isAPI && a[i] || v);
        var cdnEndpoints = this.routes.map(v, i, a => v.isCDN && a[i] || v);

        apiEndpoints.forEach(endpoint => {
            this.api.use(endpoint.route, endpoint.callback);
        })

        cdnEndpoints.forEach(endpoint => {
            this.cdn.use(endpoint.route, endpoints.callback)
        })

        this.app.use('api/', this.api);
        this.app.use('cdn/', this.cdn);

        return this;
    }

}

module.exports = ({
    default: new Serverless().app,
    api: module.exports.default,
})