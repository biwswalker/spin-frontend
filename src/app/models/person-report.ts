import { Task } from "./task";

export class PersonReport{
  public date: string;
  public tasks: ReportTask[];
  public sumWorkH: number;
  public sumWorkM: number;

  constructor(){
    this.date = "";
    this.tasks = [];
    this.sumWorkH = null;
    this.sumWorkM = null;
  }
}

class ReportTask{
  public activity: string;
  public projectAbbr: string;
  public projectName: string;
  public sumAsHour: number;
  public sumAsMin: number;
  public topic: string;
  public workTime: number;
  public startEndTime: string;
  public startTime: string;
  public endTime: string;
}
