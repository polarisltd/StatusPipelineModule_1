import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import {TaskPipelineModule} from "./modules/task-pipeline/task-pipeline.module";



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
