import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/User/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { Overlay } from '@angular/cdk/overlay';
import { DeleteFormComponent } from '../../helpers/delete-form/delete-form.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private overlay: Overlay){}

  userList: User[]=[];

  displayedColumns: string[] = ['userName', 'email', 'timeStamp', 'ctStatus', 'fkIdSexo', 'actions'];

  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {

    this.userService.getUsers().subscribe(
      result=>{
        this.userList = result;
        this.dataSource = new MatTableDataSource(this.userList);
      },
      err=> console.log({err})
    )

    this.dataSource.sort = this.sort;
  }

  nuevo(){

  }

  openDialog(action:string, data: any){
    data.action = action;
    const dialogRef = this.dialog.open(UserModalComponent, {width: '640px', height: '70%' ,   scrollStrategy: this.overlay.scrollStrategies.reposition(), disableClose: true, data: data});
    dialogRef.afterClosed()
      .subscribe(result =>{
        console.log('Devolucion del child: ',result)
        // TODO: manager tipo de devolucion
        if(result.action ==='new')
          this.addData(result.data);
        if(result.action === 'update')
          this.updateData(result.data);
      });
  }

  editar(id:string){
    console.log({id})
  }


  addData(data: User): void{
    this.userList.push(data);
    this.dataSource.data = this.userList;

  }

  updateData(data: User){
      const updateItem = this.userList.find(item => item.PkIdUser === data.PkIdUser);
      const index = this.userList.findIndex(i=> i === updateItem);
      this.userList[index] = data;
      this.dataSource.data = this.userList;
  }


  openDeleteDialog(data: User){
    const deleteDialogRef = this.dialog.open(DeleteFormComponent,{width:'350px', disableClose: true});
    deleteDialogRef.componentInstance.confirmDelete
      .subscribe(()=>{
        console.log(`El item numero ${data.PkIdUser} se ha borrado satisfactoriamente`);
        this.deleteData(data);
        deleteDialogRef.close();
      });
    deleteDialogRef.componentInstance.cancel
      .subscribe(()=>{
        console.log('Se ha cancelado la eliminacion');
        deleteDialogRef.close();
      })
  }

  deleteData(data: User){
    this.userService.deleteUser(data.PkIdUser).subscribe(result=>{
      this.updateData(result);
    },err=>console.log('error: ',err));
  }

}
