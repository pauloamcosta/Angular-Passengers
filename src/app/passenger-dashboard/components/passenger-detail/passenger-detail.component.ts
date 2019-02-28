import { Component, OnChanges,Input, Output, EventEmitter } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";

@Component({
  selector: "passenger-detail",
  styleUrls: ["passenger-detail.component.scss"],
  template: `
    <div class="passenger-detail-container">
      <span class="status" [class.checked-in]="detail.checkedIn"></span>
      <div *ngIf="editing">
        <input 
        type="text" 
        [value]="detail.fullname"
        (input)="onNameChange(name.value)"
        #name
        />
      </div>

      <div>
        {{ detail.fullname }}
      </div>
      <div class="date">
        Check in date:
        {{
          detail.checkInDate
            ? (detail.checkInDate | date: "yMMMMd" | uppercase)
            : "Not checked in"
        }}
      </div>
      <div class="children">Children: {{ detail.children?.length || 0 }}</div>
      <button class = "edit-button" (click)= "toggleEdit()" > 
      {{editing ? 'Done' : 'Edit'}}
      </button>
      <button class = "remove-button"(click)= "onRemove()" > 
      Remove
      </button>
    </div>
  `
})

//this component receives one passengerß from the father component and do the logic of each one.
export class PassengerDetailComponent implements OnChanges{
    

  @Input() detail: Passenger;

  //bind the event
  @Output() remove: EventEmitter<any> = new EventEmitter;
  @Output() edit: EventEmitter<any> = new EventEmitter;

  editing: boolean = false;

  constructor() {}

  //using the onChanges hook to break the binding between the child and parent
  ngOnChanges(changes) {
    if(changes.detail){
        this.detail = Object.assign({}, changes.detail.currentValue);
    }
}

  onNameChange(value: string){
      this.detail.fullname = value;
  }

  toggleEdit(){
      if(this.editing){
          this.edit.emit(this.detail);
      }
      this.editing = !this.editing;
  }

  onRemove(){
      this.remove.emit(this.detail);
  }
}
