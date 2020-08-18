import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/User/user.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  constructor(
    private userService: UserService,
    private dialog: MatDialog,){}

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

  }

  editar(id:string){
    console.log({id})
  }

}
