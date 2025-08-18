import { Swapi } from './../../services/swapi';
import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';

import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-layout',
  imports: [Header,TableModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit {

  starWarsDetails:any;

  constructor(private swapi:Swapi){}


  ngOnInit(): void {
      this.swapi.getSwapi().subscribe(
        {
          next:(res) => {
            this.starWarsDetails = res
          },
          error:(err) => console.log(err)
        }
      )
  }


 extractResourceAndId(url:string) {
  console.log(url)
  if (typeof url !== 'string') return null;

  const parts = url.split('/').filter(Boolean); 
  const resource = parts[parts.length - 2];     
  const id = parts[parts.length - 1];   

  return  resource + ' ' + id;
}

}
