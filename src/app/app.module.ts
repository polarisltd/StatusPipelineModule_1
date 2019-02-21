import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import {TaskPipelineModule} from './modules/task-pipeline/task-pipeline.module';
import {DemoMessagesComponent} from './demo-messages-component';



@NgModule({
  imports:      [
    TaskPipelineModule,
    CommonModule,

  ],
  exports: [
    DemoMessagesComponent
  ],
  declarations: [
      AppComponent ,
    DemoMessagesComponent
  ],
  providers: [
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
