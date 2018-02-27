import { TaskTag } from './../models/task-tag';
import { Task } from "../models/task";
import { TaskPartner } from '../models/task-partner';
import { Project } from '../models/project';

export class TaskForm{
  public task: Task;
  public taskProject: Project;
  public taskPartner: any[];
  public taskMember: any[];
  public taskTag: TaskTag[];
  public autocompletePartnerList: any[];
  public taskTagList: string[] = [];
  public taskPartnerList: string[] = [];
  public statusFlag: boolean;
  public doSelfFlag:boolean;
  public colorFlag: boolean;
  constructor(){
    this.task = new Task();
    this.taskPartner = [];
    this.taskTag = [];
    this.taskProject = new Project();
    this.autocompletePartnerList = [];
  }
}
