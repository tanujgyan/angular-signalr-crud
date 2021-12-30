import { VideogameModel } from './../VideogameModel';
import { Company } from './../Company';
import { VideogameserviceService } from './../videogameservice.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-videogameedit',
  templateUrl: './videogameedit.component.html',
  styleUrls: ['./videogameedit.component.css']
})
export class VideogameeditComponent implements OnInit {
  form: FormGroup;
  selectedId: any;
  btnName:string="";
  companies:any;
  videogameModel:VideogameModel= new VideogameModel;
  constructor(public fb: FormBuilder,
    private route: ActivatedRoute,
    public service: VideogameserviceService,
    private router: Router) { 
    
    this.form = this.fb.group({
     
      id:[''],
      name: ['',Validators.required],
      platform: ['',Validators.required],
      genere: ['',Validators.required],
      companyName: ['',Validators.required],
    });

  }

  ngOnInit(): void {
    this.service.getCompanies().subscribe((res)=>{
      this.companies=res;
    });
    this.selectedId = this.route.snapshot.paramMap.get('id')!=undefined?this.route.snapshot.paramMap.get('id'):0;
    
    if (this.selectedId!=null && this.selectedId!=undefined && this.selectedId!=0)
    {
      this.btnName="Update";
      this.service.getVideogameFromId(this.selectedId).subscribe(
        (res)=>
        {
          this.form.setValue({
            id:res.id,
            name:res.name,
            platform:res.platform,
            genere:res.genere,
            companyName:res.company.name
          });  
        });
      }
        else
        {
        this.btnName="Add";
        }
  }
  submitForm() { 
    if (this.selectedId!=null && this.selectedId!=undefined && this.selectedId!=0)
    { 
      this.videogameModel.id=this.form.value.id;
      this.videogameModel.platform=this.form.value.platform;
      this.videogameModel.genere=this.form.value.genere;
      this.videogameModel.name=this.form.value.name;
      this.videogameModel.company.name=this.form.value.companyName;     
      this.service.updateVideogame(this.videogameModel).subscribe(
        () => {
          alert(this.btnName+" successful")
          this.router.navigate(["/"]);
        },
        (err) => {
          alert("there was an error in add/update please try again later")
        }
      );
    }
    else
    {
      this.videogameModel.id=this.form.value.id;
      this.videogameModel.platform=this.form.value.platform;
      this.videogameModel.genere=this.form.value.genere;
      this.videogameModel.name=this.form.value.name;
      this.videogameModel.company.name=this.form.value.companyName; 
      this.service.addVideogame(this.videogameModel).subscribe(
        () => {
          alert(this.btnName+" successful")
          this.router.navigate(["/"]);
        },
        (err) => {
          alert("there was an error in add/update please try again later")
        }
      );
    }
  }
  cancel()
  {
    this.router.navigate(["/"]);
  }
  
  get name() { return this.form.get('name'); }
  get platform() { return this.form.get('platform'); }
  get genere() { return this.form.get('genere'); }
  get companyName() { return this.form.get('companyName'); }
}
