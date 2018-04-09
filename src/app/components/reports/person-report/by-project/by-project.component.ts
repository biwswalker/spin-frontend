import { Component, OnInit } from '@angular/core';
import { TaskTag } from '../../../../models/task-tag';

@Component({
  selector: 'app-by-project',
  templateUrl: './by-project.component.html',
  styleUrls: ['./by-project.component.scss']
})
export class ByProjectComponent implements OnInit {

  public reportByProject: ReportByProject[] = [];

  constructor() { }

  ngOnInit() {
  }

  initialData(data) {
    // console.log(data);
    this.reportByProject = data;
    // for (let obj of this.reportByProject) {
    //   obj.sumhour = 0;
    //   obj.sumhour = obj.hour + obj.minute;
    // }
  }
}

class ReportByProject {
  public sumhour: number;
  public hour: number;
  public minute: number;
  public name: string;
  public tagList: TaskTag[];

  constructor() {
    this.sumhour = null;
    this.hour = null;
    this.minute = null;
    this.name = "";
    this.tagList = [];
  }
}
