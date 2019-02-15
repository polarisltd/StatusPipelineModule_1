
import {Component, Input, Output, OnInit, AfterViewInit, EventEmitter, ElementRef} from '@angular/core';
import { ViewChild} from '@angular/core';
import {Database} from "../shared/status-pipeline-module.database";
import {Card} from "../shared/card";
import {Observable, Subject} from "rxjs";
import {Board} from "../shared/board";
import {IPipelineColumnElement, IStatusChange} from "../shared/status-pipeline-module.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Profile} from "../../profile/component/profile.model";
import {MatDialog, MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {DialogConfirmComponent} from "../dialog-confirm-component/dialog-confirm.component";
import {DialogEditCardComponent} from "../dialog-edit-card-component/dialog-edit-card.component";

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss']
})
export class CardComponentComponent implements OnInit {
  @ViewChild('emptyItem') emptyItem: ElementRef;
  @Input() boardSubject$: Subject<Board> // initialised and provided by board component
  @Input() card: Card;
  @Input() onUpdateCard: EventEmitter<IPipelineColumnElement>;
  @Input() onDeleteCard: EventEmitter<IPipelineColumnElement>;
  @Input() onCardClick : EventEmitter<IPipelineColumnElement>;
  database: Database;

  isCardEditMode : boolean = false;
  board$ : Observable<Board>;
  board : Board
  cardForm: FormGroup;
  cardFormChanged: boolean = false;
  dragNodeState: string;
  dragStatus : string;

  field1: string;
  field2: string;

  constructor(private fb: FormBuilder,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private dialog: MatDialog
              ) {
      this.matIconRegistry.addSvgIcon(
          "task",
          this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/task.svg")

      );
      this.matIconRegistry.addSvgIcon(
          "project_room",
          this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/project_room.svg")

      );


  }

  ngOnInit() {
        this.board$ = this.boardSubject$; //this.database.getBoardObservable()
        this.board$.subscribe(board => {
            // console.log('CardComponent#ngOnInit board$.subscrive '/*, JSON.stringify(board,null,'\t')*/)
            this.board = board
            this.database = new Database(this.boardSubject$,this.board);
            }
        )

      this.cardForm = this.fb.group({
          'title': this.card.title,
          'content': this.card.content
      });
      this.cardForm.valueChanges.subscribe(form => {
          console.log('CardComponent#cardForm.valueChanges')
          this.cardFormChanged = true;
          this.card.title = form.title;
          this.card.content = form.content;
      });



  }

  clickOnCardField(event){
  console.log('CardComponent#-> onCardTitleClick ',   this.card.title)
}



handleDragStart(event, card) {
   this.insertDragSourceId(event,this.card.id)
   console.log('CardComponent#handleDragStart',card.id)
}

handleDragOver(event, node) {
    event.preventDefault();
    const sourceId = this.extractDragSourceId(event)
    // console.log('CardComponent#handleDragOver #sourceId '   , sourceId )
    this.dragNodeState= this.getDragTargetState(event);
}

  
handleDrop(event, card) {
    event.preventDefault();

    // Handle drag area
    this.dragNodeState= this.getDragTargetState(event);
    console.log('Drop on card ',this.card.title,this.card.id,' => ' ,this.dragNodeState,' col/order ',this.card.columnId,'/' , this.card.order  )
    //
    // cards are ordered per column it belongs. Different Columns can have Cards with same order no.
    // - get card onto which drag op is happening.
    // - if marker is 'above' take card with -1 order number
    // - increase order number for all cards starting insertion point
    // - change columnId if required.

    const targetCard: Card = (this.dragNodeState === 'drag_above') ? this.database.getPreviousCardInSequence(this.card) : this.card;
    // we having card bellow which we accomodating source Card
    const srcCardId = this.extractDragSourceId(event)
    const srcCard = this.board.cards.find(entry => entry.id === srcCardId)
    // moved card is getting that column id were drag target is found.
    srcCard.columnId = targetCard.columnId
    const tatgetOrderPosition: number = targetCard.order
    this.database.promoteOrderFromCard(targetCard);
    srcCard.order=tatgetOrderPosition
    // next on datasource + trigger event
    this.database.updateDatasouce() // next on datasource./
    this.dragNodeState= ''
}

handleDragEnd(event) {

}

clickCardDeleteButton(card){
  console.log('CardComponent#clickCardDeleteButton' , card.id)
  this.database.removeCard(card.id)
  this.onDeleteCard.emit(card)
}

clickCardEditButton(card){
    console.log('CardComponent#clickCardEditButton' , card.id)
    this.isCardEditMode = true
}


clickOnCard(card){
    console.log('CardComponent#clickOnCard' , card.id)
    // this.onCardClick.emit(this.database.getCard(card.id))
}

clickExitUpdate() {
    console.log('onKeyEnter()')
    // we will emit from formGroup change subscription.
    this.isCardEditMode = false
    if(this.cardFormChanged){
        this.onUpdateCard.emit(this.card)
        this.isCardEditMode = false
    }
}

extractDragSourceId(event):string{
    // extract drag source as we coded it.
    return event.dataTransfer.types.find(entry => entry.includes("id=")).substr(3);
}
insertDragSourceId(event,id:string){
    // known behavior, dragOver did not make available originating item.
    // normally we insert drag source via event.dataTransfer.setData(key,value)
    // but now we cheat by inserting  event.dataTransfer.setData('key=value',whatever)
    // dragOver strips only value but not key so thats our backdoor solution
    event.dataTransfer.setData(`id=${id}`, 'data'); // whatever data
}


getDragTargetState(event):string{
    const percentageX = event.offsetX / event.target.clientWidth;
    const percentageY = event.offsetY / event.target.clientHeight;
    this.dragStatus = `card = ${this.card.id}  % = ${percentageY} `
    if (percentageY < 0.5) {
        return 'above';
    } else
        return 'below';

}


getProfile(card:Card):Profile{

  const profile =  {
    email         : card.responsible_email,
    first_name    : card.responsible_name,
    last_name     : card.responsible_name,
    bg_color      : 'blue',
    fg_color      : 'white',
    image         : null
} as Profile;

    return profile;
}


    clickBtnMessage(){
        console.log('you clicked a button! - openDialog' )
        this.openDialog()
    }

    clickBtnInfo(){
        console.log('you clicked a button! - openDialogEditCard' )
        this.openDialogEditCard()
    }
    clickBtnFavorite(){
        console.log('you clicked a button!' )
        this.openDialogEditCard()
    }
    clickBtnRightArrow(){
        console.log('you clicked a button!' )
        this.openDialogEditCard()
    }


    openDialog(): void {
        console.log('open dialog')
        let dialogRef = this.dialog.open(DialogConfirmComponent, {
            width: '250px',
            data: {name: this.field1, animal: this.field2}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.field2 = result;
        });
    }

    openDialogEditCard(): void {
        console.log('open dialog')
        let dialogRef = this.dialog.open(DialogEditCardComponent, {
            width: '250px',
            data: {name: this.field1, animal: this.field2}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.field2 = result;
        });
    }




}
