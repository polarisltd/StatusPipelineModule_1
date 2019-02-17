import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dialog-edit-card',
  templateUrl: 'dialog-edit-card.component.html',
  styleUrls: ['./dialog-edit-card.component.scss']
})
export class DialogEditCardComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogEditCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
   console.log('ngOnInit()')
 }


onCancel(){
  this.data.response = false;
  this.dialogRef.close();
}

onSubmit(){
  console.log('Form SUBMIT')
    this.data.response = true; // response == true for submit
    this.dialogRef.close();
  }

}
