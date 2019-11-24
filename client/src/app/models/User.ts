import {Pet} from './Pet';
import {Role} from './enums/Role';

export class User {
  constructor(public id?: number,
              public username?: string,
              public email?: string,
              public password?: string,
              public role?: Role,
              public avatar?: string,
              public phoneNumber?: string,
              public name?: string,
              public surname?: string,
              public userLocation?: Location,
              public pets?: Pet[],
              public rating?: number) {
  }
}
