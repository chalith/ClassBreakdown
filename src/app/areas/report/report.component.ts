import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LocalStorageKeys } from 'src/app/shared/constants';
import { Section } from 'src/app/shared/models/section';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  section: Section;

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.section = this.localStorageService.getItem<Section>(LocalStorageKeys.Section);
    setTimeout(() => {
      this.openPrint();
    }, 100);
  }

  getStudentsOfClass(classIdx: number) {
    return this.section.students.filter(s => s.classIdx === classIdx);
  }

  getStudentsWithNoClass() {
    return this.section.students.filter(s => s.classIdx == -1);
  }

  getStudentsWithClass() {
    return this.section.students.filter(s => s.classIdx >= 0);
  }

  openPrint() {
    var css = '@page { size: landscape; }',
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

    style.type = 'text/css';
    style.media = 'print';

    style.appendChild(document.createTextNode(css));

    head.appendChild(style);

    window.print();
  }

}
