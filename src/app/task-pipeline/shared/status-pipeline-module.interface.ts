import {Column} from "./column";

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
