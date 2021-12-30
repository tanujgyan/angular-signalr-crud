import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideogameModel } from './VideogameModel';
@Injectable({
  providedIn: 'root'
})
export class VideogameserviceService {

  constructor(private http: HttpClient) 
  { }
  readonly baseURL = 'https://localhost:44371/api/Videogame';
  getVideogameList(): Observable<VideogameModel[]> { 
    var result = this.http.get<VideogameModel[]>(this.baseURL+"/GetAllVideogames");
    console.log(result);
    return result;
  }
  getVideogameFromId(id:string): Observable<VideogameModel> { 
    var result = this.http.get<VideogameModel>(this.baseURL+"/GetVideogameById?id="+id);
    return result;
  }
  getCompanies():Observable<string[]>{
    var companies = this.http.get<string[]>(this.baseURL+"/GetDistinctCompanies");
    console.log(companies);
    return companies;
  }
  addVideogame(videogame:VideogameModel)
  {
    return this.http.post(this.baseURL,videogame);
  }
  updateVideogame(videogame:VideogameModel)
  {
    return this.http.put(this.baseURL,videogame);
  }
}
