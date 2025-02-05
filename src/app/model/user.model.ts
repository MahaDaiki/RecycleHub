export class UserModel {
  // private static nextId = 1;
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
    // this.id = UserModel.nextId++;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.id = users.length > 0 ? Math.max(...users.map((u: any) => u.id)) + 1 : 1;
  }
}
