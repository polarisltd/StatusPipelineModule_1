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
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
