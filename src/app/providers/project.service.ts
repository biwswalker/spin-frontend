import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';
import { Method } from '../config/properties';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../models/project';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {

  public editProject = new BehaviorSubject<Project>(new Project);
  public currentProjectAct = this.editProject.asObservable();

  private isProjectHaveChanged = new BehaviorSubject<number>(0);
  public projectHaveChanged = this.isProjectHaveChanged.asObservable();

  private holderPojectAbbr: any[] = [];

  constructor(private request: HttpRequestService) { }

  // Begin Insert Update Delete Actions
  createProject(project) {

    return this.request.requestMethodPUT('project-management/projects', project);
  }

  updateProject(project) {
    return this.request.requestMethodPOST('project-management/projects', project);
  }

  async removeProject(projectId) {
    let promise = await new Promise((resolve) => {
      this.request.requestMethodDelete(`project-management/projects/${projectId}`).subscribe(
        data => {
          resolve({ status: 200 });
        },
        error => {
          console.log(error)
          resolve(error)
        }
      )
    })
    return promise;
  }

  toggleFavorite(projectId) {
    return this.request.requestMethodGET('favorite-project-management/favorite-projects/' + projectId);
  }
  // End Insert Update Delete Actions


  // Begin find for display action
  findProjects(isMember, term, page, size) {
    return this.request.requestMethodGET(`project-management/projects/find-allow-project?isMember=${isMember}&p=${page}&s=${size}&term=${term}`);

  }
  findProjectById(projectId) {
    return this.request.requestMethodGET('project-management/projects/' + projectId);
  }
  findProjectPhaseById(projectId) {
    return this.request.requestMethodGET('project-phase-management/project-phases/' + projectId);
  }
  findProjectMemberById(projectId) {
    return this.request.requestMethodGET('project-member-management/project-members/' + projectId);
  }
  findMemberSummary(projectId, seqId) {
    return this.request.requestMethodGET('task-management/sums-each-user-id/project-id/' + projectId + '/phase-id/' + seqId);
  }
  findTagsSummary(projectId, seqId) {
    return this.request.requestMethodGET('task-management/sums-each-tags/project-id/' + projectId + '/phase-id/' + seqId);
  }
  findProjectAbbrById(projectId) {
    let filteredPrj = this.holderPojectAbbr.find(prj => prj.projectId === projectId)
    if (!filteredPrj) {
      return this.findProjectById(projectId).map(project => {
        this.holderPojectAbbr.push({ projectId: project.projectId, projectAbbr: project.projectAbbr })
        return project.projectAbbr;
      });
    } else {
      return Observable.of(filteredPrj.projectAbbr)
    }
  }
  // End find for display action

  findFavoriteProjectByUserId(userId: string) {
    return this.request.requestMethodGET('favorite-project-management/favorite-projects/find-autocomplete-project');
  }

  fetchProjectAutocomplete() {
    return this.request.requestMethodGET('project-management/projects/find-autocomplete-project/N').map(projects => {
      console.log(projects)
      for (let obj of projects) {
        obj.projectName = obj.projectAbbr + ' : ' + obj.projectName;
      }

      return projects
    })
  }


  onUpdateProject(project: Project) {
    this.editProject.next(project);
  }

  onProjectHaveChanged() {
    this.isProjectHaveChanged.next(1);
  }

  projectTagReport(projectId: number, startDate: string, endDate: string) {
    return this.request.requestMethodGET(`task-management/report-project-tag/project-id/${projectId}/start-date/${startDate}/end-date/${endDate}`)
  }

  projectPersonReport(projectId: number, startDate: string, endDate: string) {
    return this.request.requestMethodGET(`task-management/report-project-person/project-id/${projectId}/start-date/${startDate}/end-date/${endDate}`)
  }

  findByTaskId(refId: number) {
    return this.request.requestMethodGET(`project-member-management/project-members/task-id/${refId}`);
  }
}
