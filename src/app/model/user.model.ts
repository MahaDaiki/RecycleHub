export class UserModel {


  constructor(
    public id: number,
    public email: string,
    public password: string,
    public fullName: string,
    public phoneNumber: string,
    public address: string,
    public dateOfBirth: string,
    public role: string,
    public profilePicture?: string

  ) {

  }
}
