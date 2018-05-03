import { Project } from './../../../models/project';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProjectService } from '../../../providers/project.service';
import { EventMessagesService } from '../../../providers/utils/event-messages.service';
@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.scss']
})
export class ProjectSearchComponent implements OnInit {

  public projectSelected: Project = new Project;
  public projectList: any[] = [];
  public page = 1;
  public size = 5;
  public total = 0;
  public throttle = 1000;
  public scrollDistance = 1;
  public onlyMember = false;
  public keyword = '';
  // Send value back to parent
  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    private projectService: ProjectService,
    private eventMessageService: EventMessagesService
    ) {

   }

  ngOnInit() {
    this.projectService.projectHaveChanged.subscribe(
      ()=>{
        this.doSearch();
      })
  }

  onScrollDown() {
    this.projectService.findProjects((this.onlyMember?'Y':'N'),this.keyword,this.page,this.size).subscribe(
      data=>{
        this.total = data.totalElements;
        if(data.content){
          let newProject = [];
          for(let pj of data.content){
            if(!pj.projectThumbnail)
            pj.projectThumbnail = './assets/img/ico/startup.png';
          }

          this.projectList = [...this.projectList,...data.content]
          if(this.projectList.length != 0 && this.page == 1){
            this.onProjectSelected(this.projectList[0]);
          }
          this.page += 1;
        }

      },err=>{
        console.log(err);
        this.eventMessageService.onCustomError('เกิดข้อผิดพลาด',err.error.message);
      }
    )

  }

  doSearch(){
    this.projectList = [];
    this.page = 1;
    this.onScrollDown();
  }

  onProjectSelected(project){
    this.projectSelected = project;
    this.messageEvent.emit(project.projectId);
  }

  toggleFavoriteProject(projectId){

    this.projectService.toggleFavorite(projectId).subscribe(
      data=>{
        for(let prj of this.projectList){
          if(projectId == prj.projectId){
            prj.isFavorite = data;
          }
        }
      },err=>{
        console.log('Exception: ',err);
        this.eventMessageService.onCustomError('เกิดข้อผิดพลาด',err.error.message);
      }
    )

  }

}
