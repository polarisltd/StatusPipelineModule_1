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
import {Portal} from "@angular/cdk/portal";
import {MessagesPortalService} from "../shared/messages-portal-service";


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
  @Input() onShowMessages : EventEmitter<IPipelineColumnElement>; // Add Card event
  @Input() onRemoveColumn : EventEmitter<IPipelineColumn>; // Add Card event
  @Input() validateDropRules: Function // asking permission for drag and drop
  // board: Board;
  //board$: Observable<Board>;
  board: Board;
  board$:Observable<Board>


  isSidebarOpen:boolean=false; // initially sidebar is closed.
  sideBarTabIndex:number = 0;
  sideCardFormData: Card;
  addingColumn = false;
  addColumnText: string;
  editingTilte = false;
  currentTitle: string;
  boardWidth: number;
  columnsAdded = 0;



  constructor(
     statusPipelineShared: StatusPipelineShared,
     messagesPortalService: MessagesPortalService
     ) {

  }

  ngOnInit() {


    this.board$ = this.boardSubject$
    this.board$.subscribe(board => {
    // console.log('BoardComponent#ngOnInit subscribe board$ {}'/*,JSON.stringify(data,null,'\t')*/)
    this.board = board
    })


    // subscribe to card data
    /**
     * - Opening side bar when clicked on messages icon and open comments tab:
     * this must be implemented both ways: must open sidebar and emit an event onDetails(item)
     * so the item can be fetched by the container
     */
    this.onShowMessages.subscribe(
        card => {
          this.isSidebarOpen=true;
          this.sideBarTabIndex = 1; // messages tab

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
