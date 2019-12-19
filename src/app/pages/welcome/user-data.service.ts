import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  basedataAry: any;
  total: any;
  applyMajorList: any;//参培报考专业
  userSexList: any = [];//性别类别
  commonSelectList = [];
  isArmyList = [];//军队列表
  staffTypeList = [];//人员类型
  IDcardtypeList = [];//证件类型
  practiceTypesList = [];//职业类型
  nowEducationList = [];//现有学历
  nowDegreeList = [];//现有学位
  nowDegreeTypeList = [];//现有学位类型
  companyLevelList = [];//单位级别
  opFlag: any;
  data: any;

  constructor(private http: HttpClient, private route: Router, private modalService: NzModalService) { }
  shuju(fn) {
    this.http.get("../../assets/dynamicData/applyMajor.json").subscribe((res) => {
      this.applyMajorList = res['classify']

    })
    this.http.post('/api/servicesXY', {
      "serviceNumber": "selectInformationAcquisitionPage",
      "args": {
        "trainmajor": window.localStorage["userMajor"],
        "pageNo": "1",
        "pageSize": "10",
        "baseCode": "-1"
      }
    },
      {
        headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=UTF-8' }),
        responseType: "text"
      }).subscribe((res) => {
         var data = JSON.parse(decodeURIComponent(res));
         this.data=data;

        this.opFlag = data.opFlag
        var datas = JSON.parse(data.serviceResult);
        let basedata = datas['page'].result;
        let total = datas['page'].total;
        this.basedataAry = basedata;
        console.log(this.basedataAry);
        this.total = total
          if (this.basedataAry && Array.isArray(this.basedataAry) && this.basedataAry.length > 0) {
            this.basedataAry = this.basedataAry.map(item => {
              this.applyMajorList.map(data => {
                if (item.trainmajor == data.code) {
                  item.trainmajor = data.text
                }
              })
              const { state } = item;//es6 语法，意思就是const state=item.state
              const { stafftype } = item;
              const { noweducation } = item;
              return {
                ...item,
                active: false,
                noflag: state == '0' ? false : state == '2' ? true : '',
                flag: state == '0' ? false : state == '1' ? true : '',
                state: state == '0' ? '未审核' : state == '1' ? '审核通过' : state == '2' ? '审核未通过' : '',
                stafftype: stafftype == "0" ? '本单位住院医师' : stafftype == '1' ? '外单位委托培养住院医师' : stafftype == '2' ? '面向社会招收住院医师' : '',
                noweducation: noweducation == '0' ? '中专' : noweducation == '1' ? '专科' : noweducation == '2' ? '本科' : noweducation == '3' ? '研究生' : ''
              }

            })
          }
          fn(data)
        

        // this.listOfDisplayData=this.basedataAry;

      })


  }

  pagechangeshuju(fn, args) {

    this.http.post('/api/servicesXY', args,
      {
        headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=UTF-8' }),
        responseType: "text"
      }).subscribe((res) => {
        var data = JSON.parse(decodeURIComponent(res));
        var datas = JSON.parse(data.serviceResult);
        let basedata = datas['page'].result;
        let total = datas['page'].total;
        this.basedataAry = basedata;
        this.total = total
        if (this.basedataAry && Array.isArray(this.basedataAry) && this.basedataAry.length > 0) {
          this.basedataAry = this.basedataAry.map(item => {
            this.applyMajorList.map(data => {
              if (item.trainmajor == data.code) {
                console.log(data.text);
                item.trainmajor = data.text
              }
            })
            const { state } = item;
            const { stafftype } = item;
            const { noweducation } = item
            return {
              ...item,
              active: false,
              noflag: state == '0' ? false : state == '2' ? true : '',
              flag: state == '0' ? false : state == '1' ? true : '',
              state: state == '0' ? '未审核' : state == '1' ? '审核通过' : state == '2' ? '审核未通过' : '',
              stafftype: stafftype == "0" ? '本单位住院医师' : stafftype == '1' ? '外单位委托培养住院医师' : stafftype == '2' ? '面向社会招收住院医师' : '',
              noweducation: noweducation == '0' ? '中专' : noweducation == '1' ? '专科' : noweducation == '2' ? '本科' : noweducation == '3' ? '研究生' : ''
            }

          })
        }
        fn(data)
        // this.listOfDisplayData=this.basedataAry;

      })

  }
  //获取参培专业数据
  getMajorData() {
    this.http.get("../../assets/dynamicData/applyMajor.json").subscribe((res) => {
      this.applyMajorList = res['classify']

    })
  };
  //
  getSexData() {
    this.userSexList = [
      { text: '男', code: '0' },
      { text: '女', code: '1' },
    ]
  }
  // 证件类型
  getIDcardtypeData() {
    this.IDcardtypeList = [
      { text: '身份证', code: '0' },
      { text: '港澳居民来往内地通行证', code: '1' },
      { text: '台湾居民来往内地通行证', code: '2' },
      { text: '外国人永久居留证', code: '3' },
      { text: '外籍护照', code: '4' },
      { text: '港澳居民居住证', code: '5' },
      { text: '台湾居民居住证', code: '6' }
    ];
  };
  // 人员类型
  getStaffTypeListData() {
    this.staffTypeList = [
      { text: '本单位住院医师', code: '0' },
      { text: '外单位委托培养住院医师', code: '1' },
      { text: '面向社会招收住院医师', code: '2' },
      { text: '全日制硕士专业研究生', code: '3' },
      { text: '其他人员', code: '4' }
    ]
  }
  // 军队列表
  getIsArmyListData() {
    this.isArmyList = [
      { text: '否', code: '0' },
      { text: '现役军人', code: '1' },
      { text: '文职人员', code: '2' },
      { text: '军队院校研究生', code: '3' }
    ]
  }
  // 选择是否
  getCommonSelectList() {
    this.commonSelectList = [
      { text: '是', code: '0' }, { text: '否', code: '1' }
    ]
  }
  // 执业类别数据
  getPracticeTypesData() {
    this.practiceTypesList = [
      { text: '临床', code: '0' },
      { text: '口腔', code: '1' },
      { text: '公共卫生', code: '2' },
      { text: '中医（包括中医、民族医和中西医结合）', code: '3' },
      { text: '无', code: '4' }
    ]
  }
  // 现有学历list
  getNowEducationList() {
    this.nowEducationList = [
      { text: '中专', code: '0' },
      { text: '专科', code: '1' },
      { text: '本科', code: '2' },
      { text: '研究生', code: '3' }
    ]
  }
  // 现有学位list
  getNowDegreeList() {
    this.nowDegreeList = [
      { text: '无', code: '0' },
      { text: '学士', code: '1' },
      { text: '硕士', code: '2' },
      { text: '博士', code: '3' }
    ]
  }
  // 学位类型
  getNowDegreeTypeList() {
    this.nowDegreeTypeList = [
      { text: '无', code: '0' },
      { text: '专业型', code: '1' },
      { text: '科学型', code: '2' }
    ]
  }
  // 单位级别
  getCompanyLevelList() {
    this.companyLevelList = [
      { text: '三级甲等', code: '0' },
      { text: '三级乙等', code: '1' },
      { text: '二级甲等', code: '2' },
      { text: '二级乙等', code: '3' },
      { text: '一级甲等', code: '4' },
      { text: '一级乙等', code: '5' },
      { text: '其他', code: '6' }
    ]
  }
  // listOfData=[
  //   {
  //     userId:1,
  //     status:0,
  //     username:'张三',
  //     usernubmer:1243253456,
  //     userIDnumber:123498321574396,
  //     basename:'医世界医院',
  //     project:'内科',
  //     year:2017,
  //     usertype:'本单位学员',
  //     checked:false
  //   },
  //   {
  //     userId:2,
  //     status:0,
  //     username:'李四',
  //     usernubmer:1243253456,
  //     userIDnumber:123498321574396,
  //     basename:'医世界医院',
  //     project:'内科',
  //     year:2017,
  //     usertype:'本单位学员',
  //     checked:false

  //   },
  //   {
  //     userId:3, 
  //     status:0,
  //     username:'王五',
  //     usernubmer:1243253456,
  //     userIDnumber:123498321574396,
  //     basename:'医世界医院',
  //     project:'内科',
  //     year:2017,
  //     usertype:'本单位学员',
  //     checked:false

  //   },
  //   {
  //     userId:4,
  //     status:0,
  //     username:'赵六',
  //     usernubmer:1243253456,
  //     userIDnumber:123498321574396,
  //     basename:'医世界医院',
  //     project:'内科',
  //     year:2017,
  //     usertype:'本单位学员',
  //     checked:false

  //   },
  //   {
  //     userId:5,
  //     status:0,
  //     username:'张三',
  //     usernubmer:1243253456,
  //     userIDnumber:123498321574396,
  //     basename:'医世界医院',
  //     project:'内科',
  //     year:2017,
  //     usertype:'本单位学员',
  //     checked:false

  //   },
  //   {
  //     userId:6, 
  //     status:0,
  //     username:'张三',
  //     usernubmer:1243253456,
  //     userIDnumber:123498321574396,
  //     basename:'医世界医院',
  //     project:'内科',
  //     year:2017,
  //     usertype:'本单位学员',
  //     checked:false

  //   },
  //   {
  //     userId:7,
  //     status:0,
  //     username:'张三',
  //     usernubmer:1243253456,
  //     userIDnumber:123498321574396,
  //     basename:'医世界医院',
  //     project:'内科',
  //     year:2017,
  //     usertype:'本单位学员',
  //     checked:false

  //   },
  //   {
  //     userId:8,
  //     status:0,
  //     username:'张三',
  //     usernubmer:1243253456,
  //     userIDnumber:123498321574396,
  //     basename:'医世界医院',
  //     project:'内科',
  //     year:2017,
  //     usertype:'本单位学员',
  //     checked:false

  //   },
  //   {
  //     userId:9, 
  //     status:0,
  //     username:'张三',
  //     usernubmer:1243253456,
  //     userIDnumber:123498321574396,
  //     basename:'医世界医院',
  //     project:'内科',
  //     year:2017,
  //     usertype:'本单位学员',
  //     checked:false

  //    },
  //   {
  //     userId:10,
  //     status:0,
  //     username:'张三',
  //     usernubmer:1243253456,
  //     userIDnumber:123498321574396,
  //     basename:'医世界医院',
  //     project:'内科',
  //     year:2017,
  //     usertype:'本单位学员',
  //     checked:false

  //   },
  //   // {
  //   //   userId:12,
  //   //   status:0,
  //   //   username:'张三',
  //   //   usernubmer:1243253456,
  //   //   userIDnumber:123498321574396,
  //   //   basename:'医世界医院',
  //   //   project:'内科',
  //   //   year:2017,
  //   //   usertype:'本单位学员',
  //   //   checked:false

  //   // },
  //   // {
  //   //   userId:13, 
  //   //   status:0,
  //   //   username:'张三',
  //   //   usernubmer:1243253456,
  //   //   userIDnumber:123498321574396,
  //   //   basename:'医世界医院',
  //   //   project:'内科',
  //   //   year:2017,
  //   //   usertype:'本单位学员',
  //   //   checked:false

  //   // },{
  //   //   userId:10,
  //   //   status:0,
  //   //   username:'张三',
  //   //   usernubmer:1243253456,
  //   //   userIDnumber:123498321574396,
  //   //   basename:'医世界医院',
  //   //   project:'内科',
  //   //   year:2017,
  //   //   usertype:'本单位学员'
  //   // }
  // ]
}
