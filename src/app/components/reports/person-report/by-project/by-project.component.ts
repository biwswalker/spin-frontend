import { Component, OnInit } from '@angular/core';
import { TaskTag } from '../../../../models/task-tag';

@Component({
  selector: 'app-by-project',
  templateUrl: './by-project.component.html',
  styleUrls: ['./by-project.component.scss', '../person-report.component.scss']
})
export class ByProjectComponent implements OnInit {

  public reportByProject: ReportByProject[] = [];

  constructor() { }

  ngOnInit() {
  }

  initialData(data) {
    this.reportByProject = data;
    console.log(this.reportByProject)
    for (let obj of this.reportByProject) {
      obj.sumhour = 0;
      console.log((obj.hour * 60) + obj.min);
      obj.sumhour = (obj.hour * 60) + obj.min;
      console.log(obj.sumhour);
    }
  }
}

class ReportByProject {
  public sumhour: number;
  public hour: number;
  public min: number;
  public name: string;
  public tagList: TaskTag[];

  constructor() {
    this.hour = null;
    this.min = null;
    this.name = "";
    this.tagList = [];
  }
}
