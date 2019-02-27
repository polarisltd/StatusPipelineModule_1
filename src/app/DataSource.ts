// tslint:disable-next-line:import-blacklist
import {BehaviorSubject, Subject} from 'rxjs';
import {OnInit} from '@angular/core';
import {Board} from './modules/task-pipeline/shared/board';

export class DataSource  {

    dataSource: Board = {
        '_id': '000-000',
        'title': 'CanBan Board',
        'columns': [
            {
                'id': '001-001',
                'title': 'Open',
                'boardId': '000-000',
                'order': 0,
                'color': 'red'
            },
            {
                'id': '001-002',
                'title': 'Todo',
                'boardId': '000-000',
                'order': 1,
                'color': 'blue'
            },
            {
                'id': '001-003',
                'title': 'Doing',
                'boardId': '000-000',
                'order': 2,
                'color': 'green'
            },
            {
                'id': '001-004',
                'title': 'Validation',
                'boardId': '000-000',
                'order': 3,
                'color': 'magenta'
            },
            {
                'id': '001-005',
                'title': 'Staging',
                'boardId': '000-000',
                'order': 4,
                'color': 'blue'
            },
            {
                'id': '001-006',
                'title': 'Future-2',
                'boardId': '000-000',
                'order': 5,
                'color': 'cyan'
            },
            {
                'id': '001-007',
                'title': 'Future-3',
                'boardId': '000-000',
                'order': 6,
                'color': 'blue'
            }
        ],
        'cards': [
            {
                'id': '002-001',
                'title': 'DAily topic test task',
                'status': 'open',
                'boardId': '000-000',
                'order': 1,
                'columnId': '001-001',
                'due_date': '2019-02-18',
                'responsible_email': 'aaa@bbb.com',
                'responsible_name': 'aaaaa',
                'color': '#996680',
                'favorite': false,
                'hasNotifications': true

            },
            {
                'id': '002-002',
                'title': 'Each column must ',
                'status': 'open',
                'boardId': '000-000',
                'order': 2,
                'columnId': '001-001',
                'due_date': '2019-02-19',
                'responsible_email': 'aaa@bbb.com',
                'responsible_name': 'aaaaa',
                'color': '#6693c4',
                'favorite': true,
                'hasNotifications': true
            },
            {
                'id': '002-003',
                'title': 'editable title',
                'status': 'open',
                'boardId': '000-000',
                'order': 1,
                'columnId': '001-002',
                'due_date': '2019-02-20',
                'responsible_email': 'aaa@bbb.com',
                'responsible_name': 'aaaaa',
                'color': '#6693c4',
                'favorite': false,
                'hasNotifications': true
            },
            {
                'id': '002-004',
                'title': 'allow to transit ',
                'status': 'open',
                'boardId': '000-000',
                'order': 1,
                'columnId': '001-003',
                'due_date': '2019-02-21',
                'responsible_email': 'aaa@bbb.com',
                'responsible_name': 'aaaaa',
                'color': '#996680',
                'favorite': true,
                'hasNotifications': false
            },
            {
                'id': '002-005',
                'title': 'so a transition',
                'status': 'closed',
                'boardId': '000-000',
                'order': 1,
                'columnId': '001-004',
                'due_date': '2019-02-22',
                'responsible_email': 'aaa@bbb.com',
                'responsible_name': 'aaaaa',
                'color': '#996680',
                'favorite': true,
                'hasNotifications': false
            }
            ,
            {
                'id': '002-006',
                'title': 'so a transition',
                'status': 'closed',
                'boardId': '000-000',
                'order': 2,
                'columnId': '001-002',
                'due_date': '2019-02-23',
                'responsible_email': 'aaa@bbb.com',
                'responsible_name': 'aaaaa',
                'color': '#996680',
                'favorite': false
            }
            ,
            {
                'id': '002-007',
                'title': 'Each column ',
                'status': 'open',
                'boardId': '000-000',
                'order': 3,
                'columnId': '001-002',
                'due_date': '2019-02-24',
                'responsible_email': 'aaa@bbb.com',
                'responsible_name': 'aaaaa',
                'color': '#F2C405',
                'favorite': false
            } ,
            {
                'id': '002-008',
                'title': 'Each column ',
                'status': 'closed',
                'boardId': '000-000',
                'order': 4,
                'columnId': '001-002',
                'due_date': '2019-02-24',
                'responsible_email': 'aaa@bbb.com',
                'responsible_name': 'aaaaa',
                'color': '#F2C405',
                'favorite': false
            } ,
            {
                'id': '002-009',
                'title': 'Each column ',
                'status': 'open',
                'boardId': '000-000',
                'order': 5,
                'columnId': '001-002',
                'due_date': '2019-02-24',
                'responsible_email': 'aaa@bbb.com',
                'responsible_name': 'aaaaa',
                'color': '#F2C405',
                'favorite': false
            } ,
            {
                'id': '002-010',
                'title': 'Each column ',
                'status': 'closed',
                'boardId': '000-000',
                'order': 6,
                'columnId': '001-002',
                'due_date': '2019-02-24',
                'responsible_email': 'aaa@bbb.com',
                'responsible_name': 'aaaaa',
                'color': '#F2C405',
                'favorite': false
            } ,
            {
                'id': '002-011',
                'title': 'Each column ',
                'status': 'open',
                'boardId': '000-000',
                'order': 7,
                'columnId': '001-002',
                'due_date': '2019-02-24',
                'responsible_email': 'aaa@bbb.com',
                'responsible_name': 'aaaaa',
                'color': '#F2C405',
                'favorite': false
            } ,
            {
                'id': '002-012',
                'title': 'Each column ',
                'status': 'open',
                'boardId': '000-000',
                'order': 8,
                'columnId': '001-002',
                'due_date': '2019-02-24',
                'responsible_email': 'aaa@bbb.com',
                'responsible_name': 'aaaaa',
                'color': '#F2C405',
                'favorite': false
            } ,
            {
                'id': '002-013',
                'title': 'Each column ',
                'status': 'open',
                'boardId': '000-000',
                'order': 39,
                'columnId': '001-002',
                'due_date': '2019-02-24',
                'responsible_email': 'aaa@bbb.com',
                'responsible_name': 'aaaaa',
                'color': '#F2C405',
                'favorite': false
            }
        ]
    } as Board;

    boardSubject$: Subject<Board>;

    constructor() {
       this.boardSubject$ = new BehaviorSubject<Board>(this.dataSource);
    }

}
