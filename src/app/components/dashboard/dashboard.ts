import { Swapi } from './../../services/swapi';
import { Component, OnInit } from '@angular/core';


import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { People } from '../models/people';



interface Filter {

  name:string
}



@Component({
  selector: 'app-dashboard',
    imports: [TableModule, ListboxModule, FormsModule, MultiSelectModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone:true
})
export class Dashboard {

    selectedMovie: any
  starWarsDetails!:People[];
  ogDetails:any;
  movies!:Filter[];
  species!: Filter[];
  birthYear:any;
  selectedCity!: Filter[];
  selectedSpecies!:Filter[]
  selectedStarship!:Filter[]
  selectedBithYear!:Filter[]

  constructor(private swapi: Swapi, private routeTo: Router) {
    this.movies = [
      { name: 'All', },
      { name: 'A New Hope', },
    ]
   

    this.species =
      [
        { name: 'All', },
        { name: 'Human', },]
  }


  ngOnInit(): void {
    this.swapi.getSwapi().subscribe(
      {
        next: (res:People[]) => {
          this.starWarsDetails = res;

          this.ogDetails = this.starWarsDetails
          const uniqueYears = [...new Set(this.starWarsDetails.map(p => p.birth_year))];
          this.birthYear = [{ name: 'All',}, ...uniqueYears.map(y => ({ name: y}))];
        },
        error: (err) => console.log(err)
      }
    )
    this.flims()
  }


  extractResourceAndId(url: string) {
    if (typeof url !== 'string') return null;

    const parts = url.split('/').filter(Boolean);
    const resource = parts[parts.length - 2];
    const id = parts[parts.length - 1];

    return resource + ' ' + id;
  }


  getdetails(id: number) {
    this.swapi.getId(id)
    this.routeTo.navigateByUrl('details')

  }

  filterby() {
    if(this.selectedMovie?.length > 0) {
      this.filterByEpisode()
    }
    else {
      this.starWarsDetails = this.ogDetails
    }
   

    if(this.selectedBithYear?.length > 0) {
      this.filterByBirthYear()
    }

    if(this.selectedSpecies?.length > 0) {
      this.filterByHuman()
    }

    console.log(this.starWarsDetails?.length)
    console.log(this.starWarsDetails)

    
  }



  filterByBirthYear() {
    this.starWarsDetails = [...this.ogDetails];

    const selectedYears = this.selectedBithYear.map((item: any) => item.name);
  
    // Case 1: If "All" is selected, do nothing
    if (selectedYears.includes('All')) {
      return;
    }
  
    // Case 2: Filter by selected years
    this.starWarsDetails = this.starWarsDetails.filter((details: any) =>
      selectedYears.includes(details.birth_year)
    );

  }


  filterByEpisode() {
    if(this.selectedMovie[0]?.name !== 'All') {
     this.starWarsDetails =  this.starWarsDetails.slice(0, 12)
    }
    if(this.selectedMovie[1]?.name === 'All' && this.selectedMovie[0]?.name === 'A New Hope') {
      this.starWarsDetails = this.ogDetails

    }
    if(this.selectedMovie.length < 0) {
      this.starWarsDetails = this.ogDetails
    }

  }


  filterByHuman() {
    if(this.selectedSpecies[0]?.name !== 'All') {
     this.starWarsDetails =  this.starWarsDetails.slice(64, 67).concat(this.starWarsDetails[72])
    }
    if(this.selectedSpecies[1]?.name === 'All' && this.selectedSpecies[0]?.name === 'Human') {
      this.starWarsDetails = this.ogDetails

    }
    if(this.selectedSpecies.length < 0) {
      this.starWarsDetails = this.ogDetails
    }
    

  }



  flims() {
    this.swapi.getFlims().subscribe(
      {
        next:(res) => {
          console.log(res)
        },
        error:(err) => console.log(err)
      }
    )
  }


}
