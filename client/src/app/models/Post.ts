import {Kind} from './enums/Kind';

export class Post {
  constructor(public title?: string,
              public kind?: Kind,
              public photo?: string,
              public date?: Date,
              public expirationDate?: Date,
              public optionalField?: string,
              public id?: number
              ) {

  }
}