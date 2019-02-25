import {
    Component,
    Input,
    Output,
    OnInit,
    AfterViewInit,
    EventEmitter,
    ElementRef,
    ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';
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
  styleUrls: ['./column-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  dragCardFrameGreenId: string = ''; // drag/drop enable/disable color
  dragCardFrameRedId: string = '';
  dragOverId: string = ''
  dragColumnFrameInTimer: boolean = false;
  colorDragCardFrameInTimer: boolean = false;
  toggleColumnTitleEdit: boolean = false
  readonly DRAG_EFFECT_TIMEOUT: number = 1000

  currentCardDragPos: string[] = ['', '']

  getCardCount(): number {
    return this.database.getCardCountPerColumn(this.column.id);
  }

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
       this.board$ = this.boardSubject$;
       this.board$.subscribe(board => {
           this.board = board
           this.database = new Database(this.boardSubject$, this.board, this.cd);
      }

      )
  }

    refresh() {
        this.cd.detectChanges();
    }

  getCards(columnId: string, board: Board): Card[] {
    return board.cards.filter(card => columnId === card.columnId)
  }

  handleDragOver_ColFrame(event, node) {
    event.preventDefault();

    const srcCardId = this.extractDragSourceId(event)
    const srcCard = this.board.cards.find(entry => entry.id === srcCardId)

    const columnCardCount = this.board.cards.filter(entry => entry.columnId === this.column.id).length
    this.dragColumnFrameClass = ''   // reset drag indicator

    if (columnCardCount > 0)return; // perform card based drop. giving priority for card drop guesture

    if (!this.validateDropRulesWrapper(srcCard.id, this.column.id)) { // functionality from internal method
      this.colorDragColumnFrameArea('drag-column-frame-red') // color card to show that drag is not allowed.
    } else
      this.colorDragColumnFrameArea('drag-column-frame-green') // color card to show that drag is not allowed.

  }

  
  handleDrop_ColFrame(event, column) {
    event.preventDefault();
    const srcCardId = this.extractDragSourceId(event)
    this.dragColumnFrameClass = ''; // remove colouring
    // TODO: there is no this.dragOverId when drag over empty column!
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
        if (!targetCard || !targetCard.columnId) { // in case of dragging into empty column there will be no target card id!!!!
           console.log('ColumnComponentComponent # handleDropInternal **** no target card, guess is that happens when dragging into empty column! targetCardId, targetCard:', targetCardId, targetCard)
           srcCard.columnId = targetColumnId
           srcCard.order = 0 // it goes first
        } else {
          srcCard.columnId = targetCard.columnId
          const tatgetOrderPosition: number = targetCard.order
          this.database.promoteOrderAfterCard(targetCard, 2);
          srcCard.order = tatgetOrderPosition + 1 // we inserting after this card
        }
        // next on datasource + trigger event
        this.database.updateDatasouce() // next on datasource./
      }

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
     this.dragColumnFrameClass = ''; // remove colouring
  }

  handleDragEnd_CardFrame(event) {
    this.dragCardFrameGreenId = ''
    this.dragCardFrameRedId = ''
  }

  handleDrop_CardFrame(event, column: Column) {
    const srcCardId = this.extractDragSourceId(event)
    this.handleDropInternal(srcCardId, this.dragOverId, column.id)
    this.dragCardFrameGreenId = ''
    this.dragCardFrameRedId = ''
  }

  handleDragOver_CardFrame(event, overCard) {
    event.preventDefault();

    // event.currentTarget,


    const srcCardId = this.extractDragSourceId(event)
    const srcCard = this.board.cards.find(entry => entry.id === srcCardId)

    const columnCardCount = this.board.cards.filter(entry => entry.columnId === this.column.id).length

    this.dragOverId = overCard.id; // this is used for drop

    if (!this.validateDropRulesWrapper(srcCardId, this.column.id)) { // functionality from internal method
      this.colorDragCardFrameAreaRed(overCard.id) // color card to show that drag is not allowed.
    } else
      this.colorDragCardFrameAreaGreen(overCard.id)   // updates DragCardFrameId // color card to show that drag is not allowed.
  }

  colorDragCardFrameAreaGreen = (valueOn) => {

    this.dragCardFrameGreenId = valueOn;
    this.dragCardFrameRedId = ''

    if (!this.colorDragCardFrameInTimer) {
      this.colorDragCardFrameInTimer = true;
      setTimeout(() => {
        this.dragCardFrameGreenId = '';
        this.colorDragCardFrameInTimer = false;
        this.refresh()
      }, this.DRAG_EFFECT_TIMEOUT);
    }
  }

  colorDragCardFrameAreaRed = (valueOn) => {

    this.dragCardFrameRedId = valueOn;
    this.dragCardFrameGreenId = ''

    if (!this.colorDragCardFrameInTimer) {
      this.colorDragCardFrameInTimer = true;
      setTimeout(() => {
        this.dragCardFrameRedId = '';
        this.colorDragCardFrameInTimer = false;
          this.refresh()
      }, this.DRAG_EFFECT_TIMEOUT);
    }
  }


  validateDropRulesWrapper(srcCardId: string, targetColumnId: string): boolean {

    const srcCard = this.board.cards.find(entry => entry.id === srcCardId)

    if (!srcCard) {
      console.log('ColumnComponentComponent # validateDropRulesWrapper ****** card not found ', srcCardId, ' board_cards.len '  , this.board.cards.length)
      return;
    }
    const srcColumn = this.board.columns.find(entry => entry.id === srcCard.columnId)

    const targColumn = this.board.columns.find(entry => entry.id === targetColumnId)

    return srcCard.columnId === targetColumnId || this.validateDropRules({src: srcColumn, dst: targColumn, elem: srcCard} as IStatusChange)

  }

  colorDragColumnFrameArea = (colorOn) => {

    this.dragColumnFrameClass = colorOn;
    if (!this.dragColumnFrameInTimer) {
      this.dragColumnFrameInTimer = true;
      setTimeout(() => {
        this.dragColumnFrameClass = '';
        this.dragColumnFrameInTimer  = false;
        this.refresh()
      }, this.DRAG_EFFECT_TIMEOUT);
    }


  }



extractDragSourceId(event): string {
  return event.dataTransfer.types.find(entry => entry.includes('id=')).substr(3);
}

  onColumnTitleSubmit() {
    this.database.updateDatasouce()
    this.toggleColumnTitleEdit = false
  }

  onColumnTitleClick() {
    if (!this.toggleColumnTitleEdit) {
      this.onClickColumnTitle.emit(this.column)  // emit event
      this.toggleColumnTitleEdit = true  // change to edit
    }
  }




}
