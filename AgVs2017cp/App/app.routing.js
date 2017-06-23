"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./components/home.component");
var user_component_1 = require("./components/user.component");
var currency_component_1 = require("./components/currency.component");
var fileupload_component_1 = require("./Components/fileupload/fileupload.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'user', component: user_component_1.UserComponent },
    { path: 'currency', component: currency_component_1.CurrencyComponent },
    { path: 'fileupload', component: fileupload_component_1.FileuploadComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map