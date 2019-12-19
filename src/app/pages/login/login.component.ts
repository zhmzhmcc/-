import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isTemplateRef, NzMessageService } from 'ng-zorro-antd';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from './login.type'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDataService } from '../welcome/user-data.service';
// import * as Mock from 'mockjs';


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
  
  
    //{
    //   "code": 1,
    //   "msg": "请求接口成功",
    //   "data|20": [
    //     {
    //       'id|+1': 1,
    //       'name': '@cname',
    //       'status': 0,



    //     }
    //]
    //}

  listOfTagOptions: '请选择';
  code = '23tb';
  flaga: boolean = false;
  // flagb: boolean = true;
  form = [];
  selectedValue: any;
  selectedValuebase: any;
  selectedValuesubject: any;
  // genderChange(e) {
  //   console.log(e);
  // };
  loginForm: FormGroup;

  yzmcode: string;
  assd = "";
  applyMajorList: any;
  provinceTextList: any;
  singlePro: any;
  basename: any;
 
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
      const { provincename, basename, subjectname, password, yzmcode } = loginForm.value;
      const loginParams = {
        provincename,
        basename,
        subjectname,
        password,
        yzmcode
      }
      // const args={
      //   "cityCode":provincename,
      //   "baseCode":basename,
      //   "majorCode":subjectname,
      //   "password": "000000"
      // }
     const args= {
        "cityCode": provincename,
        "baseCode": basename,
        "majorCode": subjectname,
        "password": '000000',
      }
  
      //登陆
      this.http.post('/api/loginXY',args,{ 
        headers: new HttpHeaders({'Content-Type': 'text/plain; charset=UTF-8'}), 
        responseType: "text"
      }).subscribe((res)=>{
        const data = JSON.parse(decodeURIComponent(res));
        const datas=JSON.parse(data.serviceResult);
        console.log(datas);
        // console.log(typeof(JSON.parse(datas)));  
        if(datas.status==0){
          this.message.create('error',datas.message,{
            nzDuration: 2000, 
            nzPauseOnHover: true,
            nzAnimate: true,
          });
        }else{
          const loginFormVal=loginForm.value;
           console.log(loginFormVal);
           window.localStorage['userMajor']=loginFormVal.subjectname
           
          this.route.navigate(['/welcome/userinfo']);
           
        }

  
      })
  
       console.log('验证成功', loginParams);
      
      
      
      //const Random = Mock.Random;
      // this.http.get('http://localhost:8080/getData').subscribe(
      //   (res) => {
      //     console.log(res);

      //   })
    }

  }
  constructor(private fb: FormBuilder, private route: Router, private http: HttpClient, private message: NzMessageService,private serve:UserDataService
  ) { }
  ngOnInit(): void {
    
    // this.http.post('/api/user3/login',{
    //   params:{
    //     login:'1874403800',
    //     pwd:'000000'

    //   }
    // }).subscribe((res)=>{
    //   console.log(res)

    // })
    
    this.http.get("../../assets/dynamicData/applyMajor.json").subscribe((res) => {
      this.applyMajorList = res['classify']
      console.log(this.applyMajorList);

    })
    this.http.get("../../assets/dynamicData/trainBase.json").subscribe((res) => {
      this.provinceTextList = res['province_list']
      //console.log(this.provinceTextList);

    })
    this.http.get("../../assets/dynamicData/trainBase.json").subscribe((res)=>{
      this.basename=res["city_list"]
    })
    this.createSecurityCode();
    this.loginForm = this.fb.group({
      provincename: [null, [Validators.required]],
      basename: [null, [Validators.required]],
      subjectname: [null, [Validators.required]],
      password: [null, [Validators.required]],
      yzmcode: [null, [Validators.required]],
      remember: [true]
    });
    console.log('验证成功', this.loginForm.value);
    
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
  toggle(activeNumber: number) {
    this.loginchoice = this.loginchoice.map((item, index) => {
      return {
        ...item,
        active: activeNumber === index,
      }
    })


    // if (activeNumber == 0) {
    //   this.flaga = false;
    //   // this.flagb = true;
    // } else {
    //   // this.flagb = false;
    //   this.flaga = true;
    // }
    // this.flaga = !this.flaga;
    // this.flagb = !this.flagb;





  }
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

