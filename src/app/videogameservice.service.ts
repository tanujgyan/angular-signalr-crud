import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideogameModel } from './VideogameModel';
import * as signalR from "@aspnet/signalr";
@Injectable({
  providedIn: 'root'
})
export class VideogameserviceService {

  constructor(private http: HttpClient) 
  { }
  readonly baseURL = 'https://localhost:44371/api/Videogame';
  private hubConnection!: signalR.HubConnection;
  private updateDataTable!: () => void;
  onDataUpdate(fn: () => void) {
    this.updateDataTable = fn;
  }
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:44371/Videogame')
                            .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  public addDataListener = () => {
    this.hubConnection.on('transferdata', (data) => {
      this.updateDataTable();
    });
  }
  
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
  //delete wont work without subscribe
  deleteVideogame(id:string)
  {
    return this.http.delete(this.baseURL+"?id="+id).subscribe(()=>{});
  }
}
