import { Injectable } from '@angular/core';
import { DishTemplate } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  // dishes: DishTemplate[] = [
  //   {
  //     id: 1,
  //     name: 'Pizza Margherita',
  //     cuisine: "włoska",
  //     categories: ["wegetariańska", "danie główne"],
  //     ingredients: ["sos pomidorowy", "ser", "bazylia"],
  //     maximum_per_day: 10,
  //     description: "Klasyczna pizza: sos pomidorowy, ser.",
  //     price: 10,
  //     pictures: ['../../assets/images/01.jpg', '../../assets/images/01_2.jpg'],
  //   },
  //   {
  //     id: 2,
  //     name: 'Pizza Cztery Sery',
  //     cuisine: "włoska",
  //     categories: ["wegetariańska", "danie główne"],
  //     ingredients: ["sos pomidorowy", "cztery sery"],
  //     maximum_per_day: 4,
  //     price: 12,
  //     description: "Pizza premium: sos pomidorowy, cztery sery.",
  //     pictures: ['/assets/images/02.jpg'],
  //   },
  //   {
  //     id: 3,
  //     name: 'Lasange',
  //     cuisine: "włoska",
  //     categories: ["danie główne"],
  //     maximum_per_day: 0,
  //     price: 11,
  //     description: "Lasange wegług tradycyjnej włoskiej receptury",
  //     pictures: ['/assets/images/03.jpeg'],
  //   },
  //   {
  //     id: 4,
  //     name: 'Zupa Pomidorowa',
  //     cuisine: "polska",
  //     categories: ["zupa"],
  //     maximum_per_day: 8,
  //     price: 5,
  //     description: "Tradycyjna zupa polska",
  //     pictures: ['/assets/images/04.jpg'],
  //   },
  //   {
  //     id: 5,
  //     name: 'Schabowy z ziemniakami',
  //     cuisine: "polska",
  //     categories: ["danie główne", "mięsne"],
  //     maximum_per_day: 15,
  //     price: 20,
  //     description: "Każdy wie co to schabowy",
  //     pictures: ['/assets/images/05.jpg'],
  //   },
  //   {
  //     id: 6,
  //     name: 'Filet z kurczaka z frytkami',
  //     cuisine: "międzynarodowa",
  //     categories: ["danie główne", "mięsne"],
  //     maximum_per_day: 7,
  //     price: 11,
  //     description: "Grillowana pierś z kurczaka z zapiekanymi ziemnaikami",
  //     pictures: ['/assets/images/06.jpg'],
  //   },
  //   {
  //     id: 7,
  //     name: 'Kurczak w sosie curry',
  //     cuisine: "indyjska",
  //     categories: ["danie główne", "mięsne"],
  //     maximum_per_day: 5,
  //     price: 10.50,
  //     description: "Kurczak w sosie curry - tradycyjne indyjskie danie",
  //     pictures: ['/assets/images/07.jpg'],
  //   },
  //   {
  //     id: 8,
  //     name: 'Biryani',
  //     cuisine: "indyjska",
  //     categories: ["danie główne", "mięsne"],
  //     maximum_per_day: 16,
  //     price: 8,
  //     description: "",
  //     pictures: ['/assets/images/08.jpg'],
  //   },
  //   {
  //     id: 9,
  //     name: 'herbata',
  //     cuisine: "międzynarodowa",
  //     categories: ["cipły napój"],
  //     maximum_per_day: 30,
  //     price: 4,
  //     description: "Standardowa herbata z cukrem",
  //     pictures: ['/assets/images/09.jpeg'],
  //   },
  //   {
  //     id: 10,
  //     name: 'kawa',
  //     cuisine: "międzynarodowa",
  //     categories: ["cipły napój"],
  //     maximum_per_day: 35,
  //     price: 4.5,
  //     description: "Kawa czarna z ekspresu",
  //     pictures: ['/assets/images/10.jpg'],
  //   },
  //   {
  //     id: 11,
  //     name: 'tiramisu',
  //     cuisine: "włoska",
  //     categories: ["deser"],
  //     maximum_per_day: 12,
  //     price: 6.3,
  //     description: "Tiramisu według tradycyjnej włoskiej receptury",
  //     pictures: ['/assets/images/11.jpg'],
  //   },
  //   {
  //     id: 12,
  //     name: 'wino',
  //     cuisine: "międzynarodowa",
  //     categories: ["alkohol"],
  //     maximum_per_day: 50,
  //     price: 4.5,
  //     description: "Wino marki wino",
  //     pictures: ['/assets/images/12.jpeg'],
  //   },
  // ]
  constructor() { }

  getMockData(){
    // return this.dishes;
  }
}
