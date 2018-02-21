import { Task } from "../models/task";

export class TaskForm{
  public task: Task;
  public taskProject: string;

  constructor(){
    this.task = new Task();
    this.taskProject = "";
  }
}
