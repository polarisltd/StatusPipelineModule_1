
import { Observable } from 'rxjs';
import { Subject } from "rxjs";
import {Card} from "./card";
import {Column} from "./column";
import {Board} from "./board";
import {IPipelineColumn, IPipelineColumnElement} from "./status-pipeline-module.interface";


export class Database {

  dndSourceCard: Card;
  dndTargetColumn: Column;



  boardInternal: Board;
  board$: Observable<Board>;
  boardSubject$: Subject<Board>;


  constructor(boardSubject$: Subject<Board>,
              board : Board) {
    console.log('Database# constructor{}')
    this.boardSubject$ = boardSubject$;
    this.boardInternal = board;
  }

  setupObservable(){


    // Important!
    // remebemr that observable will return data later then expected :)


   // this.boardSubject$.next(this.board);

  }


  public getBoardObservable(): Observable<Board> {
    
    return this.board$

  }


  removeCard(cardId: string) {
    const c: Card = this.boardInternal.cards.find(c => c.id === cardId)
    this.boardInternal.cards.splice(
      this.boardInternal.cards.indexOf(c), 1
    )
    this.boardSubject$.next(this.boardInternal);
  }

  addCardRefCard(cardId: string):Card {
    const card: Card = this.boardInternal.cards.find(c => c.id === cardId)
    const newCard = new Card()
    newCard.id = this.uuidv4()
    newCard.boardId = card.boardId
    newCard.columnId = card.columnId
    newCard.title = 'new card'
    newCard.content = 'coming soon'

    this.boardInternal.cards.push(newCard)
    this.boardSubject$.next(this.boardInternal);  // submit to topic
    return newCard;
  }

  addCardRefColumn(columnId: string): Card  {
    const c: Column = this.boardInternal.columns.find(c => c.id === columnId)
    const newCard = new Card()
    newCard.id = this.uuidv4()
    newCard.boardId = c.boardId
    newCard.columnId = c.id
    newCard.title = 'new card'
    newCard.content = 'coming soon'

    this.boardInternal.cards.push(newCard)
    this.boardSubject$.next(this.boardInternal);  // submit to topic
    return newCard;
  }


  getColumn(columnId:string):IPipelineColumn  {
    const column: Column =  this.boardInternal.columns.find(c => c.id === columnId);
    return column;
  }

  getCard(columnId:string):IPipelineColumnElement  {
    const card: Card =  this.boardInternal.cards.find(c => c.id === columnId);
    return card;
  }

  /** drag n drop support. Move card to different column */
  moveCard(cardId, targetColumnId) {

    console.log('moveCard boardInternal',this.boardInternal)

    const card: Card = this.boardInternal.cards.find(c => c.id === cardId)

    const idxC = this.boardInternal.cards.indexOf(card)

    this.boardInternal.cards[idxC].columnId = targetColumnId;

    console.log('moving card->column ', this.boardInternal.cards[idxC].id, ' -> ', this.boardInternal.cards[idxC].columnId)

    this.boardSubject$.next(this.boardInternal);

  }


  removeColumn(columnId: string) {
    const column: Column = this.boardInternal.columns.find(c => c.id === columnId)
    // make sure to remove only empty
    const cardsInThisColumn: Card[] = this.boardInternal.cards.filter(c => c.columnId === columnId)
    if (!cardsInThisColumn || cardsInThisColumn.length === 0)
      this.boardInternal.columns.splice(
        this.boardInternal.columns.indexOf(column), 1
      )
    this.boardSubject$.next(this.boardInternal);
    return column;
  }



  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }




}
