import {IPipelineColumn} from "./status-pipeline-module.interface";


export class Column implements IPipelineColumn{
	  id: string;
    title: string;
    boardId: string;
    order: number;
    status: string;
    color: string;
}
