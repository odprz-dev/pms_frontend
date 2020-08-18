import { Component, OnInit, Optional, Inject, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/User/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit, AfterViewChecked {


  action:string;
  private _data:User = {} as User;
  userList: User[] =[];

  userForm: FormGroup;
  breakPoint: number;
  wasFormChanged = false;
  demoService: any;

  constructor(
    private cdRef : ChangeDetectorRef,
    private userService: UserService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any
  )
  {
    this.action = data.action;
    this._data ={...data};
  }
  ngAfterViewChecked(): void {
    this.action = this.action
    this.cdRef.detectChanges();
  }

  ngOnInit() {

    this.userForm = this.fb.group({
      PkIdUser:[],
      UserName: [, [Validators.required, Validators.minLength(7)]],
      Email: [, [Validators.required, Validators.email]],
      CtStatus: [true],
      FkIdSexo: [1],
      Password: ['',[Validators.minLength(10), Validators.pattern("^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{5,}$")]],
      LastPassword: ['',[Validators.minLength(10), Validators.pattern("^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{5,}$")]],
      NewPassword: ['',[Validators.minLength(10), Validators.pattern("^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{5,}$")]]

    });

    console.log('modal: ', this._data);

    // this.userForm.setValue()

    this.userForm.patchValue({
      PkIdUser: this.data.pkIdUser,
      UserName: this._data.userName,
      Email: this._data.email,
      FkIdSexo: this._data.fkIdSexo? this._data.fkIdSexo : 1,

    });

    this.breakPoint = window.innerWidth <=600 ? 1 : 2;

  }


  saveUser(){
    if(this.action === 'new')
        this.saveNew();
    if(this.action === 'update')
      this.saveExist();
  }

  saveNew(){
    this.userService.postUser(this.userForm.value)
      .subscribe(result=>{

        this.dialogRef.close({action: this.action, data: result});
      }, err =>{
        console.log('error: ',err);
      })
  }

  saveExist(){

    this.userService.putUser(this.userForm.controls.PkIdUser.value, this.userForm.value)
    .subscribe(result=>{
      this.dialogRef.close({action:'update',data:result})

    }, err=>{

      console.log('error: ',err)
    });
  }

  openDialog(){
    console.log(this.wasFormChanged);
    if(this.userForm.dirty){
      this.dialogRef.close({action:'cancel'});

    }else{
      this.dialogRef.close({action:'cancel'});

    }
  }

  public onResize(event){
    this.breakPoint = event.target.innerWidth <=600 ? 1:2;
  }

  formChanged( ){
    this.wasFormChanged = true;
  }

}
