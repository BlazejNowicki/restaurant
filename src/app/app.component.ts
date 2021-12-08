import { Component } from '@angular/core';

export interface DishTemplate {
  id: number,
  name: string;
  cuisine: string;
  categories?: string[],
  ingredients?: string[],
  maximum_per_day: number;
  price: number,
  description?: string,
  pictures: string[],
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurant';


  //move to service or sth
  dishes: DishTemplate[] = [
    {
      id: 1,
      name: 'Margherita',
      cuisine: "włoska",
      maximum_per_day: 10,
      description: "Klasyczna pizza: sos pomidorowy, ser.",
      price: 10,
      pictures: ['../../assets/images/01.jpg'],
    },
    {
      id: 2,
      name: ' Quattro Forrmagi',
      cuisine: "włoska",
      maximum_per_day: 4,
      price: 12,
      description: "Pizza premium: sos pomidorowy, cztery sery.",
      pictures: ['/assets/images/02.jpg'],
    },
    {
      id: 3,
      name: 'Lasange',
      cuisine: "włoska",
      maximum_per_day: 0,
      price: 11,
      description: "Tradycyjny włoski makaron.",
      pictures: ['/assets/images/03.jpeg'],
    }
  ]

}
