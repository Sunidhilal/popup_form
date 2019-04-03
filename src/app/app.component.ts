import { Component, OnInit } from '@angular/core';
import {Popup} from 'ng2-opd-popup';
import {NgModule} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  public show:boolean=false;
  form:FormGroup;
  submitted=false;
  loading=false;
  isDisabled1=true;
  isDisabled2=true;
  isChecked:boolean=false;
  WebsiteName: any;
  public hitCancel:boolean=false;
  
  constructor(private popup:Popup,private formbuilder:FormBuilder, private http: HttpClient){}
 
  checkEmpty() {
     if (this.WebsiteName)
        this.isDisabled2=false;
}
cancelButton()
{
   this.hitCancel=true;
}
register(){
  let options={
    headers: new HttpHeaders().set('Content-Type', 'application/JSON')
  };
}
onSubmit = function (user: any) {
  console.log(user);
 // var obj = JSON.parse(user);
  //console.log(obj);
  this.http.post("http://10.12.10.134:8080/cookies", user).subscribe();
  
  //this.http.post('http://localhost:4200', user);
}
  ToggleButton1(){
     this.isChecked=!(this.isChecked);
     console.log(this.isChecked);
     if(this.isChecked==true)
       this.isDisabled1=false;
     if(this.isChecked==false)
       this.isDisabled1=true;
   }
   toggle(){
     this.show=!this.show;
   }
    ClickButton(){
      this.popup.options={
        header:"Add Website",
        showButtons: false,
      }
      this.popup.show();
      this.popup.show(this.popup.options);
    }
  ngOnInit(){
    this.register();
    var h:boolean;
    if(this.isChecked==true)
       h=true;
     else
       h=false;
       console.log(h);
    this.form=this.formbuilder.group({
      domain: ['', Validators.required],
      //org: ['', Validators.required],
      pages:[ Validators.required]
    });
    
  }
}