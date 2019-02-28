import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { TaskPipelineModule } from './modules/task-pipeline/task-pipeline.module';
import { DemoMessagesComponent } from './demo-messages-component';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);


@NgModule({
  imports:      [
    TaskPipelineModule,
    CommonModule
  ],
  exports: [
     DemoMessagesComponent
  ],
  declarations: [
      AppComponent
    , DemoMessagesComponent
  ],
  providers: [
  ],
  bootstrap:    [ AppComponent
  ],
  entryComponents: [
    DemoMessagesComponent
  ]
})
export class AppModule {




}
