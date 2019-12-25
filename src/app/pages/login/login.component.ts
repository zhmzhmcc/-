import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isTemplateRef, NzMessageService } from 'ng-zorro-antd';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from './login.type'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDataService } from '../welcome/user-data.service';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
// import * as Mock from 'mockjs';
import { NzModalService } from 'ng-zorro-antd';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  netconfFlagCtrl: any;
  loginchoice: any = [
    { name: '考试', active: true },
    { name: '测试', active: false }
  ];
  flag:boolean = true;
  listOfTagOptions: '请选择';
  code = '23tb';
  flaga: boolean = false;
  form = [];
  selectedValue: any;
  selectedValuebase: any;
  selectedValuesubject: any;
  loginForm: FormGroup;
  yzmcode: string;
  assd = "";
  applyMajorList: any;
  provinceTextList: any;
  cityTextList:any;
  singlePro: any;
  basename: any;
  cityname: any;
  schoolTextList: any;
  provinceTextListData: any;
  schoolTextListdata: any;
  registerForm: FormGroup;
  registerpsd:any;
  registerrespsd: any;

  submitForm(): void {
    const loginForm = this.loginForm
    const { controls } = loginForm
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    if (!loginForm.valid) {
      this.message.info('请填写完整信息', {
        nzDuration: 1000, 
        nzPauseOnHover: true,
        nzAnimate: true
      })
      return

    }
    if (this.yzmcode.toLowerCase() != this.code.toLowerCase()) {
      this.message.info("验证码不对",{
        nzDuration: 1000, 
        nzPauseOnHover: true,
        nzAnimate: true
      })

    } else if(!this.yzmcode){
      this.message.info("请输入验证码",{
        nzDuration: 1000, 
        nzPauseOnHover: true,
        nzAnimate: true
      })

    }
    else{
      // sss
      // console.log('验证成功', loginForm.value);
      const {loginusername,loginpassword,yzmcode  } = loginForm.value;
      const loginParams = {
        loginusername,
        loginpassword,
        yzmcode
      }
      
     const args= {
        "loginusername":loginusername,
        "password": '000000',
      }
      const loginFormVal=loginForm.value;
      console.log(loginFormVal);
      window.localStorage['userMajor']=loginFormVal.loginusername
      this.route.navigate(['/welcome/userinfo']);
           
  
      //登陆
      // this.http.post('/api/loginXY',args,{ 
      //   headers: new HttpHeaders({'Content-Type': 'text/plain; charset=UTF-8'}), 
      //   responseType: "text"
      // }).subscribe((res)=>{
      //   const data = JSON.parse(decodeURIComponent(res));
      //   const datas=JSON.parse(data.serviceResult);
      //   console.log(datas);
      //   // console.log(typeof(JSON.parse(datas)));  
      //   if(datas.status==0){
      //     this.message.create('error',datas.message,{
      //       nzDuration: 2000, 
      //       nzPauseOnHover: true,
      //       nzAnimate: true,
      //     });
      //   }else{
      //     const loginFormVal=loginForm.value;
      //      console.log(loginFormVal);
      //      window.localStorage['userMajor']=loginFormVal.subjectname
      //     this.route.navigate(['/welcome/userinfo']);
           
      //   }  
      // })
     
      //const Random = Mock.Random;
      // this.http.get('http://localhost:8080/getData').subscribe(
      //   (res) => {
      //     console.log(res);

      //   })
    }

  }
  registersubmitForm():void{
    const registerForm = this.registerForm
    const { controls } = registerForm
    console.log(registerForm)
    // for (const i in this.registerForm.controls) {
    //   this.loginForm.controls[i].markAsDirty();
    //   this.loginForm.controls[i].updateValueAndValidity();
    // }
    if (!registerForm.valid) {
      this.message.info('请填写完整信息', {
        nzDuration: 1000, 
        nzPauseOnHover: true,
        nzAnimate: true
      })
      return
    }
    if (this.registerpsd != this.registerrespsd) {
      this.message.error("两次输入密码不正确",{
        nzDuration: 1000, 
        nzPauseOnHover: true,
        nzAnimate: true
      })

    }else{
      this.modelService.info({
        nzTitle: '提示',
        nzContent: "注册成功",
        nzOnOk:()=>{
          //this.route.navigate(['/login'])
        }
      })
      
      this.flag=true
    }


  }
  constructor(private fb: FormBuilder, private route: Router, private http: HttpClient, 
    private message: NzMessageService,private serve:UserDataService , private modelService:NzModalService
  ) { }
  ngOnInit(): void {
    this.http.get("../../assets/dynamicData/applyMajor.json").subscribe((res) => {
      this.applyMajorList = res['classify']
    })
    this.http.get("../../assets/dynamicData/trainBase.json").subscribe((res)=>{
      this.provinceTextList= res['province_list'];
      this.cityTextList=res["city_list"];
      this.schoolTextListdata=res["school_list"][0];
      this.schoolTextList=this.schoolTextListdata['131000'];
    })
    this.createSecurityCode();
    this.loginForm = this.fb.group({
      loginusername: [null, [Validators.required]],
      loginpassword: [null, [Validators.required]],
      yzmcode: [null, [Validators.required]],
    });
    this.registerForm = this.fb.group({
      provincename:[null, [Validators.required]],
      cityname:[null, [Validators.required]],
      schoolname:[null, [Validators.required]],
      registername:[null, [Validators.required]],
      registerpassword:[null, [Validators.required]],
      registerrepassword:[null, [Validators.required]]

    })
    console.log('验证成功', this.registerForm.value);
    
    //let form = document.getElementsByClassName("loginForm");//添加到body里面才可以应用
    ///$(document).append(this.form)  
    //console.log(this.loginchoice)
    
    // var arr = [];
    // for (let i in this.classify) {
    //   var o = {};
    //   o[i] = this.classify[i];
    //   arr.push(o);
    // }
   // var jsonStr11 = JSON.stringify(arr)//json数组转化成json字符串
    //console.log(jsonStr11);

  }
  //注册
  LoginRegister(){
    this.flag = false;
  }
  //选择城市改变学校
  cityChange(e){
     this.schoolTextList = this.schoolTextListdata[e]
  }
  toggle(activeNumber: number) {
    this.loginchoice = this.loginchoice.map((item, index) => {
      return {
        ...item,
        active: activeNumber === index,
      }
    })
  }
  //获取验证码
  createSecurityCode() {
    this.code = "";
    var len = 4;
    var chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
      'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
      'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    for (var i = 0; i < len; i++) {
      var index = Math.floor(62 * Math.random());
      this.code = this.code + "" + chars[(index)];
    }
  }
 



}

