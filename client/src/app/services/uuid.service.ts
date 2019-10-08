import { Injectable } from '@angular/core';
import * as uuid from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class UuidService {

  constructor() { }
  randomName(name, file: File, obj: string): string {
    name = uuid();
    if (file != null) {
      const strings = file.name.split('.');
      const format = strings.pop();
      obj = name + '.' + format;
      return obj;
    }
  }
}
