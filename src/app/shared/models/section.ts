import { Class } from "./class";
import { Student } from "./student";
import { Subject } from "./subject";

export class Section {
  constructor() {
    this.subjects = [];
    this.classes = [];
    this.students = [];
  }

  subjects: Subject[];
  classes: Class[];
  students: Student[];
}

export class ClassSubjectCounts {
  constructor() {
    this.counts = [];
  }

  counts: Availability[][];
}

export class Availability {
  constructor() {
    this._total = 0;
    this.available = 0;
  }

  get total(): number {
    return this._total;
  }
  set total(val: number) {
    let prev = this._total;
    this._total = val;
    this.available += this._total - prev;
  }

  _total: number = 0;
  available: number = 0;
}
