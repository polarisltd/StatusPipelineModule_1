
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Portal } from '@angular/cdk/portal';

@Injectable()
export class MessagesPortalService {

    get messagesPortal$() {
        return this.messagesPortalSubject.asObservable();
    }

    private messagesPortalSubject: BehaviorSubject<Portal<any>>;

    setPortal(portal: Portal<any>) {
        this.messagesPortalSubject.next(portal);
    }

    constructor() {
        this.messagesPortalSubject = new BehaviorSubject(undefined);
    }
}
