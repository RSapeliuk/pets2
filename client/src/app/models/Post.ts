import {User} from './User';

export class Post {
  constructor(public title?: string,
              public kind?: string,
              public photo?,
              public date?: Date,
              public expirationDate?: Date,
              public optional_field?: string,
              ) {

  }
}
