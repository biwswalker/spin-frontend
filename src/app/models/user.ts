import { Department } from './department';
import { Officer } from './officer';
export class User{
  public userId: string;
  public userPws:string;
  public officerId: string;
  public email:string;
  public userLevel:string;
  public remark:string;
  public activeFlag:string;
  public versionId:number;

  public officer: Officer = new Officer;
  public department: Department = new Department;


  public fullName: string;
}
