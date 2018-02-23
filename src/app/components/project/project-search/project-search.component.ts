import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../providers/project.service';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.scss']
})
export class ProjectSearchComponent implements OnInit {

  public projectList: any[] = [];
  public page = 1;
  public size = 5;

  public throttle = 1000;
  public scrollDistance = 1;
  public isVisibility = false;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.onScrollDown();

  }

  onScrollDown() {
    console.log('scrolled!!');
    this.projectService.findProjects((this.isVisibility?'Y':'N'),this.page,this.size).subscribe(
      data=>{
        if(data.length != 0){
          this.projectList = this.projectList.concat(data);
          console.log(this.projectList);
          this.page += 1;
        }

      },err=>{
        console.log(err);
      }
    )

  }

  onChangeProjectVisibility(){
    console.log(this.isVisibility);
    this.projectList = [];
    this.page = 1;
    this.onScrollDown();
  }

}
