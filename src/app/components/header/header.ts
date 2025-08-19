import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-header',
  imports: [ButtonModule,ToggleSwitchModule,RouterModule,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone:true
})
export class Header {

  constructor(private routeTo:Router){}



  switchtheme() {
    const element = document.querySelector('html');
    if(element) {
      element.classList.toggle('my-app-dark');
    }
  }

  route() {
    this.routeTo.navigateByUrl('')
  }

}
