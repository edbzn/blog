"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rx_http_request_1 = require("@akanass/rx-http-request");
const operators_1 = require("rxjs/operators");
const config_1 = require("../../../config");
exports.getTweetsEffect$ = req$ => req$.pipe(operators_1.mergeMap(_ => {
    const oauth = config_1.Config.twitter.oAuth;
    const headers = {
        'Content-Type': 'application/json',
    };
    return rx_http_request_1.RxHR.get(config_1.Config.twitter.baseUrl, {
        json: true,
        qs: {
            from: config_1.Config.twitter.fromUserName,
            exclude: 'replies',
            count: 5,
        },
        headers,
        oauth,
    });
}));
