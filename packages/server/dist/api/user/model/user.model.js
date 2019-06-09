"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("typegoose");
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "ROLE_USER";
    UserRole["ADMIN"] = "ROLE_ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class User extends typegoose_1.Typegoose {
    constructor() {
        super(...arguments);
        this.roles = [UserRole.USER];
    }
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typegoose_1.prop({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typegoose_1.arrayProp({
        items: String,
        enum: UserRole,
        default: [UserRole.USER],
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
exports.User = User;
exports.USER_PUBLIC_FIELDS = {
    email: 1,
    roles: 1,
};
exports.USER_SECURE_FIELDS = {
    email: 1,
    roles: 1,
    password: 1,
};
