import {Pet} from './Pet';

export class User {
  constructor(public id?: number,
              public username?: string,
              public email?: string,
              public password?: string,
              public role?: string,
              public avatar?: string,
              public phoneNumber?: string,
              public name?: string,
              public surname?: string,
              public userLocation?: Location,
              public pets?: Pet[]) {
  }
}
