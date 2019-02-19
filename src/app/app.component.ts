import {Component, EventEmitter, Input, OnInit} from '@angular/core';
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
    ['001-004','001-005'],
    ['001-004','001-006'],
    ['001-004','001-007'],

    // allowed to move into empty columns except 001-005

    ['001-002','001-006'],
    ['001-002','001-007'],

    ['001-003','001-006'],
    ['001-003','001-007'],

    ['001-004','001-006'],
    ['001-004','001-007'],





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
  //
  onShowNotifications = new  EventEmitter<IPipelineColumnElement>();
  onShowProjectRooms  = new  EventEmitter<IPipelineColumnElement>();
  onRemoveFromFavorites  = new  EventEmitter<IPipelineColumnElement>();
  onShowDocuments  = new  EventEmitter<IPipelineColumnElement>();
  onArrowPress  = new  EventEmitter<IPipelineColumnElement>();
  onShowTask  = new  EventEmitter<IPipelineColumnElement>();


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
    this.onShowNotifications.subscribe(item => this.showMessage('onShowNotifications',item))
    this.onShowProjectRooms.subscribe(item => this.showMessage('onShowProjectRooms',item))
    this.onRemoveFromFavorites.subscribe(item => this.showMessage('onRemoveFromFavorites',item))
    this.onShowDocuments .subscribe(item => this.showMessage('onShowDocuments',item))
    this.onArrowPress .subscribe(item => this.showMessage('onArrowPress',item))
    this.onShowTask .subscribe(item => this.showMessage('onShowTask',item))




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

/*

https://stackoverflow.com/questions/47469844/angular-cdk-how-to-set-inputs-in-a-componentportal

ou can create custom injector and inject it to the component portal you create. -

createInjector(dataToPass): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(CONTAINER_DATA, dataToPass);
    return new PortalInjector(this._injector, injectorTokens);
  }
CONTAINER_DATA is a custom injector (InjectorToken) created by -

export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');
To consume created injector, use -

    let containerPortal = new ComponentPortal(ComponentToPort, null, this.createInjector({
          data1,
          data2
        }));

   overlay.attach(containerPortal);
overlay is instance of OverlayRef (Which is Portal Outlet)

Inside "ComponentToPort", you will need to inject the created injector -

@Inject(CONTAINER_DATA) public componentData: any

More on this here -

https://github.com/angular/material2/issues/8322

https://github.com/angular/material2/issues/8322

export const PORTAL_DATA = new InjectionToken<{}>('PortalData');

class ContainerComponent {
  constructor(private injector: Injector, private overlay: Overlay) {}

  attachPortal() {
    const componentPortal = new ComponentPortal(
      ComponentToPort,
      null,
      this.createInjector({id: 'first-data'})
    );
    this.overlay.create().attach(componentPortal);
  }

  private createInjector(data): PortalInjector {

    const injectorTokens = new WeakMap<any, any>([
      [PORTAL_DATA, data],
    ]);

    return new PortalInjector(this.injector, injectorTokens);
  }
}

class ComponentToPort {
  constructor(@Inject(PORTAL_DATA) public data ) {
    console.log(data);
  }
}

portal = new ComponentPortal(MyComponent);
this.portalHost = new DomPortalHost(
      this.elementRef.nativeElement,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );

const componentRef = this.portalHost.attach(this.portal);
componentRef.instance.myInput = data;
componentRef.instance.myOutput.subscribe(...);
componentRef.changeDetectorRef.detectChanges();






*/

}
