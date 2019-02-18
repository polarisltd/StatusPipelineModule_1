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
  description: string;
  priority: string;
  favorite: boolean;
  process_id: string;
  color: string;
  creator_name: string;
  creator_email: string;
  responsible_name: string;
  responsible_email: string;
  pre_due_date: string;
  due_date: string;
  archived_at: string;
  started_at: string;
  completed_at: string;
  created_at: string;
  updated_at: string;
  hasNotifications: boolean;
  unreadNotificationsCount: number;
}
