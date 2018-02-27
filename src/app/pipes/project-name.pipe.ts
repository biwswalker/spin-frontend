import { Pipe, PipeTransform } from '@angular/core';
import { ProjectService } from '../providers/project.service';

@Pipe({
  name: 'projectName'
})
export class ProjectNamePipe implements PipeTransform {

  constructor(private projectService: ProjectService) { }

  transform(projectId: any, args?: any): any {
    if (projectId) {
      return this.projectService.findProjectById(projectId).subscribe(project => {
        return project.projectName;
      });
    }
    return '';
  }
}
