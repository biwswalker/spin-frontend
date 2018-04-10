import { Component, OnInit } from '@angular/core';
import { TaskTag } from '../../../../models/task-tag';

@Component({
  selector: 'app-by-project',
  templateUrl: './by-project.component.html',
  styleUrls: ['./by-project.component.scss']
})
export class ByProjectComponent implements OnInit {

  public sumProjectH: number = 0;
  public sumProjectM: number = 0;
  public reportByProject: ReportByProject[] = [];

  constructor() { }

  ngOnInit() {
  }

  initialData(data) {
    console.log(data)
    this.reportByProject = data;
    for (let obj of this.reportByProject) {
      this.sumProjectH += obj.hour;
      this.sumProjectM += obj.minute;
    }
    if((this.sumProjectM%60) !== 0 ){
      this.sumProjectH += Math.floor(this.sumProjectM /60 );
      this.sumProjectM += this.sumProjectM % 60;
    }
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
