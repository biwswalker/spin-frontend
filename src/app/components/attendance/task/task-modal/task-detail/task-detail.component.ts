import { TaskModalComponent } from './../task-modal.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Time } from '@angular/common';

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


  constructor(public taskModal: TaskModalComponent) { }

  ngOnInit() {
  }

  onColorPick(color) {
      this.messageEvent.emit(color);
  }

  showData(){
    console.log(this.taskModal.taskForm)
  }
}


