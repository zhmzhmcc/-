import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  childrenpathlist = [
    { title: '用户列表', path: '/welcome/userinfo', active: true },
    { title: '用户添加', path: '/welcome/useradd', active: false },
  ];
  active: any;
  username:any;
  constructor(private route: Router,private http:HttpClient,private modalService:NzModalService) { }
  ngOnInit() {
     const username=window.localStorage['userMajor'];
     this.username=username
  }
  // togglechildrenpath(){
  //   this.route.navigate(['/welcome/userinfo'])
  // }
  togglechildrenpath(path, activeIndex) {
    this.childrenpathlist = this.childrenpathlist.map((item, index) => {
      return {
        ...item,
        active: activeIndex === index
      }
    })
    console.log(this.childrenpathlist[0].active);

    this.route.navigate([path])
  }
  loginOut(){
    this.modalService.confirm({
      nzTitle: '提示',
      nzContent: "确定退出登录吗？",
      // nzOnOk:()=>{
      //   this.http.get('/api/logoutXY',{
      //     headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=UTF-8' }),
      //     responseType: "text"
      //   }
      //    ).subscribe((res)=>{
      //     const data=JSON.parse(decodeURIComponent(res));
      //     console.log(data);
      //     if(data.status===1){
      //       window.localStorage.removeItem('userMajor');
      //       this.route.navigate(['/login'])
      //     }
          

      //   })
      // }
      nzOnOk:()=>{
        this.route.navigate(['/login'])
      }

    })
  }

}
