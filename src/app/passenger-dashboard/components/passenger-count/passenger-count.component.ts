import { Component, Input } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";

@Component({
    selector: 'passenger-count',
    template:`<div>
    <h3>Airline Passengers</h3>
    <div>Total Checkd in: {{checkdInCount()}}/{{items.length}}
    </div>
    </div>`

})
export class PassengerCountComponent{
@Input() items: Passenger[];

/*check if how much passengers has checked in. 
function check if there are items. If there is, it will return the 
length of an array with every passenger that has checked in.
*/
   checkdInCount(): number{
       if(!this.items) return;
       return this.items.filter((passenger: Passenger) => passenger.checkedIn).length;
   }
}

