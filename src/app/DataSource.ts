import {Board} from "./task-pipeline/shared/board";
import {BehaviorSubject, Subject} from "rxjs";
import {OnInit} from "@angular/core";

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
                "title": "Id 1",
                "content": "a variable amount of columns depending on the amount of stati a task can show",
                "boardId": "000-000",
                "order": 0,
                "columnId": "001-001"
            },
            {
                "id": "002-002",
                "title": "Id 2",
                "content": "Each column must have an editable title",
                "boardId": "000-000",
                "order": 1,
                "columnId": "001-001"
            },
            {
                "id": "002-003",
                "title": "Id 3",
                "content": "Each column must have an editable title",
                "boardId": "000-000",
                "order": 2,
                "columnId": "001-002"
            },
            {
                "id": "002-004",
                "title": "Id 4",
                "content": "Each column must allow to transit a task from one column to the next.This goal must be achievable by drag ‘n drop.",
                "boardId": "000-000",
                "order": 3,
                "columnId": "001-003"
            },
            {
                "id": "002-005",
                "title": "Id 5",
                "content": "Each column must be able to trigger events on the tasks, so a transition of a task from one column to the next is able to change task attributes.",
                "boardId": "000-000",
                "order": 4,
                "columnId": "001-004"
            }
            ,
            {
                "id": "002-006",
                "title": "Id 6",
                "content": "Each column must be able to trigger events on the tasks, so a transition of a task from one column to the next is able to change task attributes.",
                "boardId": "000-000",
                "order": 4,
                "columnId": "001-002"
            }
            ,
            {
                "id": "002-007",
                "title": "Id 7",
                "content": "Each column must be able to trigger events on the tasks, so a transition of a task from one column to the next is able to change task attributes.",
                "boardId": "000-000",
                "order": 4,
                "columnId": "001-002"
            }
        ]
    } as Board;

    boardSubject$: Subject<Board>;

    constructor(){

       this.boardSubject$ = new BehaviorSubject<Board>(this.dataSource);
       console.log('DataSource#ngOnInit')

    }

}
