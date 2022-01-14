import { MsalService } from '@azure/msal-angular';
import { VideogameModel } from './../VideogameModel';
import { VideogameserviceService } from './../videogameservice.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-videogamelist',
  templateUrl: './videogamelist.component.html',
  styleUrls: ['./videogamelist.component.css']
})
export class VideogamelistComponent implements OnInit, OnDestroy,AfterViewInit {

  constructor( private service: VideogameserviceService, private router: Router,private http: HttpClient,private msalService:MsalService) { }
  dtOptions: DataTables.Settings = {};
  videogames: VideogameModel[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  
  isUserLoggedIn():boolean
  {
    if(this.msalService.instance.getActiveAccount()!=null)
    {
      return true;
    }
    return false;
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    }
    this.service.startConnection();
    this.service.addDataListener();
    this.service.onDataUpdate(this.updateDataTable.bind(this));
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    
  }
  ngAfterViewInit(): void {
    this.loadVideogameList();
  }
  updateDataTable() {
    var table = $("#videogameslist").DataTable();
    table.destroy(); 
    this.loadVideogameList();
  }
  loadVideogameList()
  {
   this.service.getVideogameList().subscribe((data) => {
      this.videogames = data as any;
      console.log(this.videogames);
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    },
    ()=>{
      alert("Internal Server Error.There was an error retrieving your request. Please contact support");
    });
    
  }
  editbuttonclicked(data:any)
  {
    if (data!=undefined && data!=null) {
      this.router.navigate(["/videogame-edit",data]);
    }
  }
  deletebuttonclicked(data:any)
  {
    if (data!=undefined && data!=null) {
      this.service.deleteVideogame(data);
      this.updateDataTable();
    }
  }
}
