
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../../../../providers/project.service';
import { Project } from '../../../../../models/project';
import { PartnerService } from '../../../../../providers/partner.service';
import { Task } from '../../../../../models/task';
import { UtilsService } from '../../../../../providers/utils/utils.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss', '../task-modal.component.scss'],

})
export class TaskDetailComponent implements OnInit, AfterViewInit {


  public project: string = "Summit Personnel Information Network10";

  @Output() messageEvent = new EventEmitter<string>();
  public taskObj = new Task();
  public projectObj = new Project();
  public taskPartnerList = [];
  public taskTagList = [];
  public startTime = '';
  public endTime = '';

  public projectList: Project[] = [];
  public taskDetailFormGroup: FormGroup;
  colorStatus: boolean = true;

  constructor(
    private projectService: ProjectService,
    private partnerService: PartnerService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.taskObj = new Task();
    this.projectObj = new Project();
    this.findProject();
  }

  ngAfterViewInit() {
  }

  initTaskDetail() {
    this.initialDefaultValue();
    this.startTime = this.utilsService.convertDisplayTime(this.taskObj.workStartTime);
    this.endTime = this.utilsService.convertDisplayTime(this.taskObj.workEndTime);
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
        taskDetailProject: new FormControl(this.projectObj, Validators.required)
      }
    )
  }

  initialDefaultValue() {
    this.taskObj.activeFlag = 'A';
    this.taskObj.statusFlag = 'I';
    this.taskObj.doSelfFlag = 'N';
    this.taskPartnerList = [];
    this.taskTagList = [];
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
        console.log(data)
        this.projectList = data;
      }
    )
  }

  findProjectMember(event) {
    console.log(this.project)
    console.log(event.item.projectId);
    if (event.item.projectId) {
      this.partnerService.findByProjrctId(event.item.projectId).subscribe(
        data => {
          if (data) {
            console.log(data);
            this.taskPartnerList = [];
            for (let obj of data) {
              this.taskPartnerList.push({ userId: obj.id.userId, email: obj.user.email });
            }
          }
        }
      );
    }
  }

  getColorStatus(status) {
    console.log(status)
  }
}



