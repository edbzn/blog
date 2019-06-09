"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const chalk_1 = __importDefault(require("chalk"));
const http_1 = require("http");
const config_1 = require("../config");
var Server;
(function (Server) {
    const { host, port } = config_1.Config.server;
    const onListen = () => {
        console.info(chalk_1.default.green('[server] running'), `@ http://${host}:${port}/`);
    };
    const onClose = () => {
        console.info(chalk_1.default.green(`[server] stopped`));
    };
    const onError = (error) => {
        console.error(chalk_1.default.red('[server] failed'), error.message);
    };
    Server.create = (httpListener) => __awaiter(this, void 0, void 0, function* () {
        const httpListenerWithContext = httpListener.run(core_1.createContext());
        http_1.createServer(httpListenerWithContext)
            .listen(port)
            .on('close', onClose)
            .on('error', onError)
            .on('listening', onListen);
    });
})(Server = exports.Server || (exports.Server = {}));
