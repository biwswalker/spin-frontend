import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskModalComponent } from './../task-modal.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Time } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ProjectService } from '../../../../../providers/project.service';
import { Project } from '../../../../../models/project';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss', '../task-modal.component.scss'],

})
export class TaskDetailComponent implements OnInit {


  @Output() messageEvent = new EventEmitter<string>();

  data: any = "";
  projectList: Project[] = [];
  public taskDetailFormGroup: FormGroup;
  colorStatus: boolean = true;
  constructor(
    public taskModal: TaskModalComponent,
    private _sanitizer: DomSanitizer,
    private projectService: ProjectService) { }

  ngOnInit() {
    // this.validateData();
    this.initialDefaultValue();
    this.findProject();
  }
  validateData() {
    this.taskDetailFormGroup = new FormGroup(
      {
        taskDetailStatusFlag: new FormControl((this.taskModal.taskForm.task.statusFlag == 'A' ? true : false)),
        taskDetailWorkDate: new FormControl(this.taskModal.taskForm.task.workDate, Validators.required),
        taskDetailStartTime: new FormControl(this.taskModal.taskForm.task.workStartTime, Validators.required),
        taskDetailEndTime: new FormControl(this.taskModal.taskForm.task.workEndTime, Validators.required),
        taskDetailTopic: new FormControl(this.taskModal.taskForm.task.topic, Validators.required),
        taskDetailActivity: new FormControl(this.taskModal.taskForm.task.activity, Validators.required),
        taskDetailProject: new FormControl(this.taskModal.taskForm.taskProject, Validators.required)
      }
    )
  }

  initialDefaultValue() {
    this.taskModal.taskForm.task.activeFlag = 'A';
    this.taskModal.taskForm.task.statusFlag = 'I';
    this.taskModal.taskForm.task.doSelfFlag = 'N';
    this.taskModal.taskForm.task.taskPartnerList = [];
    this.taskModal.taskForm.task.taskTagList = [];
  }

  onColorPick(color) {
    if (color) {
      this.taskModal.taskForm.task.color = color;
      this.messageEvent.emit(color);
    }
  }

  findProject(){
    this.projectService.fetchProjectAutocomplete().subscribe(
      data=>{
        this.projectList = data;
        console.log(this.projectList);
      }
    )
  }

  showData(event){
    console.log(event)
    // this.taskModal.taskForm.taskProject = event;
    // console.log(this.taskModal.taskForm.taskProject)

  }
}



