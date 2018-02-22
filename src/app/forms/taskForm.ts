import { TaskTag } from './../models/task-tag';
import { Task } from "../models/task";
import { TaskPartner } from '../models/task-partner';

export class TaskForm{
  public task: Task;
  public taskProject: string;
  public taskPartner: TaskPartner[];
  public taskTag: TaskTag[];

  constructor(){
    this.task = new Task();
    this.taskPartner = [];
    this.taskTag = [];
    this.taskProject = "";
  }
}
