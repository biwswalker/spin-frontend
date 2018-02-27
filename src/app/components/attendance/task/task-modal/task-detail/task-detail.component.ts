
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskModalComponent } from './../task-modal.component';
import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Time } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ProjectService } from '../../../../../providers/project.service';
import { Project } from '../../../../../models/project';
import { PartnerService } from '../../../../../providers/partner.service';
import { Task } from '../../../../../models/task';
import { UtilsService } from '../../../../../providers/utils/utils.service';
import { Format } from '../../../../../config/properties';
import { TaskService } from '../../../../../providers/task.service';
declare var $: any;

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss', '../task-modal.component.scss'],

})
export class TaskDetailComponent implements OnInit {

  startTime: string;
  endTime:string;
  topic: string;
  activity: string;
  colorFlag: string;

  @Output() messageEvent = new EventEmitter<string>();

  public project: any;
  public projectList: Project[] = [];
  public taskDetailFormGroup: FormGroup;

  constructor(
    public taskModal: TaskModalComponent,
    private _sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private taskService: TaskService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.taskModal.taskForm.doSelfFlag = true;
    this.findProject();
  }

  onSelectCallBack(date: string) {
    console.log(date)
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

  // initialDefaultValue() {
  //   this.taskModal.taskForm.task.activeFlag = 'A';
  //   this.taskModal.taskForm.task.statusFlag = 'I';
  //   this.taskModal.taskForm.task.doSelfFlag = 'N';
  //   this.taskModal.taskForm.taskPartnerList = [];
  //   this.taskModal.taskForm.taskTagList = [];
  // }

  onColorPick(color) {
    if (color) {
      this.taskModal.taskForm.task.color = color;
      this.messageEvent.emit(color);
    }
  }

  findProject() {
    this.projectService.fetchProjectAutocomplete().subscribe(
      data => {
        console.log(data)
        // this.projectList = data;
      }
    )
  }

  findProjectMember(event) {
    console.log(event);
    let projectId = event.item.projectId;
    this.taskService.selectedProjectId.next(projectId);
  }

  getColorStatus(status) {
    console.log(status)
  }
}



