import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, IAPIResonse, Login } from '../model/train';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  apiUrl="https://freeapi.miniprojectideas.com/api/TrainApp/";
  //apiUrl="https://localhost:7032/api/TrainApp/";

  constructor(private http:HttpClient) { 
    
  }

  getAllStations(){
    debugger;
    return this.http.get(`${this.apiUrl}GetAllStations`);
    
    
  }

  getTrainSerach(from:number, to:number, date:string){
    return this.http.get(`${this.apiUrl}GetTrainsBetweenStations?departureStationId=${from}&arrivalStationId=${to}&departureDate=${date}`);
  }

  createNewCustomer(custData:Customer){
    return this.http.post<IAPIResonse>(`${this.apiUrl}AddUpdatePassenger`,custData)
  }

  onLogin(obj:Login){
    return this.http.post<IAPIResonse>(`${this.apiUrl}Login`,obj)
  }

  bookTrain(obj:any){
    debugger;
    return this.http.post<IAPIResonse>(`${this.apiUrl}bookTrain`,obj)
  }
}
