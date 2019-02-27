import {Component, Inject, InjectionToken} from '@angular/core';
import {Card} from './modules/task-pipeline/shared/card';

export const DEMO_PORTAL_DATA = new InjectionToken<{}>('PortalData');

// tslint:disable
@Component({
    selector: 'demo-messages-component',
    template: `        
        <h1>Portal messages for card {{card?.id}}</h1>
    `,
    styles: [`
      h1 { 
        height: 80%;
        margin: 20px;
      }
      `]
})
export class DemoMessagesComponent {
    public card: Card;
    constructor(@Inject(DEMO_PORTAL_DATA) public data ) {
        console.log('DemoMessagesComponent#demo_portal_data', data);
        this.card = data.card;
    }
}
