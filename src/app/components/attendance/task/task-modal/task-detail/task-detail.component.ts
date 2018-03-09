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
  public projectList = new Observable<Project[]>();
  public taskDetailFormGroup: FormGroup;
  public user: User;
  public color: string;
  public mode: string;
  public favProjectList = new Observable<Project[]>();

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
    this.projectList = this.projectService.fetchProjectAutocomplete();
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
    this.taskObj = new Task();
    this.taskObj = task;
    this.mode = mode;
    this.resetData();
    this.initialTime();
    this.initialData();
    this.validateData();
  }

  onSelectCallBack(date: string) {
    this.taskDetailFormGroup.patchValue({ taskDetailWorkDate: date });
  }

  initialTime() {
    this.workStartTime = this.taskObj.workStartTime ? this.utilsService.convertDisplayTime(this.taskObj.workStartTime) : '';
    // this.taskDetailFormGroup.patchValue({ taskDetailStartTime: this.workStartTime });
    this.workEndTime = this.taskObj.workEndTime ? this.utilsService.convertDisplayTime(this.taskObj.workEndTime) : '';
    // this.taskDetailFormGroup.patchValue({ taskDetailEndTime: this.workEndTime });
    this.workDate = this.taskObj.workDate ? this.utilsService.displayCalendarDate(this.taskObj.workDate) : '';
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
    this.color = color;
    if (this.color) {
      this.taskObj.color = this.color;
      this.messageEvent.emit(this.color);
    }
  }

  onChangeProject(event) {
    if (this.projectId != event.item.projectId) {
      this.projectId = event.item.projectId;
      this.taskService.selectedProjectId.next(this.projectId);
    }
  }

  onFavoriteClick(event) {
    this.taskDetailFormGroup.patchValue({ taskDetailProject: event.projectName });
    this.projectId = event.projectId;
    this.taskService.selectedProjectId.next(event.projectId);
  }

}

