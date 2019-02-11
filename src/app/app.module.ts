import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {TaskPipelineModule} from "./task-pipeline/task-pipeline.module";
import { CommonModule } from '@angular/common';


@NgModule({
  imports:      [
    TaskPipelineModule,
    CommonModule
  ],
  declarations: [ AppComponent ],
  providers: [
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
