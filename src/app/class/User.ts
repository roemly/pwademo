export class User{
  id: number;
  username: string;
  email: string;
  token: string;
  avatar: string = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

  constructor(id: number,username: string, email: string, token: string, avatar: string = null) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.token = token;
    if (avatar) {
      this.avatar = avatar;
    }
  }
}
