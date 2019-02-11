import {IPipelineColumnElement, PipelineColumnElementType} from "./status-pipeline-module.interface";


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
