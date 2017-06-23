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
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var Observable_1 = require("rxjs/Observable");
var global_1 = require("../../Shared/global"); // to move to service.
var FileuploadComponent = (function () {
    function FileuploadComponent(http, fb) {
        this.http = http;
        this.fb = fb;
        console.log('file upload Initialized');
        //set the header as multipart        
        this.headers = new http_1.Headers();
        this.headers.set('Content-Type', 'multipart/form-data'); // not used
        this.url = global_1.Global.FileUpload;
    }
    FileuploadComponent.prototype.ngOnInit = function () {
        this.upFrm = this.fb.group({
            File: ['']
        });
    };
    //onclick file listener
    //onFileUploadClick(event: any): void {
    //    this.postFile(event.target);
    //    event.preventDefault();
    //}
    //send post file to server 
    //postFile(inputValue: any): void {
    //    var formData = new FormData();
    //    formData.append("name", "Name");
    //    formData.append("file", inputValue.files[0]);
    //    this.http.post(this.url, formData,
    //        {
    //            headers: this.headers
    //        });
    //}
    // api/FileUpload and api/Upload2
    FileuploadComponent.prototype.onSubmit = function (formData) {
        //let file: File = formData.controls.File;
        //formData.append('uploadFile', file, file.name);
        var fd = new FormData();
        fd.append('uploadFile', this._file, this._file.name);
        this.http.post('api/FileUpload', fd, { headers: new http_1.Headers() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError)
            .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
        console.log('file upload submit called.');
    };
    FileuploadComponent.prototype.fileChange = function (event) {
        debugger;
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            this._file = file;
            var formData = new FormData();
            formData.append('uploadFile', file, file.name);
            //let headers = new Headers()
            //headers.append('Content-Type', 'json');  
            //headers.append('Accept', 'application/json');  
            //let options = new RequestOptions({ headers: headers });
            var apiUrl1 = "api/FileUpload";
            this.http.post(apiUrl1, formData, { headers: new http_1.Headers() })
                .map(function (res) { return res.json(); })
                .catch(function (error) { return Observable_1.Observable.throw(error); })
                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
        }
    };
    FileuploadComponent.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return FileuploadComponent;
}());
FileuploadComponent = __decorate([
    core_1.Component({
        selector: 'app-fileupload',
        templateUrl: 'app/components/fileupload/fileupload.component.html',
        styleUrls: ['app/components/fileupload/fileupload.component.css']
    }),
    __metadata("design:paramtypes", [http_1.Http, forms_1.FormBuilder])
], FileuploadComponent);
exports.FileuploadComponent = FileuploadComponent;
//# sourceMappingURL=fileupload.component.js.map