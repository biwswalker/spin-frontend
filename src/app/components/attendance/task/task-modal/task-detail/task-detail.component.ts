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
declare var $: any;

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss', '../task-modal.component.scss'],

})
export class TaskDetailComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();

  public taskObj: Task = new Task();
  public projectObj: Project = new Project();
  public statusFlag: boolean = false;
  public colorFlag: string = '';
  public workStartTime: string = '';
  public workEndTime: string = '';
  public workDate: string = '';
  public topic: string = '';
  public activity: string = '';
  public projectId: number = 0;
  public project: any = '';
  public projectList: Project[] = [];
  public taskDetailFormGroup: FormGroup;
  public user: User;
  public mode: string;
  public favProjectList: any[] = ["project1", "project2", "project3"];

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private utilsService: UtilsService,
    private auth: AuthenticationService) {
    this.auth.crrUser.subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit() {
    this.taskObj = new Task();
    this.projectObj = new Project();
    this.findProject();
    this.validateData();
  }

  setDefaultData() {
    this.colorFlag = '';
    this.workStartTime = '';
    this.workEndTime = '';
    this.workDate = '';
    this.topic = '';
    this.activity = '';
    this.projectId = 0;
    this.project = '';
  }

  findProject() {
    this.projectService.fetchProjectAutocomplete().subscribe(
      data => {
        this.projectList = data;
      }
    )
  }

  initTaskDetail() {
    if (this.mode == Mode.E) {
      // this.projectService.findProjectById(this.taskObj.projectId).subscribe(
      //   project => {
      //     if (project) {
      //       this.taskService.selectedProjectId.next(project.projectId);
      //       this.project = project.projectName;
      //     }
      //   }
      // );
      console.log(this.project);
      this.initialTaskForUpdate();
    } else if (this.mode == Mode.V) {

    } else {
      this.setDefaultData();
      this.initialTime();
    }
    let self = this;
    $('#datepicker').datepicker({ dateFormat: Format.DATE_PIK, isBE: true, onSelect: (date) => self.onSelectCallBack(date) });
    this.validateData();
  }

  onSelectCallBack(date: string) {
    this.taskDetailFormGroup.patchValue({ taskDetailWorkDate: date });
  }

  initialTime() {
    this.workStartTime = this.taskObj.workStartTime ? this.utilsService.convertDisplayTime(this.taskObj.workStartTime) : '';
    this.workEndTime = this.taskObj.workEndTime ? this.utilsService.convertDisplayTime(this.taskObj.workEndTime) : '';
    this.workDate = this.taskObj.workDate ? this.utilsService.displayCalendarDate(this.taskObj.workDate) : '';
  }

  initialTaskForUpdate() {
    this.topic = this.taskObj.topic;
    this.activity = this.taskObj.activity;
    this.statusFlag = (this.taskObj.statusFlag == 'I' ? true : false);
    this.workStartTime = this.utilsService.convertDisplayTime(this.taskObj.workStartTime);
    this.workEndTime = this.utilsService.convertDisplayTime(this.taskObj.workEndTime);
    this.workDate = this.utilsService.displayCalendarDate(this.taskObj.workDate);
    this.messageEvent.emit(this.taskObj.color);
  }

  validateData() {
    this.taskDetailFormGroup = new FormGroup({
      taskDetailStatusFlag: new FormControl(this.statusFlag),
      taskDetailWorkDate: new FormControl(this.workDate, Validators.required),
      taskDetailStartTime: new FormControl(this.workStartTime, Validators.required),
      taskDetailEndTime: new FormControl(this.workEndTime, Validators.required),
      taskDetailTopic: new FormControl(this.topic, Validators.required),
      taskDetailActivity: new FormControl(this.activity, Validators.required),
      taskDetailProject: new FormControl(this.project, Validators.required)
    });
  }

  onColorPick(color) {
    if (color) {
      this.taskObj.color = color;
      this.messageEvent.emit(color);
    }
  }

  onChangeProject(event) {
    if (this.projectId != event.item.projectId) {
      this.projectId = event.item.projectId;
      this.taskService.selectedProjectId.next(this.projectId);
    }
  }

  getColorStatus(status) {
    console.log(status)
  }

}

