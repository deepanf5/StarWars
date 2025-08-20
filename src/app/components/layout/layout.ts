import { Swapi } from './../../services/swapi';
import { Component, OnInit } from '@angular/core';


import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-layout',
  imports: [TableModule, ListboxModule, FormsModule, MultiSelectModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit {


  selectedMovie: any
  starWarsDetails: any;
  ogDetails:any;
  movies!: any;
  species!: any;
  starship!:any;
  birthYear!:any
  selectedCity: any;
  selectedSepecies:any
  selectedStarship:any
  selectedBithYear:any

  constructor(private swapi: Swapi, private routeTo: Router) {
    this.movies = [
      { name: 'Movies', },
      { name: 'director', },
    ]
    // this.selectedMovie = [this.movies[0]]

    this.species =
      [
        { name: 'Human', },
        { name: 'species 2', },]
    // this.selectedSepecies = [this.species[0]]

    this.starship =
    [
      { name: 'starship 1', },
      { name: 'starship 2', },]
  // this.selectedStarship = [this.starship[0]]

  this.birthYear =
  [
    { name: 'All', },
    { name: '19BBY', },]
// this.selectedBithYear = [this.birthYear[0]]
  }


  ngOnInit(): void {
    this.swapi.getSwapi().subscribe(
      {
        next: (res) => {
          this.starWarsDetails = res;
          this.ogDetails = this.starWarsDetails
        },
        error: (err) => console.log(err)
      }
    )
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
    // console.log(this.selectedSepecies[0]?.name);
    // console.log(this.selectedCity.name[0]?.name);
    // console.log(this.selectedStarship.name[0]?.name);
    // console.log(this.selectedMovie.name[0]?.name)
    console.log(this.selectedBithYear[0])
    console.log(this.selectedBithYear[1])

    console.log('og',this.ogDetails)
    console.log('both',this.selectedBithYear)
    if(this.selectedBithYear[0]?.name !== 'All') {
      this.starWarsDetails =  this.starWarsDetails.filter((details:any) => details.birth_year === this.selectedBithYear[0]?.name)
    }
    if(this.selectedBithYear[1]?.name === 'All' && this.selectedBithYear[0]?.name === '19BBY') {
      console.log('works')
      this.starWarsDetails = []
      this.starWarsDetails =  this.ogDetails
    }
    if(this.selectedBithYear[1]?.name !== 'All' && this.selectedBithYear[0]?.name !== '19BBY') {
      this.starWarsDetails =  this.ogDetails 
    }
  }

}
