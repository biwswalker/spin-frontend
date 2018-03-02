
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
  public statusFlag = false;
  public colorFlag = '';
  public workStartTime = '';
  public workEndTime = '';
  public workDate = '';
  public topic = '';
  public activity = '';
  public projectId: number;
  public project = '';
  public projectList: Project[] = [];
  public taskDetailFormGroup: FormGroup;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    console.log('oninit')
    this.taskObj = new Task();
    this.projectObj = new Project();
    this.findProject();
    this.validateData();
  }

  initTaskDetail() {
    this.taskObj.color = 'primary';
    this.project = '';
    this.activity = '';
    this.topic = '';
    this.workDate = '';
    this.workStartTime = '';
    this.workEndTime = '';
    this.workStartTime = this.taskObj.workStartTime ? this.utilsService.convertDisplayTime(this.taskObj.workStartTime): '';
    this.workEndTime = this.taskObj.workEndTime ? this.utilsService.convertDisplayTime(this.taskObj.workEndTime): '';
    this.workDate = this.taskObj.workDate ? this.utilsService.displayCalendarDate(this.taskObj.workDate): '';
    let self = this;
    $('#datepicker').datepicker({ dateFormat: Format.DATE_PIK, isBE: true, onSelect: (date) => self.onSelectCallBack(date) });
    this.validateData();
  }

  onSelectCallBack(date: string) {
    this.workDate = date;
    console.log(date);
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

  findProject() {
    this.projectService.fetchProjectAutocomplete().subscribe(
      data => {
        this.projectList = data;
      }
    )
  }

  onChangeProject(event) {
    this.projectId = event.item.projectId;
    this.taskService.selectedProjectId.next(this.projectId);
  }

  getColorStatus(status) {
    console.log(status)
  }
}


