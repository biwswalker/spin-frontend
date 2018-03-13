import { Position } from './position';
import { Department } from "./department";

export class Officer {
    public officeId: string;
    public titleTh: string;
    public firstNameTh: string;
    public lastNameTh: string;
    public titleEn: string;
    public firstNameEn: string;
    public lastNameEn: string;
    public startDate: string;
    public deptId: number;
    public positionId: number;
    public remark: string;
    public activeFlag: string;
    public versionId: number;

    public department: Department;
    public position: Position;

    constructor() {
        this.department = new Department();
        this.position = new Position;
    }

}
