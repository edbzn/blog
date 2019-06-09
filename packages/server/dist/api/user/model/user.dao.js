"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const user_model_1 = require("./user.model");
var UserDao;
(function (UserDao) {
    UserDao.model = new user_model_1.User().getModelForClass(user_model_1.User, {
        schemaOptions: { timestamps: true },
    });
    UserDao.create = (payload) => {
        const user = new user_model_1.User();
        user.email = payload.email;
        user.password = payload.password;
        user.firstName = payload.firstName;
        user.lastName = payload.lastName;
        return rxjs_1.from(UserDao.model.create(user));
    };
    UserDao.findByEmail = (email) => rxjs_1.from(UserDao.model
        .findOne({ email })
        .select(user_model_1.USER_SECURE_FIELDS)
        .exec());
    UserDao.findById = (id) => rxjs_1.from(UserDao.model
        .findById(id)
        .select(user_model_1.USER_PUBLIC_FIELDS)
        .exec());
    UserDao.findAllPublic = () => rxjs_1.from(UserDao.model
        .find()
        .select(user_model_1.USER_PUBLIC_FIELDS)
        .exec());
})(UserDao = exports.UserDao || (exports.UserDao = {}));
