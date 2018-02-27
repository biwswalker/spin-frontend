
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../../../../providers/project.service';
import { Project } from '../../../../../models/project';
import { PartnerService } from '../../../../../providers/partner.service';
import { Task } from '../../../../../models/task';
import { UtilsService } from '../../../../../providers/utils/utils.service';
import { Format } from '../../../../../config/properties';
declare var $: any;

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss', '../task-modal.component.scss'],

})
export class TaskDetailComponent implements OnInit {


  public project: string = "";

  @Output() messageEvent = new EventEmitter<string>();
  public taskObj = new Task();
  public projectObj = new Project();
  public workDate = '';
  public startTime = '';
  public endTime = '';
  public doSelfFlag = true;
  public statusFlag = true;
  public colorFlag = '';

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

  initTaskDetail() {
    this.initialDefaultValue();
    this.startTime = this.utilsService.convertDisplayTime(this.taskObj.workStartTime);
    this.endTime = this.utilsService.convertDisplayTime(this.taskObj.workEndTime);
    let self = this;
    $('#datepicker').datepicker({ dateFormat: Format.DATE_PIKC, isBE: true, onSelect: (date) => self.onSelectCallBack(date) });
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
        taskDetailProject: new FormControl(this.projectObj, Validators.required)
      }
    )
  }

  initialDefaultValue() {
    this.taskObj.activeFlag = 'A';
    this.taskObj.statusFlag = 'I';
    this.taskObj.doSelfFlag = 'N';
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
    this.taskObj.projectId = event.item.projectId;
    // if (event.item.projectId) {
    //   this.partnerService.findByProjrctId(event.item.projectId).subscribe(
    //     data => {
    //       if (data) {
    //         console.log(data);
    //         this.taskPartnerList = [];
    //         for (let obj of data) {
    //           this.taskPartnerList.push({ userId: obj.id.userId, email: obj.user.email });
    //           console.log(data);
    //           this.taskModal.taskForm.taskMember = [];
    //           for (let obj of data) {
    //             this.taskModal.taskForm.taskMember.push({ userId: obj.id.userId, email: obj.user.email, status: true });
    //           }
    //         }
    //       }
    //     });
    //   this.partnerService.findAllUSer(event.item.projectId).subscribe(
    //     data => {
    //       if (data) {
    //         console.log(data);
    //         for (let obj of data) {
    //           this.taskModal.taskForm.autocompletePartnerList.push({ userId: obj.userId, email: obj.email });
    //         }
    //       }
    //     }
    //   );
    // }
  }


  getColorStatus(status) {
    console.log(status)
  }
}



