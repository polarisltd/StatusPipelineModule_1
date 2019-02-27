import {Component, EventEmitter, Input, OnInit} from '@angular/core';
// tslint:disable-next-line:import-blacklist
import {Subject} from 'rxjs';
import {DataSource} from './DataSource';
import {Board} from './modules/task-pipeline/shared/board';
import {
  IPipelineColumn,
  IPipelineColumnElement,
  IStatusChange
} from './modules/task-pipeline/shared/status-pipeline-module.interface';
import {MessagesPortalService} from './modules/task-pipeline/shared/messages-portal-service';
import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {DemoMessagesComponent} from './demo-messages-component';





@Component({
  // tslint:disable-next-line
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [DataSource]
})
export class AppComponent implements OnInit {

  ALLOWED_TRANSITIONS = [
    ['001-002', '001-003'],
    ['001-003', '001-004'],
    ['001-004', '001-005'],
    ['001-004', '001-006'],
    ['001-004', '001-007'],

    // allowed to move into empty columns except 001-005

    ['001-002', '001-006'],
    ['001-002', '001-007'],

    ['001-003', '001-006'],
    ['001-003', '001-007'],

    ['001-004', '001-006'],
    ['001-004', '001-007'],





  ]

  validateDragFunction: Function;
  boardSubject$: Subject<Board>
  // dataSource: DataSource;
  onTransition = new EventEmitter<IStatusChange>();
  onClickColumnTitle = new EventEmitter<IPipelineColumn>();
  onShowMessages = new EventEmitter<IPipelineColumnElement>();
  onAddCard = new EventEmitter<IPipelineColumnElement>();
  onDeleteCard = new EventEmitter<IPipelineColumnElement>();
  onUpdateCard = new EventEmitter<IPipelineColumnElement>();
  onRemoveColumn = new EventEmitter<IPipelineColumn>();
  //
  onShowNotifications = new  EventEmitter<IPipelineColumnElement>();
  onShowProjectRooms  = new  EventEmitter<IPipelineColumnElement>();
  onRemoveFromFavorites  = new  EventEmitter<IPipelineColumnElement>();
  onShowDocuments  = new  EventEmitter<IPipelineColumnElement>();
  onArrowPress  = new  EventEmitter<IPipelineColumnElement>();
  onShowTask  = new  EventEmitter<IPipelineColumnElement>();


  messageArea: string = 'Demo events.'

  constructor(private dataSource: DataSource,
              private messagePortalService: MessagesPortalService
  ) {
    // this.dataSource = dataSource;
    this.onTransition.subscribe(item => this.showMessage('Drag-n-drop:', item))
    this.onClickColumnTitle.subscribe(item => this.showMessage('click column:', item))
    this.onAddCard.subscribe(item => this.showMessage('addCard:', item))
    this.onUpdateCard.subscribe(item => this.showMessage('updateCard', item))
    this.onDeleteCard.subscribe(item => this.showMessage('deleteCard', item))
    this.onRemoveColumn.subscribe(item => this.showMessage('deleteColumn', item))
    this.onShowNotifications.subscribe(item => this.showMessage('onShowNotifications', item))
    this.onShowProjectRooms.subscribe(item => this.showMessage('onShowProjectRooms', item))
    this.onRemoveFromFavorites.subscribe(item => this.showMessage('onRemoveFromFavorites', item))
    this.onShowDocuments .subscribe(item => this.showMessage('onShowDocuments', item))
    this.onArrowPress .subscribe(item => this.showMessage('onArrowPress', item))
    this.onShowTask .subscribe(item => this.showMessage('onShowTask', item))

    this.onShowMessages.subscribe(card => {

      this.showMessage('AppComponent£onShowMessage we providing Portal component along with data!', card)
      //
      // TODO: provide input parameter and pass it into component to be portaled!
      //
      const portal   = new ComponentPortal(DemoMessagesComponent);
      messagePortalService.setPortal(portal) // portalDSertvice.next()
    })

  }

  ngOnInit() {
    this.boardSubject$ = this.dataSource.boardSubject$
    this.validateDragFunction = this.validateDropRules.bind(this); // bind actual method

  }


  /** Actual validation function */
  validateDropRules(statusChange: IStatusChange): boolean {

    if (!statusChange || !statusChange.src || !statusChange.dst) {
        console.log('AppComponent# validateDropRules   **error*** possible dst is undefined ', statusChange)
        return false;
    } else
      return (this.ALLOWED_TRANSITIONS.filter(
        elem => elem[0] === statusChange.src.id &&
                  elem[1] === statusChange.dst.id
    ).length > 0)

  }


  showMessage(prefix: string, value: string) {

      this.messageArea =  prefix + JSON.stringify(value)
      setTimeout(() => {
          this.messageArea = 'Demo events.'
      }, 10000);
  }

}
