# StatusPipelineModule

This is a component providing Can-Ban Board style Task management.
It provides vertical swimlines style board were each swimline e.g. Stati allows 
attach multiple cards which could be moved forward as Task progresses 
via drag and drop.

Component visual layout is based on outside of component provided Observable data. It is based on following data model:

- Board, can having multiple Columns;
- Columns, can having multiple Cards;
- Cards, those containing Task data.

Functionality

- Board is built dynamically based on above data model;
- Columns having defined sequence of following on Board;
- Draggable Cards between columns;
- Rules describing Drag and Drop permissions are provided as Callback at embedding component side;
- Column title editable;
- Click on column title emitting event;
- Cards can be added; Event emitted and Data updated.
- Cards cn be edited; updated card delivered as event and Data updated.
- Cards can be removed; Delivered as Event and Data updated.
- Board Layout design allows to scroll horizontally to accomodate Columns left on right side and to scroll up and down to see cards left bellow window area.
  Cards and columns are designed to be fixed width so they could imitate "real" cards we accustomed to see on task planning board. 

## Architectural bits

- StatusPipeline component is implemented internally as 3 sub components namely Board-component, column-component, card-component. There is a single instance of such component per data element.

- Static Json Input data and Subject/Observable are defined within dataSource. We make sure Subject is a singleton so all subcomponents receive same instance. Each subcomponent subscribes to this Observable in order to redraw  UI layout on data change.

- There is API code class Database which is used by subcomponents and share data update API. It being created with new operator and encapsulates Topic/Observable to push make data updates from within sub components.

- Column ordering is implemented as Angular Pipe.

## Data model

Task Pipeline board is built around following interfaces

```
export enum PipelineColumnElementType {
Task = 'Task'
}
export interface IPipelineColumn {
id: string;
title: string;
status: string;
order: number;
color: string;
}
export interface IPipelineColumnElement {
id: string;
columnId: string;
boardId: string;
title: string;
type: PipelineColumnElementType;
status: string;
}

export interface IStatusChange {
    src: IPipelineColumn,
    dst: IPipelineColumn,
    elem: IPipelineColumnElement;
}

export interface ITransition{
  srcStatus:string;
  dstStatus:string;
}

```

Implementation classes for above interfaces are Board, Column and Class. Please see example bellow.

This data model uses identifier based data linking. 

- Board contains array of Columns and  Cards.

- Card contains reference to Column and Board. 

- Column contains reference to Board

These linking are implemented via UUID type of value. They can be generated within code using uuid function.

Column includes order attribute which determines position of Column on Board.

  

## Component usage and example

Component can be invoked using following html snippet.

```html5
<dvtx-status-pipeline
        [boardSubject$]="boardSubject$"
        [onTransition]="onTransition"
        [onClickColumnTitle]="onClickColumnTitle"
        [validateDropRules]="validateDragFunction"
        [onAddCard]="onAddCard"
        [onUpdateCard]="onUpdateCard"
        [onRemoveColumn]="onRemoveColumn"
        [onCardClick]="onCardClick"
        [onDeleteCard]="onDeleteCard">
</dvtx-status-pipeline>

```

Arguments:

[boardSubject$]="boardSubject$" 

provides input data source. It has to be constructed by Embedding component.

Bellow please find example.

```
export class Board {
	id: string;
	title: string;
	columns: Column[];
    cards: Card[];
}

export class Column implements IPipelineColumn{
	id: string;
    title: string;
    boardId: string;
    order: number;
    status: string;
    color: string;
}

export class Card implements IPipelineColumnElement{
  id: string;
  title: string;
  content: string;
  columnId: string;
  boardId: string;
  order: number;
  type: PipelineColumnElementType;
  status: string;
}


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
            }, ....
        ],
        "cards": [
                    {
                        "id": "002-001",
                        "title": "Id 1",
                        "content": "a variable amount of columns depending on the amount of stati a task can show",
                        "boardId": "000-000",
                        "order": 0,
                        "columnId": "001-001"
                    },.....    
         ]
     } } as Board;    


this.boardSubject$ = new BehaviorSubject<Board>(this.dataSource);
```

[onTransition]="onTransition"

Event emitter being triggered at Drag and Drop operation moving card between columns.

Provide and Subscribe for it like this:

```
onTransition = new EventEmitter<IStatusChange>();

this.onTransition.subscribe(item => this.showMessage('Drag-n-drop:',item))
```

[onClickColumnTitle]="onClickColumnTitle"

Provides Event on user clicking Column Title

```
  onClickColumnTitle = new EventEmitter<IPipelineColumn>();
```

[onCardClick]="onCardClick"

Provides Event on user clicking Card

```
  onCardClick = new EventEmitter<IPipelineColumnElement>();
```

[onClickColumnTitle]="onClickColumnTitle"

Provides Event on user clicking Column Title.

```
  onClickColumnTitle = new EventEmitter<IPipelineColumn>();
```

[onAddCard]="onAddCard"

Provides Event on Adding Card.

Adding a Card ends with template Card being created. User can modify actual Card. Please see bellow.

```
  onAddCard = new EventEmitter<IPipelineColumnElement>();
```

[onDeleteCard]="onDeleteCard"

To remove Card click on [-] button bellow the card. Currently there is no any brestrictions to remove the Card.

```
   onDeleteCard = new EventEmitter<IPipelineColumnElement>();
 
```

[onUpdateCard]="onUpdateCard"

User can modify card by clicking button [e] bellow that card.
2 editable fields appears. One for Title and one for column. Once done press Enter key or click on link bellow editable Card Form.
This is a way how to update a Card once one has been created.

```
  onUpdateCard = new EventEmitter<IPipelineColumnElement>();
```

[onRemoveColumn]="onRemoveColumn"

This triggers when user clicks on [-] button bellow Column Title. Currently there is no restrictions for column removal

```
  onRemoveColumn = new EventEmitter<IPipelineColumn>();
```

[validateDropRules]="validateDragFunction"

Callback  is defined as Function type. This Function identifier needs to be bind to actual function. See example bellow.

```
validateDragFunction: Function;

this.validateDragFunction = this.validateDropRules.bind(this); // bind actual method

validateDropRules(statusChange: IStatusChange):boolean{

    console.log('app.component#validateDragRules  ',statusChange)

    return (this.ALLOWED_TRANSITIONS.filter(

        elem => elem[0] === statusChange.src.id &&
                  elem[1] === statusChange.dst.id
    ).length > 0)

  }
```

# Project setup instructions

Clone project from Github and launch application.
Browser will open when ready.

```
cd <project_dir>
git init .
git clone https://github.com/polarisltd/StatusPipelineModule.git

ng install
ng serve -o
```


