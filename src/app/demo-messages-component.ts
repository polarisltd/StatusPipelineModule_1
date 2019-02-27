import { Component } from '@angular/core';

// tslint:disable
@Component({
    selector: 'demo-messages-component',
    template: `        
        <h1>Hello from portal component</h1>
    `,
    styles: [`
      h1 { 
        height: 80%;
        margin: 20px;
      }
      `]
})
export class DemoMessagesComponent {
    constructor() { }
}
