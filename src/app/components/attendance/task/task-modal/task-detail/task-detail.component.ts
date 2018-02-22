import { TaskModalComponent } from './../task-modal.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Time } from '@angular/common';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {


  @Output() messageEvent = new EventEmitter<string>();


  color: string = "";
  workStartTime: Time;
  workEndTime: Time;
  topic: string = "";
  activity: string = "";
  taskProject: string = "";
  workDate: any = "";
  ProjectList: any[] = [];
  statusFlag: boolean = false;
  colorStatus: boolean = false;
  projectList: any[] = [];
  searchTerm$ = new Subject<string>();

  constructor(public taskModal: TaskModalComponent) { }

  ngOnInit() {
    this.projectList = ['Project', 'Adobe', 'Break', 'Concat'];
  }

  onColorPick(color) {
      this.messageEvent.emit(color);
  }

  showData(){
    console.log(this.taskModal.taskForm)
  }
}


