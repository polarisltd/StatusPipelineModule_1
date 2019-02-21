import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'dialog-edit-card',
  templateUrl: 'dialog-edit-card.component.html',
  styleUrls: ['./dialog-edit-card.component.scss']
})
export class DialogEditCardComponent implements OnInit{
  /*

  this type of form is created to restore data to previous content if cancel is pressed.
  input type=reset just resets formgroup to null controls. Not helpful.

  */

  cardForm: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<DialogEditCardComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder) {

    this.cardForm = formBuilder.group({
      title: formBuilder.control('initial value')
    });

  }

  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      'title': this.formBuilder.control(this.data.card.title),
      'status': this.formBuilder.control(this.data.card.status),
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
    this.data.response=false;
    this.dialogRef.close();
  }

  onSubmit(){
    this.data.card.title = this.cardForm.value.title
    this.data.card.status = this.cardForm.value.status
    this.data.card.description = this.cardForm.value.description
    this.data.card.priority = this.cardForm.value.priority
    this.data.card.favorite = this.cardForm.value.favorite
    this.data.card.color = this.cardForm.value.color
    this.data.card.responsible_name = this.cardForm.value.responsible_name
    this.data.card.responsible_email = this.cardForm.value.responsible_email
    this.data.card.due_date = this.cardForm.value.due_date
    this.data.card.pre_due_date = this.cardForm.value.pre_due_date
    this.data.response=true;
    this.dialogRef.close();
  }

}


