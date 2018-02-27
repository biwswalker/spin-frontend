export class TaskPartner {
  public id: Id;
  public email: string;
  public versionId: number;
  public sortNo: number;
}

class Id {
  public taskId: number;
  public userId: string;
}
