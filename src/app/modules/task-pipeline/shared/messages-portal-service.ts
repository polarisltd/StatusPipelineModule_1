
import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject } from 'rxjs';
import { Portal } from '@angular/cdk/portal';

@Injectable()
export class MessagesPortalService {

    private messagesPortalSubject: BehaviorSubject<Portal<any>>;

    constructor() {
        console.log('MessagesPortalService#constructor')
        this.messagesPortalSubject = new BehaviorSubject(undefined);
    }

    get messagesPortal$() {
        console.log('MessagesPortalService#get messagePortal$ -> Observable<Portal> ')
        return this.messagesPortalSubject.asObservable();
    }

    setPortal(portal: Portal<any>) {
        console.log('MessagesPortalService#setPortal! next(portal)')
        // TODO: Input parameters for Portal Component.
        this.messagesPortalSubject.next(portal);
    }


}
