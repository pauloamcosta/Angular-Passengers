import { Component, OnInit } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  template: `
    <div>
    <passenger-count [items] = "passengers"></passenger-count>
    <div *ngFor="let passenger of passengers">
    {{passenger.fullname}}
    </div>
    <passenger-detail *ngFor="let passenger of passengers;"
    [detail]= "passenger"
    (edit) = "handleEdit($event)"
    (remove) ="handleRemove($event)">
    </passenger-detail>
    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];
  constructor() {}
  ngOnInit() {
    console.log('ngOnInit');
    this.passengers = [{
      id: 1,
      fullname: 'Stephen',
      checkedIn: true,
      checkInDate: 1490742000000,
      children: null
    }, {
      id: 2,
      fullname: 'Rose',
      checkedIn: false,
      checkInDate: null,
      children: [{ name: 'Ted', age: 12 },{ name: 'Chloe', age: 7 }]
    }, {
      id: 3,
      fullname: 'James',
      checkedIn: true,
      checkInDate: 1491606000000,
      children: null
    }, {
      id: 4,
      fullname: 'Louise',
      checkedIn: true,
      checkInDate: 1488412800000,
      children: [{ name: 'Jessica', age: 1 }]
    }, {
      id: 5,
      fullname: 'Tina',
      checkedIn: false,
      checkInDate: null,
      children: null
    }];
  }
  //returning new array without the clicked passenger
  handleRemove(event: Passenger){
    this.passengers = this.passengers.filter((passenger: Passenger) =>{
      return passenger.id !== event.id;
    })
  }

  //Using map 
  handleEdit(event: Passenger){
    this.passengers = this.passengers.map((passenger: Passenger) =>{
      //check if the passenger is updated and merging into the new collection
      //detect if its in the same passenger 
      if (passenger.id === event.id){
        /*if is change, overide.
        takes the original passenger and merge with the event change
        */
        passenger = Object.assign({}, passenger, event);
      }
      return passenger
    });
    console.log(this.passengers);
  }
}