import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './component/avatar.component';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    AvatarComponent
  ],
  providers: [
  ],
  exports: [
    AvatarComponent
  ]
})
export class AvatarModule { }
