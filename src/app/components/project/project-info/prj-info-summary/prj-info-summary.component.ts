import { ProjectPhase } from './../../../../models/project-phase';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { ProjectService } from '../../../../providers/project.service';
declare var SpinCustomListUI: any;
@Component({
  selector: 'app-prj-info-summary',
  templateUrl: './prj-info-summary.component.html',
  styleUrls: ['./prj-info-summary.component.scss']
})
export class PrjInfoSummaryComponent implements OnInit {
  public projectId:string;
  public seqId:string;
  public projectPhases: ProjectPhase[]=[];
  public memberSpent:Summary = new Summary;
  public memberSummary: any[] = [];
  public tagsSpent: Summary = new Summary;
  public tagsSummary: any[] = [];
  private spinCustomList = new SpinCustomListUI;
  constructor(
    private projectService: ProjectService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.spinCustomList.selectOne('.tags-filter-list');
  }


  displayProjectSummary(projectId,seqId){
    console.log('projectId: '+projectId+'    phaseId: '+seqId);
    this.projectId = (projectId?projectId:this.projectId);
    console.log('this.projectId: ',this.projectId);
    this.memberSpent = new Summary;
    this.tagsSpent = new Summary;
    this.memberSummary=[];
    this.tagsSummary=[];
    this.projectService.findMemberSummary(this.projectId,seqId).subscribe(
      data=>{
        console.log(data);
        if(data!){
          this.memberSpent = data.maxSpentTime;
          this.memberSpent.hour = this.utilsService.calcurateHours(data.maxSpentTime.hour,data.maxSpentTime.minute);
          for(let mem of data.summary){
            let memSum = {name:null,hour:0};
            memSum.name = mem.name;
            memSum.hour = this.utilsService.calcurateHours(mem.hour,mem.minute);
            this.memberSummary = this.memberSummary.concat(memSum);
          }
        }
      },err=>{
        console.log('Exception: ',err);
      }
    );

    this.projectService.findTagsSummary(this.projectId,seqId).subscribe(
      data=>{
        console.log(data);
        if(data!){
          this.tagsSpent = data.maxSpentTime;

          console.log('max spent time: ',data.maxSpentTime);
          this.tagsSpent.hour = this.utilsService.calcurateHours(data.maxSpentTime.hour,data.maxSpentTime.minute);

          for(let mem of data.summary){
            let tagSum = {name:null,hour:0};
            tagSum.name = mem.name;
            tagSum.hour = this.utilsService.calcurateHours(mem.hour,mem.minute);
            this.tagsSummary = this.tagsSummary.concat(tagSum);
          }
        }
      },err=>{
        console.log('Exception: ',err);
      }
    )

  }

}

class Summary{
  maxSpentTime:number = 0;
  hour:number = 0;
  constructor(){
    this.maxSpentTime = 0;
    this.hour = 0;
  }
}
