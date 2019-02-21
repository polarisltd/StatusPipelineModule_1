import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BoardComponentComponent} from './board-component/board-component.component';
import {CardComponentComponent} from './card-component/card-component.component';
import {ColumnComponentComponent} from './column-component/column-component.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatBadgeModule,
  MatDialogModule,
  MatSliderModule,
  MatTooltipModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule, DateAdapter
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ColumnsSortPipe} from './shared/column-sort-pipe';
import {CardsSortPipe} from './shared/card-sort-pipe';
import {MatSidenavModule} from '@angular/material/sidenav';
import {AvatarModule} from '../avatar/avatar.module';
import {HttpClientModule} from '@angular/common/http';
import {DialogConfirmComponent} from './dialog-confirm-component/dialog-confirm.component';
import {DialogEditCardComponent} from './dialog-edit-card-component/dialog-edit-card.component';
import {PortalModule} from '@angular/cdk/portal';
import {MessagesPortalService} from './shared/messages-portal-service';
import {DatePickerSupport} from './shared/status-pipeline-date-picker-support';


@NgModule({
  declarations: [
    BoardComponentComponent,
    CardComponentComponent,
    ColumnComponentComponent,
    DialogConfirmComponent,
    DialogEditCardComponent,
    ColumnsSortPipe,
    CardsSortPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatGridListModule,
    MatBadgeModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSidenavModule,
    HttpClientModule,
    MatSliderModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatTabsModule,
    PortalModule,
    AvatarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    BoardComponentComponent,
    CardComponentComponent,
    ColumnComponentComponent,
    DialogConfirmComponent,
    DialogEditCardComponent
  ],
  providers: [
    MessagesPortalService,
    MatDatepickerModule,
    { provide: DateAdapter, useClass: DatePickerSupport },
  ],
  entryComponents: [
      DialogConfirmComponent,
      DialogEditCardComponent]
})
export class TaskPipelineModule { }
