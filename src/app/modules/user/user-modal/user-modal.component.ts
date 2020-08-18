import { Component, OnInit, Optional, Inject } from '@angular/core';
import { UserService } from 'src/app/services/User/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  private action:string;
  private _data:User = {} as User;
  userList: User[] =[];

  userForm: FormGroup;
  breakPoint: number;
  wasFormChanged = false;
  demoService: any;

  constructor(
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

  ngOnInit() {
    this.userService.getUsers().subscribe(result=> {
      this.userList = result;
    })
    this.userForm = this.fb.group({
      PkIdUser:[],
      UserName: [, [Validators.required]],
      Email: [, [Validators.required, Validators.email]],
      CtStatus: [true],
      FkIdSexo: [1],
      Password: []
    });

    this.userForm.patchValue(this._data);

    this.breakPoint = window.innerWidth <=600 ? 1 : 2;

  }

  //#region functionality
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
        console.log('error: ',err); // TODO: manejo de errores
      })
  }

  saveExist(){

    this.userService.putUser(this.userForm.controls.PkIdPlace.value, this.userForm.value)
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
      // const dialogRef = this.dialog.open() // TODO: notificacion are you discard changes?
    }else{
      this.dialogRef.close({action:'cancel'});
      // this.dialog.closeAll();
    }
  }

  public onResize(event){
    this.breakPoint = event.target.innerWidth <=600 ? 1:2;
  }

  formChanged( ){
    this.wasFormChanged = true;
  }

}
