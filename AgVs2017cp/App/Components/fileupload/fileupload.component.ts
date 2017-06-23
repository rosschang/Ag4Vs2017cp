import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common'; 

import { Global } from '../../Shared/global'; // to move to service.

@Component({
  selector: 'app-fileupload',
  templateUrl: 'app/components/fileupload/fileupload.component.html',
  styleUrls: ['app/components/fileupload/fileupload.component.css']
})

export class FileuploadComponent implements OnInit {

    private _file: File;
    public url: string;
    headers: Headers; // not used
    upFrm: FormGroup;

    constructor(public http: Http, private fb: FormBuilder) {
        console.log('file upload Initialized');
        //set the header as multipart        
        this.headers = new Headers();
        this.headers.set('Content-Type', 'multipart/form-data'); // not used
        this.url = Global.FileUpload;
    }

    ngOnInit() {
        this.upFrm = this.fb.group({
            File: ['']
        });
    }

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

    onSubmit(formData: any) {

        //let file: File = formData.controls.File;
        //formData.append('uploadFile', file, file.name);

        let fd: FormData = new FormData();
        fd.append('uploadFile', this._file, this._file.name);

        this.http.post('api/FileUpload', fd, { headers: new Headers() })
            .map(res => res.json())
            .catch(this.handleError)
            .subscribe(
                data => console.log('success'),
                error => console.log(error)
            );

        console.log('file upload submit called.');
    }

    fileChange(event: any) {
        debugger;
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            this._file = file;
            let formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            //let headers = new Headers()
            //headers.append('Content-Type', 'json');  
            //headers.append('Accept', 'application/json');  
            //let options = new RequestOptions({ headers: headers });
            let apiUrl1 = "api/FileUpload";
            this.http.post(apiUrl1, formData, { headers: new Headers() })
                .map(res => res.json())
                .catch(error => Observable.throw(error))
                .subscribe(
                    data => console.log('success'),
                    error => console.log(error)
                )
        }
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
