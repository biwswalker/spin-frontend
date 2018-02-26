import { TaskTag } from "./task-tag";
import { TaskPartner } from "./task-partner";

export class Task {
    public taskId: number;
    public ownerUserId: string;
    public projectId: number;
    public topic: string;
    public activity: string;
    public workDate: string;
    public workStartTime: string;
    public workEndTime: string;
    public color: string;
    public statusFlag: string;
    public doSelfFlag: string;
    public taskType: string;
    public referTaskId: number;
    public remark: string;
    public activeFlag: string;

    public taskTagList: string[] = [];
    public taskPartnerList: string[] = [];
}
