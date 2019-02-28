
import {
    Component,
    Input,
    Output,
    OnInit,
    AfterViewInit,
    EventEmitter,
    ElementRef,
    ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ViewRef
} from '@angular/core';
import { ViewChild} from '@angular/core';
import {Database} from '../shared/status-pipeline-module.database';
import {Card} from '../shared/card';
// tslint:disable-next-line:import-blacklist
import {Observable, Subject} from 'rxjs';
import {Board} from '../shared/board';
import {IPipelineColumnElement, IStatusChange} from '../shared/status-pipeline-module.interface';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Profile} from '../../profile/component/profile.model';
import {MatDialog, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogConfirmComponent} from '../dialog-confirm-component/dialog-confirm.component';
import {DialogEditCardComponent} from '../dialog-edit-card-component/dialog-edit-card.component';


@Component({
// tslint:disable-next-line
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponentComponent implements OnInit, OnDestroy {
  @ViewChild('emptyItem') emptyItem: ElementRef;
  @Input() boardSubject$: Subject<Board> // initialised and provided by board component
  @Input() card: Card;
  @Input() onAddCard: EventEmitter<IPipelineColumnElement>;
  @Input() onUpdateCard: EventEmitter<IPipelineColumnElement>;
  @Input() onDeleteCard: EventEmitter<IPipelineColumnElement>;
  @Input() onShowMessages: EventEmitter<IPipelineColumnElement>;
  //
  @Input() onShowNotifications: EventEmitter<IPipelineColumnElement>;
  @Input() onShowProjectRooms: EventEmitter<IPipelineColumnElement>;
  @Input() onRemoveFromFavorites: EventEmitter<IPipelineColumnElement>;
  @Input() onShowDocuments: EventEmitter<IPipelineColumnElement>;
  @Input() onArrowPress: EventEmitter<IPipelineColumnElement>;
  @Input() onShowTask: EventEmitter<IPipelineColumnElement>;
  //
  @Input() dragColorRedCardEvt: EventEmitter<string>;
  //
  @Input() validateDropRules: Function
  //
  database: Database;

  isCardEditMode: boolean = false;
  board$: Observable<Board>;
  board: Board
  cardForm: FormGroup;
  cardFormChanged: boolean = false;
  dragNodeState: string;
  dueDateEditTrigger: boolean = false
  dueDateFg: FormGroup;
  dragColorRedCardId: string = '';

  readonly DRAG_EFFECT_TIMEOUT: number = 1000;

  constructor(private fb: FormBuilder,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private dialog: MatDialog,
              private cd: ChangeDetectorRef
              ) {



      /** Due Date change group */
      this.dueDateFg = new FormGroup({
          due_date: new FormControl()
      });
      this.dueDateFg.controls['due_date'].valueChanges.subscribe(value => {
          this.card.due_date = this.formatDate(value)
      });

  }

  ngOnInit() {
        this.board$ = this.boardSubject$; // this.database.getBoardObservable()
        this.board$.subscribe(board => {
            this.board = board
            this.database = new Database(this.boardSubject$, this.board, this.cd);
            }
        )

      /** Build card edit form */
      this.cardForm = this.fb.group({
          'title': this.card.title,
          'status': this.card.status
      });
      this.cardForm.valueChanges.subscribe(form => {
          this.cardFormChanged = true;
          this.card.title = form.title;
          this.card.status = form.status;
      });

      /** This event is passed from Column component to visualize prohibited drop target */
      this.dragColorRedCardEvt.subscribe(id => {
          this.dragColorRedCardId = id;
          this.refresh()
          setTimeout(() => {
              this.dragColorRedCardId =  '';
              this.refresh()
          }, this.DRAG_EFFECT_TIMEOUT);
      })
  }


  ngOnDestroy() {
  }

  /** We using manual Angular Change Management so this call is request for change detection */
  refresh() {
          // trying to escape exception that component is already destroyed.
          if (!(this.cd as ViewRef).destroyed) {
              this.cd.detectChanges()
          }
  }

  /** DnDg Start handler. Source card reference needs to be inserted into event so target side can retrieve.
   * this.card == argument card so any can be used.
   * Notice that Drop operation is handled into Column Component*/
  handleDragStart(event, card) {
   this.insertDragSourceId(event, this.card.id)
  }


handleDragLeave(card) {
        this.dragNodeState = ''
}




clickExitUpdate() {
    // we will emit from formGroup change subscription.
    this.isCardEditMode = false
    if (this.cardFormChanged) {
        this.onUpdateCard.emit(this.card)
        this.isCardEditMode = false
    }
}


/** Extract source card id from event.dataTransfer.
 * Please read comment about encoding method */
insertDragSourceId(event, id: string) {
    // known behavior, dragOver did not make available originating item.
    // normally we insert drag source via event.dataTransfer.setData(key,value)
    // but now we cheat by inserting  event.dataTransfer.setData('key=value',whatever)
    // dragOver strips only value but not key so thats our backdoor solution
    event.dataTransfer.setData(`id=${id}`, 'data'); // whatever data
}



/** Populate Avatar companion object. It provides info about Avatar to be inserted. */
getProfile(card: Card): Profile {

  const profile =  {
    email         : card.responsible_email,
    first_name    : card.responsible_name,
    last_name     : card.responsible_name,
    bg_color      : 'black',
    fg_color      : 'white',
    image         : null
} as Profile;

    return profile;
}


    /** Button pres  handler: Show Project Room */
    clickBtnProjectRoom(card) {
        this.onShowProjectRooms.emit(card)
    }

    /** Button pres  handler: Show Messages */
    clickBtnMessage() {
        this.onShowMessages.emit(this.card)

    }

    /** Button pres  handler: Show Notifications
     * Button is shown if card attribute notificationCount > 0 */
    clickBtnNotifications(card) {
        this.onShowNotifications.emit(card)
    }

    /** Button pres  handler: Show Tasks */
    clickBtnShowTask(card) {
        this.onShowTask.emit(card)

    }

    /** Button pres  handler: Show Documents */
    clickBtnDocuments(card) {
        this.onShowDocuments.emit(card)
    }

    /** Button pres  handler: Favorite removal */
    clickBtnFavorite() {
        this.openDialogConfirm('Are you sure to remove this card from Favorites?',
            this.card,
            (result) => {
                if (result === 1) {
                    this.card.favorite = false;
                    this.database.updateDatasouce();
                    this.onRemoveFromFavorites.emit(this.card)
                }
             }
        )
    }

    /** Button press  handler: Right Arrow function */
    clickBtnRightArrow(card) {
        this.onArrowPress.emit(card)
    }

    /** Button press  handler */
    clickBtnUpdateCard(mode: string) {
        const card = (mode === 'add') ? new Card() : this.card
        if (mode === 'add') {this.onAddCard.emit(card)}
        if (mode === 'delete') {
            this.openDialogConfirm('Are you sure to remove this card?',
                this.card,
                (result) => {
                    if (result === 1) {
                        this.onDeleteCard.emit(this.card)
                        this.database.removeCard(this.card.id)
                    }
                }
            )

        } else {
            this.openDialogEditCard(card, mode)

        }
    }

    /** Confirmation dialog handler. Currently used to confirm removal from Favorites. */
    openDialogConfirm(promptText: string, card: Card, action: (input) => void): void {
        const dialogData = {card: card, message: promptText, response: 0}
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            width: '250px',
            height: '200px',
            data: dialogData
        });

        dialogRef.afterClosed().subscribe(result => {
            action(dialogData.response)

        });
    }

    /** Card Edit dialaog handler.
     * Supports insert/update/delete
     * dialog having data interface. mode defines action. response states what was outcome of dialog */
    openDialogEditCard(card: Card, mode: string): void {
        const dialogData = {card: card, response: false, mode: mode}
        const dialogRef = this.dialog.open(DialogEditCardComponent, {
            width: '350px',
            height: '600px',
            data: dialogData
        });

        dialogRef.afterClosed().subscribe(result => {
            if (dialogData.response) {
              // we need updateCard (remove old/insert new)
              if (dialogData.mode === 'edit') {
                  this.database.updateCard(dialogData.card)
                  this.onUpdateCard.emit(dialogData.card)
              } else if (dialogData.mode === 'add') {
                  dialogData.card.columnId = this.card.columnId
                  dialogData.card.boardId = this.card.boardId
                  this.database.insertCard(dialogData.card)
              }
            }
        });
    }

    /** Detect due in days (return positive) or ovedue (return negative)*/
    getDueInDays(card: Card): number {
      const ONE_DAY_MS = 86400000
      const now_ms = new Date().getTime()
      const dueDate_ms = Date.parse(card.due_date) // date.parse = milliseconds elapsed since January 1, 1970, 00:00:00 UTC
      const diff_days = Math.round(( dueDate_ms - now_ms) / ONE_DAY_MS)
      if (diff_days > 0 && diff_days <= 3 || diff_days < 0)
          return diff_days;
      else return 0;

    }


    toggleDueDateEditTrigger() {
        this.dueDateEditTrigger = !this.dueDateEditTrigger;
    }

    /** Due Date Edit Trigger. Reference from html template */
    dueDateEditClosed() {
        this.dueDateEditTrigger = false;
    }

    /** DatePicker validator. Makes sense to allow only future dates. Could be removed if no need. */
    datePickerValidator = (d: Date): boolean => {

        // THIS FUNCTION CANNOT ACCESS THE VARIABLE 'someDateToBlock'
        return d > new Date(); // allow dates in future
    }

    /** Used by DatePicker component.*/
    formatDate(date: Date): string {
        // date -> string
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const value = year + '-' + month + '-' + day;
        return value
    }

    /** Function used to draw effect of prohibited Drag action. Refers to card with given Id */
    getCardBackground(card: Card) {
       // return 'aqua';
        return card.id === this.dragColorRedCardId;
    }

}
