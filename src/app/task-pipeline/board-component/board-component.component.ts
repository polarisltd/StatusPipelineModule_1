import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, NgZone} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {
  IPipelineColumn,
  IPipelineColumnElement,
  IStatusChange,
} from "../shared/status-pipeline-module.interface";
import {Board} from "../shared/board";
import {StatusPipelineShared} from "../shared/status-pipeline-shared";
import {Card} from "../shared/card";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'dvtx-status-pipeline',
  templateUrl: './board-component.component.html',
  styleUrls: ['./board-component.component.css'],
  providers:[StatusPipelineShared]
})
export class BoardComponentComponent implements OnInit {
  @Input() boardSubject$ : Subject<Board>;
  @Input() onTransition : EventEmitter<IStatusChange>; // drag and drop operation
  @Input() onClickColumnTitle : EventEmitter<IPipelineColumn>; // column title click
  @Input() onAddCard : EventEmitter<IPipelineColumnElement>; // Add Card event
  @Input() onDeleteCard  : EventEmitter<IPipelineColumnElement>;
  @Input() onUpdateCard : EventEmitter<IPipelineColumnElement>; // Add Card event
  @Input() onCardClick : EventEmitter<IPipelineColumnElement>; // Add Card event
  @Input() onRemoveColumn : EventEmitter<IPipelineColumn>; // Add Card event
  @Input() validateDropRules: Function // asking permission for drag and drop
  // board: Board;
  //board$: Observable<Board>;
  board: Board;
  board$:Observable<Board>


  isSidebarOpen:boolean=false; // initially sidebar is closed.
  sideCardFormData: Card;
  cardForm: FormGroup;
  addingColumn = false;
  addColumnText: string;
  editingTilte = false;
  currentTitle: string;
  boardWidth: number;
  columnsAdded = 0;

  constructor(
     statusPipelineShared: StatusPipelineShared,
     private formBuilder: FormBuilder) {

     this.cardForm = formBuilder.group({
      title: formBuilder.control('initial value')
    });
  }

  ngOnInit() {


    this.board$ = this.boardSubject$
    this.board$.subscribe(board => {
      console.log('BoardComponent#constructor subscribe board$ {}'/*,JSON.stringify(data,null,'\t')*/)
      this.board = board
    })

    // create empty
    this.cardForm = this.formBuilder.group({
      'title': this.formBuilder.control(''),
      'content': this.formBuilder.control(''),
      'order': this.formBuilder.control(''),
      'status': this.formBuilder.control('')
    })

    // can't find a method to disable controls!
    Object.keys(this.cardForm.controls).forEach((key: string) => {
      const abstractControl = this.cardForm.controls[key];
      abstractControl.disable({emitEvent:true,onlySelf:true});
    })


    /*


public markControlsDirty(group: FormGroup | FormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
        const abstractControl = group.controls[key];

        if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
            this.markControlsDirty(abstractControl);
        } else {
            abstractControl.markAsDirty();
        }
    });
}



    this.this.cardForm.get('title').disabled = true;
    this.this.cardForm.get('content').disabled = true;
    this.this.cardForm.get('order').disabled = true;
    this.this.cardForm.get('status').disabled = true;
    */
   // this.cardForm.
   // this.cardForm
   // formCtrl.disable()


    // subscribe to card data
    this.onCardClick.subscribe(
        card => {
          this.sideCardFormData = card;
          this.isSidebarOpen=true;
          this.cardForm = this.formBuilder.group({
            'title': [this.sideCardFormData.title],
            'content': [this.sideCardFormData.content],
            'order': [this.sideCardFormData.order],
            'status': [this.sideCardFormData.status]
          })

  })

  }

  editTitle() {
    this.currentTitle = this.board.title;
    this.editingTilte = true;
  }

  sidebarOpen(){
  this.isSidebarOpen=true;
  }

  sidebarClose(){
    this.isSidebarOpen=false;
  }


}
