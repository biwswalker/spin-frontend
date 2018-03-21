export class ProjectPhase{
  public id:Id;
  public phaseName: string;
  public startDate: string;
  public endDate: string;
  public versionId:number;
  constructor(){
    this.id = new Id();
    this.phaseName = null;
    this.startDate = null;
    this.endDate = null;
    this.versionId = 0;
  }
}

class Id{
  public projectId: number;
  public seqId: number;
}
