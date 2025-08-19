import { Component, effect, OnInit } from '@angular/core';
import { Swapi } from '../../services/swapi';
import { DatePipe } from '@angular/common';
import { forkJoin, of, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-detailsview',
  imports: [DatePipe],
  templateUrl: './detailsview.html',
  styleUrl: './detailsview.scss'
})
export class Detailsview implements OnInit{

  details!:any;
  planetUrl!:string;
  planetDetails!:any;
  species!:string;
  speciesDetails!:any;
  filmDetails!:any;
  vechileDetails!:any

  constructor(private swapi:Swapi) {


 
    
  }
  ngOnInit(): void {

this.swapi.getDetails().pipe(
  switchMap((details: any) => {
    this.details = details;
    return this.swapi.getSwapI(details.homeworld).pipe(
      catchError((error: any) => {
        console.error('Planet Details Error:', error);
        return of(null);
      })
    );
  }),
  switchMap((planet: any) => {
    this.planetDetails = planet;
    const speciesUrl = this.details.species?.[0];
    return this.swapi.getSwapI(speciesUrl).pipe(
      catchError((error: any) => {
        console.error('Species Error:', error);
        return of(null);
      })
    );
  }),
  switchMap((species: any) => {
    this.speciesDetails = species;
    const filmUrls = this.planetDetails?.films || [];
    const filmObservables = filmUrls.map((url: string) =>
      this.swapi.getSwapI(url).pipe(
        catchError((error: any) => {
          console.error('Film Error:', error);
          return of(null);
        })
      )
    );
    return forkJoin(filmObservables);
  }),
switchMap((filmDetails: any) => {
  this.filmDetails = filmDetails;
  console.log('Details:', this.details);

  const vehicleUrls = this.details?.vehicles || [];
  if (!vehicleUrls.length) {
    return of([]);
  }

  const vehicleObservables = vehicleUrls.map((url: string) =>
    this.swapi.getSwapI(url).pipe(
      catchError((error: any) => {
        console.error('Vehicle Error:', error);
        return of(null);
      })
    )
  );

  return forkJoin(vehicleObservables);
})


).subscribe((vechileDetails:any) => {
  this.vechileDetails = vechileDetails;
  console.log('vechile details',vechileDetails)
});

  
  }

}
