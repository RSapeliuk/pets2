import {Post} from './Post';
import {City} from './City';

export class District {
  constructor(public id?: number,
              public city?: City,
              public name?: string,
              public post?: Post[]) {
  }

}
