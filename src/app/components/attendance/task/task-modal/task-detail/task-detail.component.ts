import { User } from './../../../../../models/user';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskModalComponent } from './../task-modal.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../../../../providers/project.service';
import { Project } from '../../../../../models/project';
import { PartnerService } from '../../../../../providers/partner.service';
import { Task } from '../../../../../models/task';
import { UtilsService } from '../../../../../providers/utils/utils.service';
import { Format, Mode } from '../../../../../config/properties';
import { TaskService } from '../../../../../providers/task.service';
import { AuthenticationService } from '../../../../../providers/authentication.service';
import { Observable } from 'rxjs/Observable';
declare var $: any;

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss', '../task-modal.component.scss'],

})
export class TaskDetailComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();

  public taskObj: Task = new Task();
  public statusFlag: boolean = false;
  public workStartTime: string = '';
  public workEndTime: string = '';
  public workDate: string = '';
  public topic: string = '';
  public activity: string = '';
  public projectId: number = 0;
  public project: any = '';
  public projectList: Project[];
  public taskDetailFormGroup: FormGroup;
  public user: User;
  // public color: string;
  public mode: string;
  public isDisabled: boolean;
  public favProjectList = new Observable<Project[]>();
  public timeList: any[];
  public endTimeList: any[];

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private utilsService: UtilsService,
    private auth: AuthenticationService) {
  }

  ngOnInit() {
    // Get User
    this.user = this.auth.getUser();
    this.taskObj = new Task();
    this.validateData();
    // Initial Fav Project
    this.favProjectList = this.projectService.findFavoriteProjectByUserId(this.user.userId);
    // Find project
    this.projectService.fetchProjectAutocomplete().subscribe(
      projects=>{
        this.projectList = projects;
      }
    )
  }

  resetData() {
    this.taskDetailFormGroup.reset();
    this.workStartTime = '';
    this.workEndTime = '';
    this.workDate = '';
    this.topic = '';
    this.activity = '';
    this.projectId = 0;
    this.project = '';
    this.statusFlag = false;
  }

  initTaskDetail(task: Task, mode: string) {
    console.log('initialTaskDetail');
    if(mode == 'VIEW'){
      this.isDisabled = true;
      this.taskDetailFormGroup.disable();
    }else{
      this.isDisabled = false;
      this.taskDetailFormGroup.enable();
    }
    this.taskObj = new Task();
    this.taskObj = task;
    this.mode = mode;
    this.resetData();
    this.initialTime();
    this.initialData();
    this.validateData();
    this.timeList = this.utilsService.getTimeList();
  }

  initialTime() {
    this.workStartTime = this.taskObj.workStartTime ? this.utilsService.convertDisplayTime(this.taskObj.workStartTime) : '';
    this.workEndTime = this.taskObj.workEndTime ? this.utilsService.convertDisplayTime(this.taskObj.workEndTime) : '';
    this.workDate = this.taskObj.workDate ? this.utilsService.displayCalendarDate(this.taskObj.workDate) : '';
    this.endTimeList = this.utilsService.getEndTimeList(this.workStartTime);
  }

  initialData() {
    this.topic = this.taskObj.topic;
    this.activity = this.taskObj.activity;
    this.projectId = this.taskObj.projectId;
    this.messageEvent.emit(this.taskObj.color);
  }

  validateData() {
    this.taskDetailFormGroup = new FormGroup({
      taskDetailStatusFlag: new FormControl(this.taskObj.statusFlag == 'A' ? true : false),
      taskDetailWorkDate: new FormControl(this.workDate, Validators.required),
      taskDetailStartTime: new FormControl(this.workStartTime, Validators.required),
      taskDetailEndTime: new FormControl(this.workEndTime, Validators.required),
      taskDetailTopic: new FormControl(this.topic, Validators.required),
      taskDetailActivity: new FormControl(this.activity, Validators.required),
      taskDetailProject: new FormControl(this.project, Validators.required)
    });
  }

  onColorPick(color) {
    this.taskObj.color = color;
    if (this.taskObj.color) {
      this.messageEvent.emit(this.taskObj.color);
    }
  }

  onChangeProject(event) {
    if (this.projectId != event.item.projectId) {
      this.projectId = event.item.projectId;
      this.taskService.changeProjectId(this.projectId);
    }
  }

  onFavoriteClick(event) {
    this.taskDetailFormGroup.patchValue({ taskDetailProject: event.projectName });
    this.projectId = event.projectId;
    this.taskService.changeProjectId(event.projectId);
  }

  onChangeTime() {
    let startTime = this.taskDetailFormGroup.value.taskDetailStartTime;
    let endTime = this.taskDetailFormGroup.value.taskDetailEndTime;
    this.endTimeList = this.utilsService.getTimeList();
    this.endTimeList.splice(0, this.endTimeList.indexOf(startTime) + 1);
    this.workStartTime = startTime;
    if ((this.timeList.indexOf(startTime) - this.timeList.indexOf(endTime)) >= 0) {
      this.taskDetailFormGroup.patchValue({ taskDetailEndTime: this.endTimeList[0] });
    }
  }

  initialEndTimeList() {
    this.endTimeList = this.utilsService.getTimeList();
    return this.endTimeList.splice(0, this.endTimeList.indexOf(this.workStartTime) + 1);
  }
}

