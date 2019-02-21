import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  // tslint:disable-next-line
  selector: 'dialog-confirm',
  templateUrl: 'dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('=>dialog data ', data)
  }

  onClick(response: number): void {
    console.log('<= Response is : ', response)
    this.data.response = response;
    this.dialogRef.close();
  }

}
