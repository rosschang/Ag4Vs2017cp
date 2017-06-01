"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global = (function () {
    function Global() {
    }
    return Global;
}());
Global.BASE_USER_ENDPOINT = 'api/userapi/'; // original from guide.
// added below to try attribute routing on API end.
Global.UserGet = 'api/user/';
Global.UserAdd = 'api/user/add/';
Global.UserEdit = 'api/user/edit/';
Global.UserDelete = 'api/user/delete/';
exports.Global = Global;
//# sourceMappingURL=global.js.map