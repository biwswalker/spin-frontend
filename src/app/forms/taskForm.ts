import { TaskTag } from './../models/task-tag';
import { Task } from "../models/task";
import { TaskPartner } from '../models/task-partner';
import { Project } from '../models/project';

export class TaskForm{
  public task: Task;
  public taskProject: Project;
  public taskPartner: string[];
  public taskTag: TaskTag[];
  public autocompletePartnerList: string[];
  public taskTagList: string[] = [];
  public taskPartnerList: string[] = [];
  constructor(){
    this.task = new Task();
    this.taskPartner = [];
    this.taskTag = [];
    this.taskProject = new Project();
    this.autocompletePartnerList = [];
  }
}
