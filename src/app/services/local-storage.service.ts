import { Injectable } from '@angular/core';
import { JsonHelper } from '../shared/helpers/json-helper';

@Injectable()
export class LocalStorageService {
  constructor() {
  }

  setItem(key: string, item: any) {
    localStorage.setItem(key, JsonHelper.serialize(item));
  }

  getItem<T>(key: string) {
    let value = localStorage.getItem(key);
    if (value && value != 'undefined' && value != 'null') {
      return JsonHelper.deserilize<T>(value);
    }
    else {
      return null;
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
