import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Customer, IAPIResonse, Login } from './model/train';
import { FormsModule } from '@angular/forms';
import { TrainService } from './service/train.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TrainBooking';

  registerObj:Customer = new Customer();
  trainService=inject(TrainService);

  loginObj:Login = new Login();

  loggedUser: Customer = new Customer();

  constructor(){
    const localData= localStorage.getItem('trainApp');
    if(localData!=null){
      this.loggedUser = JSON.parse(localData)
    }
  }

  onLogOff(){
    this.loggedUser = new Customer();
    localStorage.removeItem('trainApp');
  }

  onLogin(){
    debugger;
    this.trainService.onLogin(this.loginObj).subscribe((res:IAPIResonse)=>{
      if(res.result){
        alert("Login Success")
        debugger
        localStorage.setItem('trainApp',JSON.stringify(res.data))
        this.closeLogin();
      }else{
        alert(res.message)
      }
    })
  }

  onRegister(){
    debugger;
    this.trainService.createNewCustomer(this.registerObj).subscribe((res:IAPIResonse)=>{
      if(res.result){
        debugger;
        alert("Registraion Success")
        this.closeRegister();
      }else{
        alert(res.message)
      }
    })

  }

  openRegister(){
    const model = document.getElementById('registerModel')
    if(model!=null){
      model.style.display='block';
    }
  }

  openLogin(){
    const model = document.getElementById('loginModel')
    if(model!=null){
      model.style.display='block';
    }
  }

  closeRegister(){
    debugger;
    const model = document.getElementById('registerModel')
    if(model!=null){
      model.style.display='none';
    }
  }

  closeLogin(){
    const model = document.getElementById('loginModel')
    if(model!=null){
      model.style.display='none';
    }
  }

  
}
