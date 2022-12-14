const express = require('express');
const jsonString = require("util").inspect;

const { Endpoint, _Middleware, _Sessions } = require("./index.d.js");

class Serverless
{

    app = new Object({});
    sessions = new Array({});
    port = new Number("80");

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
        return this;
    }

}

module.exports = ({
    default: new Serverless().app,
    api: module.exports.default,
})