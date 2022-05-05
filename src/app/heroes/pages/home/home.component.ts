import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../auth/services/auth.service';
import { Auth } from './../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //methods gets
  get getAuth () {
    return this.authService.getAuth;
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

  }

  logout(){
    //ir no backend
    //retorna um usuario


    this.authService.logout();
    this.router.navigate(['./auth']);



  }

}
