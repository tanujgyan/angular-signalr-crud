import { VideogameModel } from './../VideogameModel';
import { VideogameserviceService } from './../videogameservice.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videogamelist',
  templateUrl: './videogamelist.component.html',
  styleUrls: ['./videogamelist.component.css']
})
export class VideogamelistComponent implements OnInit, OnDestroy {

  constructor( private service: VideogameserviceService, private router: Router) { }
  dtOptions: DataTables.Settings = {};
  videogames: VideogameModel[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    }
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    //this.id="";
  }
  ngAfterViewInit(): void {
    
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
      window.location.reload();
    }
  }

}
