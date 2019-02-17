import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Card} from "../shared/card";

@Component({
  selector: 'dialog-edit-card',
  templateUrl: 'dialog-edit-card.component.html',
  styleUrls: ['./dialog-edit-card.component.scss']
})
export class DialogEditCardComponent {

  cardForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogEditCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {

    this.cardForm = formBuilder.group({
      title: formBuilder.control('initial value')
    });

  }

  /*
  Angular formcontrol is not convinients as form controls are internal data store so it should be first populated and then
  retrieved back. Better would work ngModel but then change should happen only in cvase of submit is pressed.
  */

  ngOnInit() {
   console.log('ngOnInit()')
   // create empty
   this.cardForm = this.formBuilder.group({
     'title': this.formBuilder.control(this.data.card.title),
     'content': this.formBuilder.control(this.data.card.content),
     'description': this.formBuilder.control(this.data.card.description),
     'priority': this.formBuilder.control(this.data.card.priority),
     'favorite': this.formBuilder.control(this.data.card.favorite),
     'color': this.formBuilder.control(this.data.card.color),
     'responsible_name': this.formBuilder.control(this.data.card.responsible_name),
     'responsible_email': this.formBuilder.control(this.data.card.responsible_email),
     'pre_due_date': this.formBuilder.control(this.data.card.pre_due_date),
     'due_date': this.formBuilder.control(this.data.card.due_date)
   })
 }



onCancel(){
  console.log('Form CANCEL')
  this.dialogRef.close();
}

onSubmit(){
    // accept update only in case of submit pressed.
    // console.log('Form SUBMIT',this.cardForm.value)
    //
    this.data.card.title = this.cardForm.value.title
    this.data.card.content = this.cardForm.value.content
    this.data.card.description = this.cardForm.value.description
    this.data.card.priority = this.cardForm.value.priority
    this.data.card.favorite = this.cardForm.value.favorite
    this.data.card.color = this.cardForm.value.color
    this.data.card.responsible_name = this.cardForm.value.responsible_name
    this.data.card.responsible_email = this.cardForm.value.responsible_email
    this.data.card.due_date = this.cardForm.value.due_date
    this.data.card.pre_due_date = this.cardForm.value.pre_due_date
    this.dialogRef.close();
  }

}
