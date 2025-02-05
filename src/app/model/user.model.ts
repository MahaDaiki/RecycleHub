export class UserModel {
  private static nextId = 1;
  public id: number;
  constructor(
    public email: string,
    public password: string,
    public fullName: string,
    public phoneNumber: string,
    public address: string,
    public dateOfBirth: string,
    public role: string,
    public profilePicture?: string

  ) {
    this.id = UserModel.nextId++;
  }
}
