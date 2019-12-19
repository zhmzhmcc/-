import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { UserDataService } from '../user-data.service';
import * as Mock from 'mockjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemData } from '../../login/login.type';
import { Observable } from 'rxjs';
import { NzMessageService, NzModalService, isTemplateRef } from 'ng-zorro-antd';
import { SaveTwoTone } from '@ant-design/icons-angular/icons/public_api';
import { cloneSVG } from '@ant-design/icons-angular';


@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  

  // 审核状态类型
  auditStatusTypes: any = [
    { 'code': "-1", "value": "请选择" },
    { 'code': "0", "value": "未审核" },
    { 'code': "1", "value": "审核通过" },
    { 'code': "2", "value": "审核不通过" },
  ];
  // 学历类型
  educationTypes: any = [
    { "value": '请选择', 'code': '-1' },
    { "value": '中专', 'code': '0' },
    { "value": '专科', 'code': '1' },
    { "value": '本科', 'code': '2' },
    { "value": '研究生', 'code': '3' }
  ];
  // 学员类型
  staffTypes: any = [
    { "value": '请选择', 'code': '-1' },
    { "value": '本单位住院医师', 'code': '0' },
    { "value": '外单位委托培养住院医师', 'code': '1' },
    { "value": '面向社会招收住院医师', 'code': '2' },
    { "value": '全日制硕士专业研究生', 'code': '3' },
    { "value": '其他人员', 'code': '4' }
  ];
  listOfData: any;
  subjectvalue: any = '-1';
  year = ['请选择', '2013', '2014', '2015', '2106', '2107', '2018', '2019'];
  record = ''
  usertype = ''
  yearvalue = "请选择"
  verifyalue = "请选择"
  recordvalue = "请选择"
  usertypevalue = "请选择"
  alltag: boolean = false;
  checkarry = [];
  flag: boolean = true;
  index: any;
  userdata: any;
  singleusername: any;
  singleusernubmer: any;
  singleuserIDnumber: any;
  singlebasename: any;
  singleproject: any;
  singleyearname: any;
  singleusertypename: any;
  isDowm: boolean = false;
  flagpass: boolean = false;
  flagnopass: boolean = false;
  mularry = new Array();
  basedata;
  validateForm: FormGroup;
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.checkAll(true);

      }

    }
  ];
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: ItemData[] = [];
  listOfAllData: ItemData[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  basedataAry: any;
  singlebasedataAry: any={};
  datas;
  pageIndex = 1;
  pageSize = 10;
  total = 50;
  singglebasedataAryid: any;
  state: any;
  multistr = [];
  multistring: any;
  applyMajorList: any;
  usernation: any;
  username: any;
  userSex: any="";
  userSexList: any;
  opFlag: any;
  data: any;
  noflag: any;
  

  constructor(private fb: FormBuilder, private route: Router,
    private http: HttpClient, private serve: UserDataService, 
    private message: NzMessageService, private modalService: NzModalService
  ) { }
  ngOnInit() {
    //var Mock=require('mock.js')
    console.log(this.basedataAry)
    //this.serve.getMajorData();
    //this.serve.getSexData();
    this.http.get('http://localhost:3000/datas').subscribe((res)=>{
              const userdatas=res['user']
              if (userdatas && Array.isArray(userdatas) && userdatas.length > 0){
                this.basedataAry=userdatas.map((item)=>{
                   const {state} = item; 
                   return {
                     ...item,
                     noflag: state == '0' ? false : state == '2' ? true : '',
                     flag: state == '0' ? false : state == '1' ? true : '',
                     passflag : state == '0' ? false : state == '1' ? true : '',
                     state : state == '0' ? '未审核': state == '1' ? '审核通过' : '审核未通过'
                   }
                })
              }
              this.flag=res['flag'];
              
       
    })
    // this.http.get('https://easy-mock.com/mock/5df307236fffb769a4b09fda/shnehe/userinfo').subscribe((res)=>{
    //   console.log(res)
    // })
    //默认加载
    // this.serve.shuju((res) => {
    //   this.opFlag=this.serve.opFlag;
    //   this.data=this.serve.data;
    //   if(this.opFlag){
    //     this.basedataAry = this.serve.basedataAry;
    //     this.total = this.serve.total;
        
    //   }else{
    //     this.modalService.error({
    //       nzTitle: '提示',
    //       nzContent:this.data.message,
    //       nzOnOk:()=>{
    //         this.route.navigate(['/login'])
    //       }
    //     });
        
    //   }
      
      
    // })
    this.validateForm =this.fb.group({
      userName: [null, [Validators.required]],
      userSex: [null, [Validators.required]],
      userNation: [null, [Validators.required]],
    })

   
  }
  //form表单
  saveBtnInfo(){
    
  }
  //翻页查询数据

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.serve.pagechangeshuju((res) => {
      this.basedataAry = this.serve.basedataAry;
      this.basedataAry.map(item => {
        this.mapOfCheckedId[item.id] = false
      })

    }, {
      "serviceNumber": "selectInformationAcquisitionPage",
      "args": {
        "trainmajor": "-1",
        "pageNo": this.pageIndex,
        "pageSize": this.pageSize,
        "baseCode": "-1"
      }
    })
  
   
  }
  //单个审核通过
  passinfo(i) {
    this.index = i;
    this.http.post('/api/servicesXY', {
      "serviceNumber": "examineInformationAcquisition",
      "args": {
        "ids": this.basedataAry[this.index].id
      }
    },
      {
        headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=UTF-8' }),
        responseType: "text"
      }).subscribe((res) => {
        var data = JSON.parse(decodeURIComponent(res));
        var datas = JSON.parse(data.serviceResult);
        console.log(datas);
        
        //var state = datas.status;
        //this.basedataAry[this.index].state= state;
        this.message.create('success', datas.message, {
          nzDuration: 2000,
          nzPauseOnHover: true,
          nzAnimate: true,
        });
        this.serve.pagechangeshuju((res)=>{
          this.basedataAry=this.serve.basedataAry;
          this.multistring=[];

        },{
          "serviceNumber": "selectInformationAcquisitionPage",
          "args": {
            "trainmajor": "-1",
            "pageNo": this.pageIndex,
            "pageSize": this.pageSize,
            "baseCode": "-1"
          }
        })


      })

  }
  //审核不通过
  nopassinfo(i){
   this.index=i;
   this.basedataAry[this.index].state='审核不通过'
   this.basedataAry[this.index].noflag=true
  }
  // nopassinfo(i) {
  //   this.index = i;
  //   console.log(this.basedataAry(this.index)) 
  //   this.http.post('/api/servicesXY', {
  //     "serviceNumber": "refuseExamineInformationAcquisition",
  //     "args": {
  //       "ids": this.basedataAry[this.index].id
  //     }
  //   },
  //     {
  //       headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=UTF-8' }),
  //       responseType: "text"
  //     }).subscribe((res) => {
  //       var data = JSON.parse(decodeURIComponent(res));
  //       var datas = JSON.parse(data.serviceResult);
  //       this.message.create('success', datas.message, {
  //         nzDuration: 2000,
  //         nzPauseOnHover: true,
  //         nzAnimate: true,
  //       });

  //       this.http.post('/api/servicesXY', {
  //         "serviceNumber": "selectInformationAcquisitionPage",
  //         "args": {
  //           "trainmajor": "-1",
  //           "pageNo": this.pageIndex,
  //           "pageSize": this.pageSize,
  //           "baseCode": "-1"
  //         }
  //       },
  //         {
  //           headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=UTF-8' }),
  //           responseType: "text"
  //         }).subscribe((res) => {
  //           var data = JSON.parse(decodeURIComponent(res));
  //           var datas = JSON.parse(data.serviceResult);
  //           this.datas = datas;
  //           let basedata = datas['page'].result;
  //           this.total = datas['page'].total;
  //           this.basedataAry = basedata;


  //           if (this.basedataAry && Array.isArray(this.basedataAry) && this.basedataAry.length > 0) {
  //             this.basedataAry = this.basedataAry.map(item => {

  //               const { state } = item;
  //               return {
  //                 ...item,
  //                 noflag: state == '0' ? false : state == '2' ? true : '',
  //                 flag: state == '0' ? false : state == '1' ? true : '',

  //                 state: state == '0' ? '未审核' : state == '1' ? '审核通过' : state == '2' ? '审核未通过' : '',
  //               }
  //             })
  //           }
  //         })


  //     })

  // }
  //所选单挑数据
  selectinfo(i) {
    let seltct = 0;
    this.index = i;
    this.basedataAry.forEach((data, index) => {
      if (i === index) {
        if (this.mapOfCheckedId[data.id] == true) {

          this.multistr.push(data.id);

        } else {
          this.multistr.splice(this.multistr.indexOf(data.id), 1);
        }
      }

    })

    console.log(this.multistr);

  }
  //所选审核不通过
  selectnopass() {
    this.multistring = this.multistr.join(",")
    if (this.multistring == '') {
      const modal = this.modalService.warning({
        nzTitle: '提示',
        nzContent: "请勾选要审核的信息！"
      });
    } else {
      this.http.post('/api/servicesXY', {
        "serviceNumber": "refuseExamineInformationAcquisition",
        "args": {
          "ids": this.multistring
        }
      },
        {
          headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=UTF-8' }),
          responseType: "text"
        }).subscribe((res) => {
          var data = JSON.parse(decodeURIComponent(res));
          var datas = JSON.parse(data.serviceResult);
          var datas = JSON.parse(data.serviceResult);
          this.modalService.error({
            nzTitle: '提示',
            nzContent: datas.message
          });
          //var state = datas.status;
          //this.basedataAry[this.index].state= state;
          this.serve.pagechangeshuju((res)=>{
            this.basedataAry=this.serve.basedataAry;
            this.multistring=[];

          },{
            "serviceNumber": "selectInformationAcquisitionPage",
            "args": {
              "trainmajor": "-1",
              "pageNo": this.pageIndex,
              "pageSize": this.pageSize,
              "baseCode": "-1"
            }
          })
        })
    }


  }

  //所选审核通过
  selectpass() {
    this.multistring = this.multistr.join(",")
    if (this.multistring == '') {
      const modal = this.modalService.warning({
        nzTitle: '提示',
        nzContent: "请勾选要审核的信息！"
      });
    } else {
      this.http.post('/api/servicesXY', {
        "serviceNumber": "examineInformationAcquisition",
        "args": {
          "ids": this.multistring
        }
      },
        {
          headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=UTF-8' }),
          responseType: "text"
        }).subscribe((res) => {
          var data = JSON.parse(decodeURIComponent(res));

          var datas = JSON.parse(data.serviceResult);
          this.modalService.success({
            nzTitle: '提示',
            nzContent: datas.message
          });
          this.serve.pagechangeshuju((res)=>{
            this.basedataAry=this.serve.basedataAry;
            this.multistring=[];

          },{
            "serviceNumber": "selectInformationAcquisitionPage",
            "args": {
              "trainmajor": "-1",
              "pageNo": this.pageIndex,
              "pageSize": this.pageSize,
              "baseCode": "-1"
            }
          })


        })
    }
  }
  //查询数据
  searchBtnInfo() {
  
    this.basedataAry=[]
    debugger
    this.http.get("../../assets/dynamicData/applyMajor.json").subscribe((res) => {
      this.applyMajorList = res['classify']
      console.log(this.applyMajorList);
  
    })
    this.http.post('/api/servicesXY', {
      "serviceNumber": "selectInformationAcquisitionPage",
      // "args": {
      //   "trainmajor": "-1",
      //   "pageNo": this.pageIndex,
      //   "pageSize": this.pageSize,
      //   "baseCode": "000000",
      //   "nowEducation":this.recordvalue,
      //   "staffType":this.usertypevalue,

      // }
      "args":{"baseValue":"全部",
      "baseCode":"000000",
      "trainmajor":this.subjectvalue,
      "joinBaseTime":null,"state":this.verifyalue,
      "nowEducation":this.recordvalue,
      "staffType":this.usertypevalue,
      "userNum":null,"nameOfCompanyUnit":null,
      "pageNo":1,"pageSize":10}    },
      {
        headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=UTF-8' }),
        responseType: "text"
      }).subscribe((res) => {
        var data = JSON.parse(decodeURIComponent(res));
        var datas = JSON.parse(data.serviceResult);
        console.log(datas);

        this.datas = datas;
        let basedata = datas['page'].result;
        this.total = datas['page'].total;
        this.basedataAry = basedata;
        this.multistr = [];

        if (this.basedataAry && Array.isArray(this.basedataAry) && this.basedataAry.length > 0) {
          this.basedataAry = this.basedataAry.map(item => {
            
            this.applyMajorList.map(data=>{
              if(item.trainmajor==data.code){
                console.log(data.text);
                item.trainmajor=data.text
              }
            })
            const { state } = item;
            const { stafftype } = item;
            const {noweducation}=item;
            return {
              ...item,
              noflag: state == '0' ? false : state == '2' ? true : '',
              flag: state == '0' ? false : state == '1' ? true : '',
              state: state == '0' ? '未审核' : state == '1' ? '审核通过' : state == '2' ? '审核未通过' : '',
              stafftype: stafftype == "0" ? '本单位住院医师' : stafftype == '1' ? '外单位委托培养住院医师' : stafftype == '2' ? '面向社会招收住院医师' : '',
              noweducation:noweducation=='0' ? '中专' : noweducation=='1' ?'专科' :noweducation=='2' ?'本科' :noweducation=='3' ?'研究生' :''

            }
          })
        }
      })

  }
  // currentPageDataChange($event): void {
  //   this. basedataAry= $event;
  //   this.refreshStatus();
  // }
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.basedataAry.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.basedataAry.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.basedataAry.forEach((item) => {
      if (this.mapOfCheckedId[item.id] = value) {
        this.multistr.push(item.id);
      }
    }
    );
    // this.refreshStatus();
  }
  //全部通过
  selectallpass() {
    this.multistring = this.multistr.join(",")
    if (this.multistring == '') {
      const modal = this.modalService.warning({
        nzTitle: '提示',
        nzContent: "请勾选要审核的信息！"
      });
    } else {


      this.http.post('/api/servicesXY', {
        "serviceNumber": "examineInformationAcquisition",
        "args": {
          "ids": this.multistring
        }
      },
        {
          headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=UTF-8' }),
          responseType: "text"
        }).subscribe((res) => {
          var data = JSON.parse(decodeURIComponent(res));
          var datas = JSON.parse(data.serviceResult);
          var datas = JSON.parse(data.serviceResult);
          this.modalService.success({
            nzTitle: '提示',
            nzContent: datas.message
          });
          this.serve.shuju((res) => {
            this.basedataAry = this.serve.basedataAry
            this.multistring = [];
            this.total = this.serve.total;
          })


        })
    }
  }
  checkall() {
    if (this.alltag == false) {
      this.alltag = true;
      this.listOfData.forEach((element) => {
        element.checked = true;
        this.mularry.push(element.id)

      })

    } else {
      this.listOfData.forEach((element) => {
        element.checked = false;
        this.alltag = false;
      })
    }

  }
  // currentPageDataChange($event: Array<{ id: number; name: string; age: number; address: string }>): void {
  //   this.listOfDisplayData = $event;
  //   this.refreshStatus();
  // }
  // refreshStatus(): void {
  //   this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
  //   this.isIndeterminate =
  //     this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  // }
  // selectShow(i) {

  //   this.index = i;
  //   this.listOfData.map((el, index) => {
  //     if (i === index) {
  //       el.checked = !el.checked;
  //     }
  //     if (el.checked == false) {
  //       this.alltag = false
  //     }

  //   })
  //   if (this.listOfData[this.index].checked == true) {
  //     this.mularry.push(this.listOfData[this.index].id)
  //     // console.log(this.listOfData[this.index]);

  //   } else {
  //     this.mularry.splice(this.mularry.indexOf(this.listOfData[this.index].id), 1);

  //   }
  //   console.log(this.mularry);



  // }
  checkinfo(i) {
    this.userSexList = this.serve.userSexList;
    console.log(this.userSexList)
    this.flag = false;
    this.index = i;
    this.singlebasedataAry = this.basedataAry[this.index];
    console.log(this.singlebasedataAry.usersex);
    console.log(this.serve.userSexList);
    
    var usersex = this.singlebasedataAry.usersex ? '1' : "0"
    console.log(usersex)
    this.userSex= usersex
    console.log(this.userSex);
    
    this.username = this.singlebasedataAry.username;
    this.usernation=this.singlebasedataAry.usernation;
    this.singleusernubmer = this.singlebasedataAry.userphonenum;
    this.singlebasename = this.singlebasedataAry.schoolofgraduate;
    this.singleproject = this.singlebasedataAry.majorofgraduate;

  
  }
  checkinfoClose() {

    this.flag = true;

  }
  select() {

  }



}
