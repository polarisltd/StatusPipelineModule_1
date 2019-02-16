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

  ngOnInit() {

   // create empty
   this.cardForm = this.formBuilder.group({
     'title': this.formBuilder.control(this.data.card.title),
     'content': this.formBuilder.control(this.data.card.content),
     'status': this.formBuilder.control(this.data.card.status),
     'description': this.formBuilder.control(this.data.card.description),
     'priority': this.formBuilder.control(this.data.card.priority),
     'favorite': this.formBuilder.control(this.data.card.favorite),
     'color': this.formBuilder.control(this.data.card.color),
     'responsible_name': this.formBuilder.control(this.data.card.responsible_name),
     'responsible_email': this.formBuilder.control(this.data.card.responsible_email),
     'pre_due_date': this.formBuilder.control(this.data.card.pre_due_date),
     'due_date': this.formBuilder.control(this.data.card.due_date),
     /*
     'creator_name': this.formBuilder.control(''),
     'creator_email': this.formBuilder.control(''),

     'archived_at': this.formBuilder.control(''),
     'started_at': this.formBuilder.control(''),
     'completed_at': this.formBuilder.control(''),
     'created_at': this.formBuilder.control(''),
     'updated_at': this.formBuilder.control('')
    */

   })


 }



  /*

      // can't find a method to disable controls!
      Object.keys(this.cardForm.controls).forEach((key: string) => {
      const abstractControl = this.cardForm.controls[key];
      abstractControl.disable({emitEvent:true,onlySelf:true});
    })



  */

onCancel(){
  console.log('Form CANCEL')
  this.dialogRef.close();
}

onSubmit(){
    console.log('Form SUBMIT')
    this.dialogRef.close();
  }

}
