
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskModalComponent } from './../task-modal.component';
import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Time } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ProjectService } from '../../../../../providers/project.service';
import { Project } from '../../../../../models/project';
import { PartnerService } from '../../../../../providers/partner.service';
declare var SpinDatePicker: any;
declare var $: any;

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss', '../task-modal.component.scss'],

})
export class TaskDetailComponent implements OnInit, AfterViewInit {

  @Output() messageEvent = new EventEmitter<string>();
  public project: any;
  public projectList: Project[] = [];
  public taskDetailFormGroup: FormGroup;
  constructor(
    public taskModal: TaskModalComponent,
    private _sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private partnerService: PartnerService) { }

  ngOnInit() {
    this.taskModal.taskForm.doSelfFlag = true;
    // this.initialDefaultValue();
    this.findProject();
  }

  ngAfterViewInit(){
    let self = this;
    $('#datepicker').datepicker({ dateFormat: 'dd/mm/yy', isBE: true , onSelect:(date)=>self.onSelectCallBack(date)});
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

  initialDefaultValue() {
    this.taskModal.taskForm.task.activeFlag = 'A';
    this.taskModal.taskForm.task.statusFlag = 'I';
    this.taskModal.taskForm.task.doSelfFlag = 'N';
    this.taskModal.taskForm.taskPartnerList = [];
    this.taskModal.taskForm.taskTagList = [];
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
        console.log(data)
        this.projectList = data;
      }
    )
  }

  findProjectMember(event){
    if(event.item.projectId){
      this.partnerService.findByProjrctId(event.item.projectId).subscribe(
        data=>{
          if(data){
            console.log(data);
            this.taskModal.taskForm.taskMember = [];
            for(let obj of data){
              this.taskModal.taskForm.taskMember.push({userId: obj.id.userId, email: obj.user.email, status: true});
            }
          }
        }
      );
    }
  }

  getColorStatus(status){
    console.log(status)
  }
}



