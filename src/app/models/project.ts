import { ProjectMember } from './project-member';
import { ProjectPhase } from './project-phase';
export class Project {
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

    // for UI input
    public isVisble: boolean;

    // For insrt and update
    public projectPhaseList: ProjectPhase[];
    public projectMemberList: ProjectMember[];
}
