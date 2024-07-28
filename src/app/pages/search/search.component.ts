import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer, IAPIResonse, IStations, ITrain, Search } from '../../model/train';
import { TrainService } from '../../service/train.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,DatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  implements OnInit{
  activatedRoute = inject(ActivatedRoute);
  trainService = inject(TrainService);
  trainList : ITrain[]=[];
  stationList : IStations[]=[];

  searchData: Search = new Search();

  SelectedTrain?:ITrain;

  loggedUserData:Customer = new Customer();

  passenger:any ={
    "passengerName":"",
    "age":""
  }

  passengerList:any[]=[];

  addPassenger(){
    const strObj = JSON.stringify(this.passenger);
    const parseObj = JSON.parse(strObj);
    this.passengerList.push(parseObj);
  }

  ngOnInit(): void {
      this.loadAllStations();
  }

  constructor(){
    debugger;
    this.activatedRoute.params.subscribe((res:any)=>{
      this.searchData.fromStationId = res.fromStationId;
      this.searchData.toStationId = res.toStationId;
      this.searchData.dateOfTravel = res.dateOfTravel;
      this.getSerachTrains();
      debugger;
    })
  }

  bookTicket(){
    debugger;
    const bookingObj ={
      "bookingId":0,
      "trainId":this.SelectedTrain?.trainId,
      "passengerId":this.loggedUserData.passengerID,
      "travelDate":this.searchData.dateOfTravel,
      "bookingDate":new Date(),
      "totalSeats":0,
      "TrainAppBookingPassengers":[] as any
    };
    bookingObj.TrainAppBookingPassengers =this.passengerList;
    bookingObj.totalSeats = this.passengerList.length;
    debugger;
    this.trainService.bookTrain(bookingObj).subscribe((res:IAPIResonse)=>{
      if(res.result){
        alert("Ticket BooK successfully")
        debugger;
      }
      else{
        alert(res.message)
      }
    })
  }

  getSerachTrains(){
    this.trainService.getTrainSerach(this.searchData.fromStationId,this.searchData.toStationId,this.searchData.dateOfTravel)
    .subscribe((res:any)=>{
      this.trainList=res.data;
      debugger;
    })
  }

  loadAllStations(){
    //debugger;
    this.trainService.getAllStations().subscribe((res:any)=>{
      this.stationList=res.data;
    })
  }

  open(train:ITrain){
    this.SelectedTrain = train;
    const model = document.getElementById('myBookModal');
    if(model!=null){
      model.style.display='block';
      
    }
  }
  close(){
    const model = document.getElementById('myBookModal');
    if(model!=null){
      model.style.display='none';
    }
  }

}
