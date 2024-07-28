import { Component, inject, OnInit } from '@angular/core';
import { TrainService } from '../../service/train.service';
import { IStations } from '../../model/train';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  trainService = inject(TrainService);
  stationList:IStations[]=[];

  router=inject(Router);

  fromStationId:number=0;
  toStationId:number=0;
  dateOfTravel:string="";

  ngOnInit(): void {
    //debugger;
    this.loadAllStations();
  }

  loadAllStations(){
    debugger;
    this.trainService.getAllStations().subscribe((res:any)=>{
      this.stationList=res.data;
      debugger;
    })
  }
  onSearch(){
    if(this.fromStationId == 0 || this.toStationId == 0 || this.dateOfTravel ==""){
      alert("Select your Journey Details");
    }
    else{
      if(this.fromStationId == this.toStationId){
        alert("From and To station can't same");
      }
      else{
        
        this.router.navigate(['search',this.fromStationId,this.toStationId,this.dateOfTravel])
      }
    }
  }


}
