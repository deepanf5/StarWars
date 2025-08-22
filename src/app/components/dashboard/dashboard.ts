import { Swapi } from './../../services/swapi';
import { Component, OnInit } from '@angular/core';


import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { People } from '../models/people';



interface Filter {

  name: string
}



@Component({
  selector: 'app-dashboard',
  imports: [TableModule, ListboxModule, FormsModule, MultiSelectModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true
})
export class Dashboard {

  selectedMovie: any
  starWarsDetails!: People[];
  ogDetails: any;
  movies!: Filter[];
  species: any;
  birthYear: any;
  selectedCity!: Filter[];
  selectedSpecies!: Filter[]
  selectedStarship!: Filter[]
  selectedBithYear!: Filter[];
  flimDetails: any;
  speciesDetails:any

  constructor(private swapi: Swapi, private routeTo: Router) {
    this.movies = [
      { name: 'All', },
      { name: 'A New Hope', },
    ]

  }


  ngOnInit(): void {

    this.getSwapiD();
    this.flims();
    this.getSpecies();
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
    if (this.selectedMovie?.length > 0) {
      this.filterByEpisode()
    }
    else {
      this.starWarsDetails = this.ogDetails
    }


    if (this.selectedBithYear?.length > 0) {
      this.filterByBirthYear() 
    }

    if (this.selectedSpecies?.length > 0) {
      this.filterSpecies()
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


    if (!this.selectedMovie || this.selectedMovie.length === 0) {
      return;
    }

    this.starWarsDetails = [...this.ogDetails];

    const hasAll = this.selectedMovie.some((m: any) => m.name === 'All');
    if (hasAll) {
      return;
    }

    const selectedUrls = this.selectedMovie.map((m: any) => m.flimUrl);

    if (selectedUrls.includes('All')) {
      return;
    }

    this.starWarsDetails = this.starWarsDetails.filter((person: any) =>
      person.films.some((filmUrl: string) => selectedUrls.includes(filmUrl))
    );



  }


  filterSpecies() {

    this.starWarsDetails = [...this.ogDetails];

  if (!this.selectedSpecies || this.selectedSpecies.length === 0) {
    return; 
  }

  console.log(this.selectedSpecies)
  const hasAll = this.selectedSpecies.some((m: any) => m.name === 'All');
  if (hasAll) {
    return;
  }

  const selectedPeopleUrls = this.selectedSpecies.flatMap((m: any) => m.peopleUrl);

  console.log('selected url',selectedPeopleUrls)
  this.starWarsDetails = this.starWarsDetails.filter((person: any) =>
  selectedPeopleUrls.includes(person.url)
);

}


  flims() {
    this.swapi.getFlims().subscribe(
      {
        next: (res) => {
          this.flimDetails = res
          this.movies = [{ name: 'All', }, ...this.flimDetails.map((y: any) => ({ name: y.title, flimUrl: y.url }))];
        },
        error: (err) => console.log(err)
      }
    )
  }


  getSwapiD() {
    this.swapi.getSwapi().subscribe(
      {
        next: (res: People[]) => {
          this.starWarsDetails = res;

          this.ogDetails = this.starWarsDetails
          this.birthYear = [{ name: 'All', }, ...this.ogDetails.map((y: any) => ({ name: y.birth_year }))];
        },
        error: (err) => console.log(err)
      }
    )
  }

  getSpecies() {

    this.swapi.getSpecies().subscribe(
      {
        next: (res) => {
          this.speciesDetails = res
          this.species = [{ name: 'All', }, ...this.speciesDetails.map((y: any) => ({ name: y.name, peopleUrl: y.people }))];

        },
        error:(err) => console.log(err)
      }
    )

  }


}
