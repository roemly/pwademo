export class User{
  id: number;
  name: string;
  telp: string;
  email: string;
  token: string;
  alamat: string;
  avatar: string = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

  constructor(id: number,name: string, telp: string, email: string, token: string, alamat: string, avatar: string = null) {
    this.id = id;
    this.name = name;
    this.telp = telp;
    this.email = email;
    this.token = token;
    this.alamat = alamat;
    if (avatar) {
      this.avatar = avatar;
    }
  }
}
