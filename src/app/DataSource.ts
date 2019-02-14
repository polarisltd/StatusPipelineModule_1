import {BehaviorSubject, Subject} from "rxjs";
import {OnInit} from "@angular/core";
import {Board} from "./modules/task-pipeline/shared/board";

export class DataSource  {

    dataSource: Board = {
        "_id": "000-000",
        "title": "CanBan Board",
        "columns": [
            {
                "id": "001-001",
                "title": "Open",
                "boardId": "000-000",
                "order": 0,
                "color": "red"
            },
            {
                "id": "001-002",
                "title": "Todo",
                "boardId": "000-000",
                "order": 1,
                "color": "blue"
            },
            {
                "id": "001-003",
                "title": "Doing",
                "boardId": "000-000",
                "order": 2,
                "color": "green"
            },
            {
                "id": "001-004",
                "title": "Validation",
                "boardId": "000-000",
                "order": 3,
                "color": "magenta"
            },
            {
                "id": "001-005",
                "title": "Staging",
                "boardId": "000-000",
                "order": 4,
                "color": "blue"
            },
            {
                "id": "001-006",
                "title": "Future-2",
                "boardId": "000-000",
                "order": 5,
                "color": "cyan"
            },
            {
                "id": "001-007",
                "title": "Future-3",
                "boardId": "000-000",
                "order": 6,
                "color": "blue"
            }
        ],
        "cards": [
            {
                "id": "002-001",
                "title": "DAily topic test task",
                "content": "DAily topic test task",
                "boardId": "000-000",
                "order": 1,
                "columnId": "001-001",
                "due_date":"2019-02-01T10:34:45.310+01:00",
                "responsible_email":"aaa@bbb.com",
                "responsible_name":"aaaaa"
            },
            {
                "id": "002-002",
                "title": "Each column must ",
                "content": "Each column must ",
                "boardId": "000-000",
                "order": 2,
                "columnId": "001-001",
                "due_date":"2019-02-01T10:34:45.310+01:00",
                "responsible_email":"aaa@bbb.com",
                "responsible_name":"aaaaa"
            },
            {
                "id": "002-003",
                "title": "editable title",
                "content": "editable title",
                "boardId": "000-000",
                "order": 1,
                "columnId": "001-002",
                "due_date":"2019-02-01T10:34:45.310+01:00",
                "responsible_email":"aaa@bbb.com",
                "responsible_name":"aaaaa"
            },
            {
                "id": "002-004",
                "title": "allow to transit ",
                "content": "allow to transit .",
                "boardId": "000-000",
                "order": 1,
                "columnId": "001-003",
                "due_date":"2019-02-01T10:34:45.310+01:00",
                "responsible_email":"aaa@bbb.com",
                "responsible_name":"aaaaa"
            },
            {
                "id": "002-005",
                "title": "so a transition",
                "content": "so a transition",
                "boardId": "000-000",
                "order": 1,
                "columnId": "001-004",
                "due_date":"2019-02-01T10:34:45.310+01:00",
                "responsible_email":"aaa@bbb.com",
                "responsible_name":"aaaaa"
            }
            ,
            {
                "id": "002-006",
                "title": "so a transition",
                "content": "so a transition.",
                "boardId": "000-000",
                "order": 2,
                "columnId": "001-002",
                "due_date":"2019-02-01T10:34:45.310+01:00",
                "responsible_email":"aaa@bbb.com",
                "responsible_name":"aaaaa"
            }
            ,
            {
                "id": "002-007",
                "title": "Each column ",
                "content": "Each column .",
                "boardId": "000-000",
                "order": 3,
                "columnId": "001-002",
                "due_date":"2019-02-01T10:34:45.310+01:00",
                "responsible_email":"aaa@bbb.com",
                "responsible_name":"aaaaa"
            }
        ]
    } as Board;

    boardSubject$: Subject<Board>;

    constructor(){

       this.boardSubject$ = new BehaviorSubject<Board>(this.dataSource);
       console.log('DataSource#ngOnInit')

    }

}
