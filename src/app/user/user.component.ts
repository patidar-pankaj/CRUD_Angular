import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  userForm: any;
  users: any;
  

  constructor(public fb:FormBuilder, private service: CommonService){
    this.userForm = this.fb.group({
      Name : [""],
      EmpId : [""],
      age : [""],
      mob : [""]
    })
  }

  ngOnInit(): void {
    
      this.getAllUsers();
    
  }

  submitForm(){

    var type = this.userForm.value.id==null?'add':'update';
    console.log(type,this.userForm.value.id);
    this.service.addUpdateUser(this.userForm.value,type).subscribe(data =>{

      if(type=='add'){
        alert('added');
      }else{
      alert("User updated Successfully");
      }
      this.userForm.reset();
      this.getAllUsers();
      console.log(data);
    });
  }

  getAllUsers(){
    this.service.getData().subscribe(data => {
      console.log(data);
      this.users = data;
    })
  }

  deleteUser(id: any){
    this.service.delete(id).subscribe((data: any) =>{

      this.getAllUsers();
      // alert("User Deleted");
    })
  }

  GetUserById(id: any){
    this.service.getByID(id).subscribe((data: any) => {
      console.log("user",data);

      document.querySelector("#home-tab")?.classList.add("show","active");
      document.querySelector("#home-tab-pane")?.classList.add("show","active");

      document.querySelector("#profile-tab")?.classList.remove("show","active");
      document.querySelector("#profile-tab-pane")?.classList.remove("show","active");


      this.userForm.patchValue({
        Name : data.Name,
        EmpId : data.EmpId,
        age : data.age,
        mob : data.mob
      })
    })
  }

  
    
  

}


