export class ProjectPhase{
  public id:Id;
  public phaseName: string;
  public startDate: string;
  public endDate: string;
  public versionId:number;
}

class Id{
  public projectId: number;
  public seqId: number;
}
