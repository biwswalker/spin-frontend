import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../providers/project.service';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.scss']
})
export class ProjectSearchComponent implements OnInit {

  public projectList: any[] = [];
  page = 1;
  size = 5;

  throttle = 1000;
  scrollDistance = 1;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.onScrollDown();

  }

  onScrollDown() {
    console.log('scrolled!!');
    this.projectService.findProjects('N',this.page,this.size).subscribe(
      data=>{
        console.log(data);
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

}
