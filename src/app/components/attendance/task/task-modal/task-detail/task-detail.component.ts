
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskModalComponent } from './../task-modal.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() messageEvent = new EventEmitter<string>();
  public taskObj = new Task();
  public projectObj = new Project();
  public workDate = '';
  public startTime = '';
  public endTime = '';
  public doSelfFlag = true;
  public statusFlag = true;
  public colorFlag = '';

  public project: any;
  public projectList: Project[] = [];
  public taskDetailFormGroup: FormGroup;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.taskObj = new Task();
    this.projectObj = new Project();
    this.findProject();
  }

  initTaskDetail() {
    this.startTime = this.utilsService.convertDisplayTime(this.taskObj.workStartTime);
    this.endTime = this.utilsService.convertDisplayTime(this.taskObj.workEndTime);
    this.workDate = this.utilsService.displayCalendarDate(this.taskObj.workDate);
    let self = this;
    $('#datepicker').datepicker({ dateFormat: Format.DATE_PIK, isBE: true, onSelect: (date) => self.onSelectCallBack(date) });
  }

  onSelectCallBack(date: string) {
    console.log(date)
  }

  validateData() {
    this.taskDetailFormGroup = new FormGroup(
      {
        taskDetailStatusFlag: new FormControl((this.taskObj.statusFlag == 'A' ? true : false)),
        taskDetailWorkDate: new FormControl(this.taskObj.workDate, Validators.required),
        taskDetailStartTime: new FormControl(this.taskObj.workStartTime, Validators.required),
        taskDetailEndTime: new FormControl(this.taskObj.workEndTime, Validators.required),
        taskDetailTopic: new FormControl(this.taskObj.topic, Validators.required),
        taskDetailActivity: new FormControl(this.taskObj.activity, Validators.required),
        taskDetailProject: new FormControl(this.project, Validators.required)
      }
    )
  }

  // initialDefaultValue() {
  //   this.taskObj.activeFlag = 'A';
  //   this.taskObj.statusFlag = 'I';
  //   this.taskObj.doSelfFlag = 'N';
  //   this.taskObjPartnerList = [];
  //   this.taskObjTagList = [];
  // }

  onColorPick(color) {
    if (color) {
      this.taskObj.color = color;
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

  onChangeProject(event) {
    let projectId = event.item.projectId;
    this.taskService.selectedProjectId.next(projectId);
  }

  getColorStatus(status) {
    console.log(status)
  }
}



