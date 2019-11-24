import {Kind} from './enums/Kind';
import {Pet} from './Pet';
import {User} from './User';
import {Location} from './Location';

export class Post {
  constructor(public title?: string,
              public kind?: Kind,
              public photo?: string,
              public date?: Date,
              public expirationDate?: Date,
              public optionalField?: string,
              public id?: number,
              public pet?: Pet,
              public user?: User,
              public price?: number,
              public postLocation?: Location,
              public enabled?: boolean
              ) {

  }
}
