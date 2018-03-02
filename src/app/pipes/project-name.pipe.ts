import { Pipe, PipeTransform } from '@angular/core';
import { ProjectService } from '../providers/project.service';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'projectName'
})
export class ProjectNamePipe implements PipeTransform {

  constructor(private projectService: ProjectService) { }

  transform(projectId: any, args?: any): any {
    if (projectId) {
      return this.projectService.findProjectAbbrById(projectId);
    }
    return Observable.of('');
  }
}
