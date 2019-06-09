"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const uuid = __importStar(require("uuid"));
const config_1 = require("../config");
const mongoose = require('mongoose');
var Database;
(function (Database) {
    const { urlMain, urlTest } = config_1.Config.db;
    const onOpen = () => {
        console.info(chalk_1.default.green('[database] connected'));
    };
    const onError = (error) => {
        console.error(chalk_1.default.red(`[database] connection error: ${error.message}`));
        process.exit();
    };
    Database.connect = () => mongoose
        .connect(urlMain, { useNewUrlParser: true })
        .then(onOpen)
        .catch(onError);
    Database.connectTest = () => mongoose.connect(urlTest + '/' + uuid.v4(), { useNewUrlParser: true });
    Database.disconnect = () => mongoose.disconnect();
    Database.drop = () => mongoose.connection.dropDatabase();
})(Database = exports.Database || (exports.Database = {}));
