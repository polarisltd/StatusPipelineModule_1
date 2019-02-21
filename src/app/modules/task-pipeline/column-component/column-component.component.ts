import {Component, Input, Output, OnInit, AfterViewInit, EventEmitter, ElementRef} from '@angular/core';
// tslint:disable-next-line:import-blacklist
import {Observable, Subject} from 'rxjs';
import {Database} from '../shared/status-pipeline-module.database';
import {Board} from '../shared/board';
import {Column} from '../shared/column';
import {Card} from '../shared/card';
import {IPipelineColumn, IPipelineColumnElement, IStatusChange} from '../shared/status-pipeline-module.interface';



@Component({
  // tslint:disable-next-line
  selector: 'app-column-component',
  templateUrl: './column-component.component.html',
  styleUrls: ['./column-component.component.css']
})
export class ColumnComponentComponent implements OnInit {

  DEBUG_LOG_ENABLED = false

  @Input()
  boardSubject$: Subject<Board> // initialised and provided by board component
  @Input()
  column: Column; // column on which this item having ownership
  @Input() onTransition: EventEmitter<IStatusChange>; // card, fromCol, toCol
  @Input() onClickColumnTitle: EventEmitter<IPipelineColumn>;
  @Input() validateDropRules: Function
  @Input() onAddCard: EventEmitter<Card>;
  @Input() onRemoveColumn: EventEmitter<IPipelineColumn>;
  @Input() onShowMessages: EventEmitter<IPipelineColumnElement>;
  @Input() onUpdateCard: EventEmitter<Card>;
  @Input() onDeleteCard: EventEmitter<Card>;
  //
  @Input() onShowNotifications: EventEmitter<IPipelineColumnElement>;
  @Input() onShowProjectRooms: EventEmitter<IPipelineColumnElement>;
  @Input() onRemoveFromFavorites: EventEmitter<IPipelineColumnElement>;
  @Input() onShowDocuments: EventEmitter<IPipelineColumnElement>;
  @Input() onArrowPress: EventEmitter<IPipelineColumnElement>;
  @Input() onShowTask: EventEmitter<IPipelineColumnElement>;



  board$: Observable<Board>;

  database: Database
  board: Board
  dragColumnFrameClass: string = ''; // drag/drop enable/disable color
  DragCardFrameGreenId: string = ''; // drag/drop enable/disable color
  DragCardFrameRedId: string = '';
  dragOverId: string = ''
  inTimer: boolean = false;
  toggleColumnTitleEdit: boolean = false
  getCardCount(): number {
    return this.database.getCardCountPerColumn(this.column.id);
  }

  constructor( ) {
  }

  ngOnInit() {
       this.board$ = this.boardSubject$;
       this.board$.subscribe(board => {
           // console.log('ColumnComponent#ngOnInit board$.subscribe '/*, JSON.stringify(board,null,'\t')*/)
           this.board = board
           this.database = new Database(this.boardSubject$, this.board);
      }

      )
  }

  getCards(columnId: string, board: Board): Card[] {
    return board.cards.filter(card => columnId === card.columnId)
  }

  onColumnClick(event) {
    console.log('ColumnComponent#-> onColumnClick ', this.column.title)
    this.onClickColumnTitle.emit(this.column)
  }


  handleDragStart(event, node) {
  }

  handleDragOver_ColFrame(event, node) {
    event.preventDefault();
    if (this.DEBUG_LOG_ENABLED)console.log('ColumnComponent#handleDragOver_ColFrame')
    
    const srcCardId = this.extractDragSourceId(event)
    const srcCard = this.board.cards.find(entry => entry.id === srcCardId)

    const columnCardCount = this.board.cards.filter(entry => entry.columnId === this.column.id).length
    this.dragColumnFrameClass = ''   // reset drag indicator

    if (columnCardCount > 0)return; // perform card based drop. giving priority for card drop guesture

    if (!this.validateDropRulesWrapper(srcCard.id, this.column.id)) { // functionality from internal method
      this.colorDragProtectedArea('drag-column-frame-red') // color card to show that drag is not allowed.
    } else
      this.colorDragProtectedArea('drag-column-frame-green') // color card to show that drag is not allowed.

  }

  
  handleDrop_ColFrame(event, column) {
    event.preventDefault();
    const srcCardId = this.extractDragSourceId(event)
    console.log('ColumnComponent#handleDrop-ColFrame', 'card => tcard,column ', srcCardId, '=>', this.dragOverId, column.id)
    this.dragColumnFrameClass = ''; // remove colouring
    this.handleDropInternal(srcCardId, this.dragOverId, column.id)
  }


  handleDropInternal(srcCardId: string, targetCardId: string, targetColumnId: string ) {

    // find originating column
    const srcColumnId =  this.board.cards.find(entry => entry.id === srcCardId).columnId;

    const targColumnCardCount = this.board.cards.filter(entry => entry.columnId === targetColumnId).length
     if (srcCardId === targetCardId)return; // dont try to drag on self
 
    if (this.validateDropRulesWrapper(srcCardId, targetColumnId)) {
      if (targColumnCardCount === 0) {
        this.database.moveCard(srcCardId, targetColumnId)  // card => column
      } else { // card => over placeholder card.
        
        const srcCard =  this.board.cards.find(entry => entry.id === srcCardId);
        const targetCard =  this.board.cards.find(entry => entry.id === targetCardId);
        
        // moved card is getting that column id were drag target is found.
        srcCard.columnId = targetCard.columnId
        const tatgetOrderPosition: number = targetCard.order
        this.database.promoteOrderAfterCard(targetCard, 2);
        srcCard.order = tatgetOrderPosition + 1 // we inserting after this card
        // next on datasource + trigger event
        this.database.updateDatasouce() // next on datasource./

      }
 
      // TODO: move card after given one
      
      const toColumn = this.board.columns.find(entry => entry.id === targetColumnId);
      const fromColumn = this.board.columns.find(entry => entry.id === srcColumnId);
      const movedCard = this.board.cards.find(entry => entry.id === srcCardId);
      
      const statusChange = {
        src: fromColumn,
        dst: toColumn,
        elem: movedCard
      } as IStatusChange;

      this.onTransition.emit(statusChange)
    }
  }

  handleDragEnd_ColFrame(event) {
  }

  handleDragEnd_CardFrame(event) {
    this.DragCardFrameGreenId = ''
    this.DragCardFrameRedId = ''
  }

  handleDrop_CardFrame(event, column: Column) {
    const srcCardId = this.extractDragSourceId(event)
    this.handleDropInternal(srcCardId, this.dragOverId, column.id)
    this.DragCardFrameGreenId = ''
    this.DragCardFrameRedId = ''
  }

  handleDragOver_CardFrame(event, overCard) {
    event.preventDefault();

    // event.currentTarget,


    const srcCardId = this.extractDragSourceId(event)
    const srcCard = this.board.cards.find(entry => entry.id === srcCardId)

    const columnCardCount = this.board.cards.filter(entry => entry.columnId === this.column.id).length


    // if (columnCardCount>0)return; // perform card based drop. giving priority for card drop guesture

    this.dragColumnFrameClass = ''   // reset column guesture drag indicator
    
    if (!this.validateDropRulesWrapper(srcCardId, this.column.id)) { // functionality from internal method
      this.colorDragCardFrameAreaRed(overCard.id) // color card to show that drag is not allowed.
    } else
      this.colorDragCardFrameAreaGreen(overCard.id)   // updates DragCardFrameId // color card to show that drag is not allowed.
  }

  colorDragCardFrameAreaGreen = (valueOn) => {

    this.DragCardFrameGreenId = valueOn;
    this.DragCardFrameRedId = ''

        this.dragOverId = valueOn; // this is used for drop
    if (!this.inTimer) {
      this.inTimer = true;
      setTimeout(() => {
        this.DragCardFrameGreenId = '';
        this.inTimer = false;
      }, 1000);
    }
  }

  colorDragCardFrameAreaRed = (valueOn) => {

    this.DragCardFrameRedId = valueOn;
    this.DragCardFrameGreenId = ''

        this.dragOverId = valueOn; // this is used for drop
    if (!this.inTimer) {
      this.inTimer = true;
      setTimeout(() => {
        this.DragCardFrameRedId = '';
        this.inTimer = false;
      }, 1000);
    }
  }


  validateDropRulesWrapper(srcCardId: string, targetColumnId: string): boolean {

    const srcCard = this.board.cards.find(entry => entry.id === srcCardId)

    if (!srcCard) {
      console.log('****** card not found ', srcCardId, ' board_cards.len '  , this.board.cards.length)
      return;
    }
    const srcColumn = this.board.columns.find(entry => entry.id === srcCard.columnId)

    const targColumn = this.board.columns.find(entry => entry.id === targetColumnId)

    return srcCard.columnId === targetColumnId || this.validateDropRules({src: srcColumn, dst: targColumn, elem: srcCard} as IStatusChange)

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



extractDragSourceId(event): string {
  return event.dataTransfer.types.find(entry => entry.includes('id=')).substr(3);
}

  onColumnTitleSubmit() {
    console.log('New column title ', this.column.title)
    this.database.updateDatasouce()
    this.toggleColumnTitleEdit = !this.toggleColumnTitleEdit
  }

  onColumnTitleClick() {
    if (!this.toggleColumnTitleEdit) {
      this.onClickColumnTitle.emit(this.column)  // emit event
      this.toggleColumnTitleEdit = true  // change to edit
    }
  }




}
