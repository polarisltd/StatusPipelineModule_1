
import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject } from 'rxjs';
import { Portal } from '@angular/cdk/portal';

@Injectable()
export class MessagesPortalService {

    private messagesPortalSubject: BehaviorSubject<Portal<any>>;

    constructor() {
        this.messagesPortalSubject = new BehaviorSubject(undefined);
    }

    get messagesPortal$() {
        return this.messagesPortalSubject.asObservable();
    }

    setPortal(portal: Portal<any>) {
        this.messagesPortalSubject.next(portal);
    }


}
