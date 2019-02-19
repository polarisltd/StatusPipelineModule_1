import {Component, Input, Output, OnInit, AfterViewInit, EventEmitter, ElementRef} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Database} from "../shared/status-pipeline-module.database";
import {Board} from "../shared/board";
import {Column} from "../shared/column";
import {Card} from "../shared/card";
import {IPipelineColumn, IPipelineColumnElement, IStatusChange} from "../shared/status-pipeline-module.interface";



@Component({
  selector: 'app-column-component',
  templateUrl: './column-component.component.html',
  styleUrls: ['./column-component.component.css']
})
export class ColumnComponentComponent implements OnInit {


  @Input()
  boardSubject$: Subject<Board> // initialised and provided by board component
  @Input()
  column: Column; // column on which this item having ownership
  @Input() onTransition : EventEmitter<IStatusChange>; // card, fromCol, toCol
  @Input() onClickColumnTitle : EventEmitter<IPipelineColumn>;
  @Input() validateDropRules: Function
  @Input() onAddCard: EventEmitter<Card>;
  @Input() onRemoveColumn : EventEmitter<IPipelineColumn>;
  @Input() onShowMessages : EventEmitter<IPipelineColumnElement>;
  @Input() onUpdateCard: EventEmitter<Card>;
  @Input() onDeleteCard: EventEmitter<Card>;
  //
  @Input() onShowNotifications : EventEmitter<IPipelineColumnElement>;
  @Input() onShowProjectRooms : EventEmitter<IPipelineColumnElement>;
  @Input() onRemoveFromFavorites : EventEmitter<IPipelineColumnElement>;
  @Input() onShowDocuments : EventEmitter<IPipelineColumnElement>;
  @Input() onArrowPress : EventEmitter<IPipelineColumnElement>;
  @Input() onShowTask : EventEmitter<IPipelineColumnElement>;



  board$ : Observable<Board>;

  database: Database
  board : Board
  dragColumnFrameClass: string = ''; // drag/drop enable/disable color
  DragCardFrameId: string = ''; // drag/drop enable/disable color
  dragOverId: string = ''
  inTimer:boolean = false;

  getCardCount():number{
    return this.database.getCardCountPerColumn(this.column.id);
  }

  constructor( ) {
  }

  ngOnInit() {
       this.board$ = this.boardSubject$;
       this.board$.subscribe(board => {
           // console.log('ColumnComponent#ngOnInit board$.subscribe '/*, JSON.stringify(board,null,'\t')*/)
           this.board = board
           this.database = new Database(this.boardSubject$,this.board);
      }

      )
  }

  getCards(columnId: string, board:Board): Card[]{
    return board.cards.filter(card => columnId === card.columnId)
  }

  onColumnClick(event){
    console.log('ColumnComponent#-> onColumnClick ',this.column.title)
    this.onClickColumnTitle.emit(this.column)
  }


  handleDragStart(event, node) {
  }

  handleDragOver_ColFrame(event, node) {
    event.preventDefault();
    console.log('ColumnComponent#handleDragOver_ColFrame')
    this.colorDragProtectedArea('drag-column-frame-green')

    /*
    const srcCardId = this.extractDragSourceId(event)
    const srcCard = this.board.cards.find(entry => entry.id === srcCardId)

    const columnCardCount = this.board.cards.filter(entry => entry.columnId === this.column.id).length
    this.dragClass = ''   // reset drag indicator
    if (columnCardCount>0)return; // perform card based drop

    if(!this.validateDropRulesWrapper(srcCard.id,this.column.id)) { // functionality from internal method
      this.colorDragProtectedArea(node,'drag-color-refuse','drag-color-0') // color card to show that drag is not allowed.
    }else
      this.colorDragProtectedArea(node,'drag-color-ok','drag-color-0') // color card to show that drag is not allowed.
    */

  }


  handleDrop_ColFrame(event, column) {
    const srcCardId = this.extractDragSourceId(event)
    console.log('ColumnComponent#handleDrop-ColFrame','card => tcard,column ',srcCardId,'=>', this.dragOverId,column.id)
    this.dragColumnFrameClass = '';
  }

  handleDrop_(event, node) {
    event.preventDefault();
    // const dragId = event.dataTransfer.getData('foo')
    const dragId = this.extractDragSourceId(event)
    console.log('ColumnComponent#handleDrop ',dragId,'->',node.id)

    const columnCardCount = this.board.cards.filter(entry => entry.columnId === this.column.id).length
    if (columnCardCount>0)return; // instead perform card based drop

    // external validator

    if(this.validateDropRulesWrapper(dragId,node.id)){
      console.log('ColumnComponent#handleDrop - MOVING')
      this.database.moveCard(dragId, node.id)  // card => column

      const movedCard =  this.board.cards.find(entry => entry.id === dragId);
      const fromColumn = this.board.columns.find(entry => entry.id === movedCard.columnId);
      const toColumn = this.board.columns.find(entry => entry.id === node.id);


      const statusChange = {
        src:fromColumn,
        dst:toColumn,
        elem:movedCard
      } as IStatusChange;

      console.log('emitting statusChange: ', statusChange)
      this.onTransition.emit(statusChange)
    }
  }

  handleDragEnd_ColFrame(event) {
    console.log('ColumnComponent#handleDragEnd_ColFrame')
  }

  handleDragEnd_CardFrame(event) {
    console.log('ColumnComponent#handleDragEnd_CardFrame')
    this.DragCardFrameId=''
  }

  handleDrop_CardFrame(event, column:Column) {
    const srcCardId = this.extractDragSourceId(event)
    console.log('ColumnComponent#handleDrop_CardFrame',' card => card,column ',srcCardId,'=>', this.dragOverId,column.id)
    this.DragCardFrameId=''
  }

  handleDragOver_CardFrame(event, node) {
    event.preventDefault();
    console.log('ColumnComponent#handleDragOver_CardFrame',node.id)
    // event.currentTarget,
    this.colorDragProtectedArea1(node.id)

  }

  colorDragProtectedArea1 = (valueOn) => {

    this.DragCardFrameId = valueOn;
    this.dragOverId = valueOn; // this is used for drop
    if (!this.inTimer) {
      this.inTimer = true;
      setTimeout(() => {
        this.DragCardFrameId = '';
        this.inTimer = false;
      }, 1000);
    }
  }




  validateDropRulesWrapper(srcCardId:string, targetColumnId: string):boolean{

    const srcCard = this.board.cards.find(entry => entry.id === srcCardId)

    if(srcCard)
      console.log('CardComponent#validateRules #sourceId card/col => col' ,srcCardId,'/',srcCard.columnId,' => '   ,targetColumnId    )
    else{
      console.log('****** card not found ',srcCardId,' board_cards.len '  , this.board.cards.length)
      return;
    }
    const srcColumn = this.board.columns.find(entry => entry.id === srcCard.columnId)

    const targColumn = this.board.columns.find(entry => entry.id === targetColumnId)

    return this.validateDropRules({src:srcColumn,dst:targColumn,elem:srcCard} as IStatusChange)

  }





  colorDragProtectedArea = (colorOn) => {

    this.dragColumnFrameClass = colorOn;
    if (!this.inTimer) {
      this.inTimer = true;
      setTimeout(() => {
        this.dragColumnFrameClass = 'drag-column-frame-off';
        this.inTimer = false;
      }, 2000);
    }


  }



  onColumnButtonClick(column){
  console.log('ColumnComponent#onColumnButtonClick_AddCard ' , column.id)
  const c:Card = this.database.addCardRefColumn(column.id)
  this.onAddCard.emit(c)
}

onColumnButtonClickRemove(column){
  console.log('ColumnComponent#onColumnButtonClick' , column.id)
  const removedColumn :Column = this.database.removeColumn(column.id)
  this.onRemoveColumn.emit(removedColumn)

}


extractDragSourceId(event):string{
  return event.dataTransfer.types.find(entry => entry.includes("id=")).substr(3);
}

clickAnything(){
    console.log('you clicked a button!' )
}

}
