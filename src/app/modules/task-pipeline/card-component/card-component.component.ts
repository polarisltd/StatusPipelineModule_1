
import {Component, Input, Output, OnInit, AfterViewInit, EventEmitter, ElementRef} from '@angular/core';
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
  styleUrls: ['./card-component.component.scss']
})
export class CardComponentComponent implements OnInit {
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
  @Input() validateDropRules: Function
  //
  database: Database;

  isCardEditMode: boolean = false;
  board$: Observable<Board>;
  board: Board
  cardForm: FormGroup;
  cardFormChanged: boolean = false;
  dragNodeState: string;
  dragStatus: string;

  dragClass: string = 'drag-color0'; // drag/drop enable/disable color
  inTimer: boolean = false;

  dueDateEditTrigger: boolean = false

  dueDateFg: FormGroup;

  constructor(private fb: FormBuilder,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private dialog: MatDialog
              ) {

      this.matIconRegistry.addSvgIcon(
          'task',
          this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/task.svg')
          // this.domSanitizer.bypassSecurityTrustHtml(svg1) // alternative not working for me.
      );
      this.matIconRegistry.addSvgIcon(
          'project_room',
          //
          this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/project_room.svg')
          // this.domSanitizer.bypassSecurityTrustHtml(svg1)

      );

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
            this.database = new Database(this.boardSubject$, this.board);
            }
        )

      this.cardForm = this.fb.group({
          'title': this.card.title,
          'status': this.card.status
      });
      this.cardForm.valueChanges.subscribe(form => {
          this.cardFormChanged = true;
          this.card.title = form.title;
          this.card.status = form.status;
      });

  }

handleDragStart(event, card) {
   this.insertDragSourceId(event, this.card.id)
}


handleDragLeave(card) {
        this.dragNodeState = ''
}

clickBtnProjectRoom(card) {
    this.onShowProjectRooms.emit(card)
}

clickExitUpdate() {
    // we will emit from formGroup change subscription.
    this.isCardEditMode = false
    if (this.cardFormChanged) {
        this.onUpdateCard.emit(this.card)
        this.isCardEditMode = false
    }
}



insertDragSourceId(event, id: string) {
    // known behavior, dragOver did not make available originating item.
    // normally we insert drag source via event.dataTransfer.setData(key,value)
    // but now we cheat by inserting  event.dataTransfer.setData('key=value',whatever)
    // dragOver strips only value but not key so thats our backdoor solution
    event.dataTransfer.setData(`id=${id}`, 'data'); // whatever data
}




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


    clickBtnMessage() {
        this.onShowMessages.emit(this.card)

    }


    clickBtnNotifications(card) {
        this.onShowNotifications.emit(card)
    }

    clickBtnShowTask(card) {
        this.onShowTask.emit(card)

    }


    clickBtnDocuments(card) {
        this.onShowDocuments.emit(card)
    }

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

    clickBtnRightArrow(card) {
        this.onArrowPress.emit(card)
    }

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

    dueDateEditClosed() {
        this.dueDateEditTrigger = false;
    }

    datePickerValidator = (d: Date): boolean => {

        // THIS FUNCTION CANNOT ACCESS THE VARIABLE 'someDateToBlock'
        return d > new Date(); // allow dates in future
    }

    formatDate(date: Date): string {
        // date -> string
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const value = year + '-' + month + '-' + day;
        return value
    }


}
