import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ListItem } from '../../models/component-support/list-item';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent implements OnInit {
  @Input() options: ListItem[];
  @Input() placeholder: string = 'Please Select';
  @Input()
  get value() {
    return this._value;
  }
  set value(value: any) {
    if (value && value != 'null') {
      this._value = value;
    }
    else {
      this._value = null;
    }
    this.valueChange.emit(this._value);
  }
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  _value: any = null;

  constructor() { }

  ngOnInit() {
  }

  onValueChange(event) {
    this.value = event;
    this.onChange.emit(this.value);
  }
}
