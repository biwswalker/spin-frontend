import { User } from "./user";

export class ProjectMember{
  public projectId: number;
  public userId: string;
  public respId: number;
  public remark: string;
  public activeFlag: number;
  public versionId: number;

  public user:User=new User;
}
