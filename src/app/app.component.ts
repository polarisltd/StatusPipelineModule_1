import {Component, EventEmitter, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {DataSource} from "./DataSource";
import {Board} from "./modules/task-pipeline/shared/board";
import {
  IPipelineColumn,
  IPipelineColumnElement,
  IStatusChange
} from "./modules/task-pipeline/shared/status-pipeline-module.interface";
import {MessagesPortalService} from "./modules/task-pipeline/shared/messages-portal-service";
import {ComponentPortal, Portal} from "@angular/cdk/portal";
import {DemoMessagesComponent} from "./demo-messages-component";





@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [DataSource]
})
export class AppComponent implements OnInit{

  ALLOWED_TRANSITIONS = [
    ['001-002','001-003'],
    ['001-003','001-004'],
    ['001-004','001-005']
  ]

  validateDragFunction: Function;
  boardSubject$ : Subject<Board>
  dataSource: DataSource;
  onTransition = new EventEmitter<IStatusChange>();
  onClickColumnTitle = new EventEmitter<IPipelineColumn>();
  onShowMessages = new EventEmitter<IPipelineColumnElement>();
  onAddCard = new EventEmitter<IPipelineColumnElement>();
  onDeleteCard = new EventEmitter<IPipelineColumnElement>();
  onUpdateCard = new EventEmitter<IPipelineColumnElement>();
  onRemoveColumn = new EventEmitter<IPipelineColumn>();

  messageArea: string = 'Demo events.'

  constructor(dataSource: DataSource,
              messagePortalService:MessagesPortalService
  ) {
    this.dataSource = dataSource;
    this.onTransition.subscribe(item => this.showMessage('Drag-n-drop:',item))
    this.onClickColumnTitle.subscribe(item => this.showMessage('click column:',item))
    this.onAddCard.subscribe(item => this.showMessage('addCard:',item))
    this.onUpdateCard.subscribe(item => this.showMessage('updateCard',item))
    this.onDeleteCard.subscribe(item => this.showMessage('deleteCard',item))
    this.onRemoveColumn.subscribe(item => this.showMessage('deleteColumn',item))
    this.onShowMessages.subscribe(item => {
      this.showMessage('onShowMessage',item)
      const portal   = new ComponentPortal(DemoMessagesComponent);
      messagePortalService.setPortal(portal)
    })

  }

  ngOnInit() {
    this.boardSubject$ = this.dataSource.boardSubject$
    this.validateDragFunction = this.validateDropRules.bind(this); // bind actual method

  }


  /** Actual validation function */
  validateDropRules(statusChange: IStatusChange):boolean{

    console.log('app.component#validateDragRules  ',statusChange)

    return (this.ALLOWED_TRANSITIONS.filter(

        elem => elem[0] === statusChange.src.id &&
                  elem[1] === statusChange.dst.id
    ).length > 0)

  }


  showMessage(prefix:string, value:string){

      this.messageArea =  prefix + JSON.stringify(value)
      console.log('=>',this.messageArea)
      setTimeout(() => {
          this.messageArea = 'Demo events.'
      }, 10000);
  }


}
