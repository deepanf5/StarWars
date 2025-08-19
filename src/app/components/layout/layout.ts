import { Swapi } from './../../services/swapi';
import { Component, OnInit } from '@angular/core';


import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [TableModule,ListboxModule,FormsModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit {



  starWarsDetails:any;
  cities!:any;
  selectedCity:any;

  constructor(private swapi:Swapi,private routeTo:Router){
     this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
  }


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
  if (typeof url !== 'string') return null;

  const parts = url.split('/').filter(Boolean); 
  const resource = parts[parts.length - 2];     
  const id = parts[parts.length - 1];   

  return  resource + ' ' + id;
}


getdetails(id:number) {
  this.swapi.getId(id)
  this.routeTo.navigateByUrl('details')

}

}
