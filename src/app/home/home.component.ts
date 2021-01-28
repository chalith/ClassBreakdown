import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { LocalStorageKeys } from '../shared/constants';
import { JsonHelper } from '../shared/helpers/json-helper';
import { Class, SortClass } from '../shared/models/class';
import { ListItem } from '../shared/models/component-support/list-item';
import { Availability, ClassSubjectCounts, Section } from '../shared/models/section';
import { Student } from '../shared/models/student';
import { Subject } from '../shared/models/subject';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  section: Section;
  data: ClassSubjectCounts;
  students: Student[];

  selectedSubject: number = null;
  subjectList: ListItem[] = [];

  curClassName: string;
  curSubjectName: string;
  curStudentName: string;
  curStudentSubjects: Subject[] = [];

  constructor(private localStorageService: LocalStorageService) {
    window.onbeforeunload = () => {
      this.save();
    }
  }

  ngOnInit() {
    this.loadIfExist();
  }

  loadIfExist() {
    let section = this.localStorageService.getItem<Section>(LocalStorageKeys.Section);
    if (section) {
      this.section = section as Section;
      this.subjectList = section.subjects.map(s => <ListItem>{
        value: s.index.toString(),
        label: s.name
      });
    }
    else {
      this.initSection();
      this.subjectList = [];
    }
    let data = this.localStorageService.getItem<ClassSubjectCounts>(LocalStorageKeys.Counts) as ClassSubjectCounts;
    if (data) {
      this.initData();
      for (let subject of data.counts) {

        this.data.counts.push(subject.map(c => {
          let availbility = new Availability();
          availbility.total = c._total;
          availbility.available = c.available;
          availbility.min = c.min;
          return availbility;
        }));
      }
    }
    else {
      this.initData();
    }
  }

  initSection() {
    this.section = new Section();
  }

  initData() {
    this.data = new ClassSubjectCounts();
  }

  addClass() {
    if (!this.curClassName.trim().length) {
      alert('Please enter a class');
      return;
    }
    else if (this.section.classes.findIndex(c => c.name.trim() === this.curClassName.trim()) >= 0) {
      alert('This class is already added');
      return;
    }

    let curClass = <Class>{
      index: this.section.classes.length,
      name: this.curClassName.trim()
    };

    this.section.classes.push(curClass);
    for (let sub of this.data.counts) {
      sub.push(new Availability());
    }

    this.curClassName = null;
  }

  addSubject() {
    if (!this.curSubjectName.trim().length) {
      alert('Please enter a subject');
      return;
    }
    else if (this.section.subjects.findIndex(s => s.name.trim() === this.curSubjectName.trim()) >= 0) {
      alert('This subject is already added');
      return;
    }

    let curSubject = <Subject>{
      index: this.section.subjects.length,
      name: this.curSubjectName.trim()
    };

    this.section.subjects.push(curSubject);
    this.subjectList.push(<ListItem>{
      label: curSubject.name,
      value: curSubject.index.toString()
    });
    this.data.counts.push(this.section.classes.map(c => new Availability()));

    this.curSubjectName = null;
  }

  addStudent() {
    if (!this.curStudentName.trim().length) {
      alert('Please enter a student name');
      return;
    }

    let curStudent = <Student>{
      index: this.section.students.length,
      name: this.curStudentName.trim(),
      subjects: JsonHelper.copyObject(this.curStudentSubjects),
      classIdx: -1
    };

    this.pickClass(curStudent);

    this.section.students.push(curStudent);
    this.section.students = this.section.students.sort((a, b) => a.classIdx - b.classIdx);

    this.curStudentName = null;
    this.curStudentSubjects = [];
    this.selectedSubject = null;
  }

  addStudentSubject() {
    if (this.curStudentSubjects.findIndex(s => s.index === +this.selectedSubject) >= 0) {
      alert('This subject is already added');
      return;
    }

    this.curStudentSubjects.push(this.section.subjects.find(s => s.index === +this.selectedSubject));

    this.selectedSubject = null;
  }

  isEmpty(value: string) {
    return !value || !value.trim().length;
  }

  pickClass(student: Student) {
    let classes: SortClass[] = [];
    for (let c of this.section.classes) {
      let available = true;
      for (let s of student.subjects) {
        available = this.data.counts[s.index][c.index].available > 0;
        if (!available)
          break;
      }
      if (available) {
        classes.push(<SortClass> {
          classIdx: c.index,
          notSelectedAvailability: 0,
          selectedAvailability: 0,
          sortParam: 0
        });
      }
      else {
        student.classIdx = -1;
      }
    }
    if (classes.length) {
      for (let c of classes) {
        for (let s of this.section.subjects) {
          if (student.subjects.findIndex(s1 => s1.index === s.index) >= 0) {
            c.selectedAvailability += this.data.counts[s.index][c.classIdx].available;
          }
          else {
            c.notSelectedAvailability += this.data.counts[s.index][c.classIdx].available;
          }
        }
        if (c.notSelectedAvailability === 0) {
          this.setClass(c.classIdx, student);
          return;
        }
        c.sortParam = c.selectedAvailability / c.notSelectedAvailability;
      }
      this.setClass(classes.sort((a, b) => b.sortParam - a.sortParam)[0].classIdx, student);
      return;
    }
    else {
      student.classIdx = -1;
      return;
    }
  }

  setClass(classIdx: number, student: Student) {
    student.classIdx = classIdx;
    for (let s of student.subjects) {
      this.data.counts[s.index][classIdx].available--;
      this.data.counts[s.index][classIdx].min = this.data.counts[s.index][classIdx].total;
    }
  }

  save() {
    this.localStorageService.setItem(LocalStorageKeys.Section, this.section);
    this.localStorageService.setItem(LocalStorageKeys.Counts, this.data);
  }

  clear() {
    this.localStorageService.removeItem(LocalStorageKeys.Section);
    this.localStorageService.removeItem(LocalStorageKeys.Counts);
    this.loadIfExist();

    alert('Data cleared');
  }

}
