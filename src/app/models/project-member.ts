import { User } from "./user";
import { Responsibility } from "./responsibility";

export class ProjectMember{
  public projectId: number;
  public userId: string;
  public respId: number;
  public remark: string;
  public activeFlag: number;
  public versionId: number;

  public user:User;
  public responsibility: Responsibility;
}
