import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, NgZone} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Database} from "../shared/status-pipeline-module.database";
import {
  IPipelineColumn,
  IPipelineColumnElement,
  IStatusChange,
  ITransition
} from "../shared/status-pipeline-module.interface";
import {Column} from "../shared/column";
import {Board} from "../shared/board";
import {StatusPipelineShared} from "../shared/status-pipeline-shared";


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



  addingColumn = false;
  addColumnText: string;
  editingTilte = false;
  currentTitle: string;
  boardWidth: number;
  columnsAdded = 0;

  constructor(
     statusPipelineShared: StatusPipelineShared ) {



  }

  ngOnInit() {
    this.board$ = this.boardSubject$
    this.board$.subscribe(board => {
      console.log('BoardComponent#constructor subscribe board$ {}'/*,JSON.stringify(data,null,'\t')*/)
      this.board = board
    })
  }

  editTitle() {
    this.currentTitle = this.board.title;
    this.editingTilte = true;
  }

}
