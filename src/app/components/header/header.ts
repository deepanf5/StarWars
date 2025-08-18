import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-header',
  imports: [ButtonModule,ToggleSwitchModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {



  switchtheme() {
    const element = document.querySelector('html');
    if(element) {
      element.classList.toggle('my-app-dark');
    }
  }

}
