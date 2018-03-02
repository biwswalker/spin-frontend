import { User } from "./user";
import { Responsibility } from "./responsibility";

export class ProjectMember{
  public id:Id = new Id;
  public respId: number;
  public remark: string;
  public activeFlag: string;
  public versionId: number;
  public respName:string;
  //use for store data
  public user:User;
  public responsibility: Responsibility;

}
class Id{
  public projectId: number;
  public userId: string;

}
