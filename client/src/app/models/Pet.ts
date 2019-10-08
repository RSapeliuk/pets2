import {Size} from './enums/Size';
import {HairLength} from './enums/HairLength';

export class Pet {
  constructor(public name?: string,
              public id?: number,
              public size?: string,
              public hairLength?: string,
              public age?: number,
              public photo?: string,
              public type?: string) { }
}
