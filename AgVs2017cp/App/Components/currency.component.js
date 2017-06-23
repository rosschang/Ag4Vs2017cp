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
var core_1 = require("@angular/core");
var currency_service_1 = require("../Service/currency.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
require("rxjs/add/observable/throw");
var global_1 = require("../Shared/global");
var CurrencyComponent = (function () {
    function CurrencyComponent(fb, _currencyService) {
        this.fb = fb;
        this._currencyService = _currencyService;
        this.indLoading = false;
    }
    CurrencyComponent.prototype.ngOnInit = function () {
        this.ccyFrm = this.fb.group({
            CurrencyId: [''],
            CurrencyCode: ['', forms_1.Validators.required],
            CurrencyName: ['', forms_1.Validators.required],
            DayCount: [''],
            Multiplier: [''],
            IsActive: [false]
        });
        this.LoadCurrency();
    };
    CurrencyComponent.prototype.LoadCurrency = function () {
        var _this = this;
        this.indLoading = true;
        this._currencyService.get(global_1.Global.CcyGet)
            .subscribe(function (ccy) { _this.currencies = ccy; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    CurrencyComponent.prototype.addCurrency = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Currency";
        this.modalBtnTitle = "Add";
        this.ccyFrm.reset();
        this.modal.open();
    };
    CurrencyComponent.prototype.editCurrency = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Currency";
        this.modalBtnTitle = "Update";
        this.currency = this.currencies.filter(function (x) { return x.CurrencyId == id; })[0];
        //this.ccyFrm.setValue(this.currency);
        this.ccyFrm.patchValue({ CurrencyId: this.currency.CurrencyId });
        this.ccyFrm.patchValue({ CurrencyCode: this.currency.CurrencyCode });
        this.ccyFrm.patchValue({ CurrencyName: this.currency.CurrencyName });
        this.ccyFrm.patchValue({ DayCount: this.currency.DayCount });
        this.ccyFrm.patchValue({ Multiplier: this.currency.Multiplier });
        this.ccyFrm.patchValue({ IsActive: this.currency.IsActive });
        this.modal.open();
    };
    CurrencyComponent.prototype.deleteCurrency = function (id) {
        //this.dbops = DBOperation.delete;
        //this.SetControlsState(false);
        //this.modalTitle = "Confirm to Delete?";
        //this.modalBtnTitle = "Delete";
        //this.user = this.users.filter(x => x.Id == id)[0];
        //this.userFrm.setValue(this.user);
        //this.modal.open();
    };
    CurrencyComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.ccyFrm.enable() : this.ccyFrm.disable();
    };
    CurrencyComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        var abc;
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                // Add New
                this._currencyService.post(global_1.Global.CcyAdd, formData._value)
                    .subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Successfully Added";
                        _this.LoadCurrency();
                    }
                    else {
                        _this.msg = "Effected Records are " + data + " instead.";
                    }
                    abc = data;
                }, function (error) {
                    _this.msg = error; // need import 'rxjs/add/observable/throw';
                });
                break;
            case enum_1.DBOperation.update:
                this._currencyService.put(global_1.Global.CcyEdit, formData._value.CurrencyId, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully updated.";
                        _this.LoadCurrency();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                // Delete
                break;
        }
    };
    return CurrencyComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], CurrencyComponent.prototype, "modal", void 0);
CurrencyComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/components/currency.component.html',
        providers: [currency_service_1.CurrencyService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, currency_service_1.CurrencyService])
], CurrencyComponent);
exports.CurrencyComponent = CurrencyComponent;
//# sourceMappingURL=currency.component.js.map