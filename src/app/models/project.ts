import { ProjectMember } from './project-member';
import { ProjectPhase } from './project-phase';
export class Project {

  // For insrt and update
    public projectId: number;
    public projectName: string;
    public projectAbbr: string;
    public customerName: string;
    public detail: string;
    public hardware: string;
    public software: string;
    public visibilityFlag: string;
    public remark: string;
    public activeFlag: string;
    public projectImage: any;
    public projectThumbnail: any;
    public projectPhaseList: ProjectPhase[];
    public projectMemberList: ProjectMember[];

    // for UI input and Display
    public isVisble: boolean;
    public startDate: string;
    public endDate: string;
    public phaseName: string;
    public isFavorite: boolean;


}
