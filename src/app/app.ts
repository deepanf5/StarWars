import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from './components/layout/layout';
import { Header } from '../app/components/header/header';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Layout,Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
