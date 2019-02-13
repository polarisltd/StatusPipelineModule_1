import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BoardComponentComponent} from "./board-component/board-component.component";
import {CardComponentComponent} from "./card-component/card-component.component";
import {ColumnComponentComponent} from "./column-component/column-component.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ColumnsSortPipe} from "./shared/column-sort-pipe";
import {CardsSortPipe} from "./shared/card-sort-pipe";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  declarations: [
    BoardComponentComponent,
    CardComponentComponent,
    ColumnComponentComponent,
    ColumnsSortPipe,
    CardsSortPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatGridListModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSidenavModule
  ],
  exports: [
    BoardComponentComponent,
    CardComponentComponent,
    ColumnComponentComponent
  ],
  providers: [
  ]
})
export class TaskPipelineModule { }
