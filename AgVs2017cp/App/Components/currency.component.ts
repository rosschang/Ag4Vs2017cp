import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { CurrencyService } from '../Service/currency.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ICurrency } from '../Models/currency';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/observable/throw';

import { Global } from '../Shared/global';

@Component({
    templateUrl: 'app/components/currency.component.html',
    providers: [CurrencyService]
})

export class CurrencyComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    currencies: ICurrency[];
    currency: ICurrency;
    msg: string;
    indLoading: boolean = false;
    ccyFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _currencyService: CurrencyService) { }

    ngOnInit(): void {

        this.ccyFrm = this.fb.group({
            CurrencyId: [''],
            CurrencyCode: ['', Validators.required],
            CurrencyName: ['', Validators.required],
            DayCount: [''],
            Multiplier: [''],
            IsActive: [false]
        });

        this.LoadCurrency();

    }

    LoadCurrency(): void {
        this.indLoading = true;
        this._currencyService.get(Global.CcyGet)
            .subscribe(ccy => { this.currencies = ccy; this.indLoading = false; },
            error => this.msg = <any>error);

    }

    addCurrency() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Currency";
        this.modalBtnTitle = "Add";
        this.ccyFrm.reset();

        this.modal.open();
    }

    editCurrency(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Currency";
        this.modalBtnTitle = "Update";

        this.currency = this.currencies.filter(x => x.CurrencyId == id)[0];
        //this.ccyFrm.setValue(this.currency);
        this.ccyFrm.patchValue({ CurrencyId: this.currency.CurrencyId });
        this.ccyFrm.patchValue({ CurrencyCode: this.currency.CurrencyCode });
        this.ccyFrm.patchValue({ CurrencyName: this.currency.CurrencyName });
        this.ccyFrm.patchValue({ DayCount: this.currency.DayCount });
        this.ccyFrm.patchValue({ Multiplier: this.currency.Multiplier });
        this.ccyFrm.patchValue({ IsActive: this.currency.IsActive });

        this.modal.open();
    }

    deleteCurrency(id: number) {
        //this.dbops = DBOperation.delete;
        //this.SetControlsState(false);
        //this.modalTitle = "Confirm to Delete?";
        //this.modalBtnTitle = "Delete";
        //this.user = this.users.filter(x => x.Id == id)[0];
        //this.userFrm.setValue(this.user);
        //this.modal.open();
    }


    SetControlsState(isEnable: boolean) {
        isEnable ? this.ccyFrm.enable() : this.ccyFrm.disable();
    }

    onSubmit(formData: any) {
        this.msg = "";
        var abc: any;

        switch (this.dbops) {
            case DBOperation.create:
                // Add New
                this._currencyService.post(Global.CcyAdd, formData._value)
                    .subscribe(
                        data => {
                            if (data == 1) {
                                this.msg = "Successfully Added";
                                this.LoadCurrency();
                            }
                            else {
                                this.msg = "Effected Records are " + data + " instead.";
                            }
                            abc = data;
                        },
                        error => {
                            this.msg = error; // need import 'rxjs/add/observable/throw';
                        }
                    );
                break;
            case DBOperation.update:
                this._currencyService.put(Global.CcyEdit, formData._value.CurrencyId, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadCurrency();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                // Delete
                break;
        }
    }
}