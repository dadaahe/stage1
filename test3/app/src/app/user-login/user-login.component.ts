import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit{
  signupUsers: any[] = [];
  signupObj:any = { 
    userName: '',
    email:'',
    password:''
  };
  loginObj: any = {
    userName:'',
    Password: ''
  };
  
  constructor( ) {}
ngOnInit(): void {
  const localData = localStorage.getItem(('signUpUsers'));
  if((localData !=  null)) {
    this.signupUsers = JSON.parse(localData);
  }
}
onsignup(){
  this.signupUsers.push(this.signupObj);
  localStorage.setItem('signupUsers',JSON.stringify(this.signupUsers));
  this.signupObj = {
    userName: '',
    email:'',
    password:''
  }
}
onlogin(){
  debugger
const isUserExist = this.signupUsers.find(m => m.userName == this.loginObj.userName && m.password == this.loginObj.password);
if(isUserExist != undefined) {
  alert('user login successfully');
}else {
alert('Wrong Credentials');
}
  
}
}
