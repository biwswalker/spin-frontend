import { User } from './../../../../../models/user';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskModalComponent } from './../task-modal.component';
import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
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
  public mode: string;
  public copyTask: boolean = false;
  public isDisabled: boolean;
  public favProjectList = new Observable<Project[]>();
  public timeList: any[];
  public endTimeList: any[];
  public datePattern: any[] = [];
  public disabledTab: boolean = true;
  public showFavPrj: boolean = false;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private utilsService: UtilsService,
    private auth: AuthenticationService,
    private ngZone: NgZone) {
    this.auth.crrUser.subscribe((user: User) => {
      this.user = user;
    });
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
      projects => {
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
    console.log(this.taskDetailFormGroup.value);
    console.log(task);
    this.mode = mode;
    if (this.mode === 'VIEW') {
      this.isDisabled = true;
      this.showFavPrj = false;
      this.taskDetailFormGroup.disable();
    } else if (this.mode == Mode.I) {
      this.isDisabled = false;
      this.showFavPrj = true;
      this.taskDetailFormGroup.enable();
      if (task.taskId) {
        this.showFavPrj = false;
        this.isDisabled = false;
        this.taskDetailFormGroup.controls['taskDetailProject'].disable();
        this.taskDetailFormGroup.controls['taskDetailTopic'].disable();
        if (task.ownerUserId == this.user.userId) {
          this.taskDetailFormGroup.controls['taskDetailTopic'].enable();
        }
      }
    } else {
      this.showFavPrj = false;
      this.taskDetailFormGroup.controls['taskDetailTopic'].enable();
      this.taskDetailFormGroup.controls['taskDetailProject'].disable();
      this.isDisabled = false;
    }
    this.taskObj = new Task();
    this.taskObj = task;
    this.resetData();
    this.initialTime();
    this.initialData();
    this.validateData();
    this.timeList = this.utilsService.getTimeList();

    this.ngZone.runOutsideAngular(() => {
      this.ngZone.run(() => { console.log('ngZone.runOutsideAngular'); });
      this.utilsService.loader(false);
    });
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
  //<------------------------- TYPE-AHEAD-------------------------------->
  onChangeProject(event) {
    // this.utilsService.loader(true);
    console.log(event.item);
    this.taskDetailFormGroup.patchValue({ taskDetailProject: event.item.projectName });
    this.projectId = event.item.projectId;
    this.taskService.changeProjectId(event.item.projectId);
  }

  onFavoriteClick(event) {
    console.log(event);
    this.taskDetailFormGroup.patchValue({ taskDetailProject: event.projectName });
    this.projectId = event.projectId;
    this.taskService.changeProjectId(event.projectId);
  }

  onBlurProject(event) {
    console.log(event);
    if (event) {
      this.project = event.projectName;
      this.taskDetailFormGroup.patchValue({ taskDetailProject: event.projectName });
      this.taskService.changeProjectId(event.projectId);
    }
  }
  //<------------------------- TYPE-AHEAD-------------------------------->

  //<------------------------- NG-SELECT-------------------------------->
  onSelectProject(event) {
    console.log(event)
    // this.taskDetailFormGroup.patchValue({ taskDetailProject: event.projectName });
    this.projectId = event.projectId;
    this.taskService.changeProjectId(event.projectId);
    console.log(this.taskDetailFormGroup.value.taskDetailProject);
  }

  //<------------------------- NG-SELECT-------------------------------->

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

