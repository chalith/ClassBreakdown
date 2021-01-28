import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent implements OnInit {
  @Input() step: number = 1;
  @Input() min: number = Number.MIN_SAFE_INTEGER;
  @Input() max: number = Number.MAX_SAFE_INTEGER;
  @Input() precision: number = 0;
  @Input() placeholder: string = '';
  @Input()
  get value() {
    return this._value;
  }
  set value(value: number) {
    setTimeout(() => {
      if (isNaN(value) || value === null) {
        this._value = this.prevValue;
      }
      else if (value > this.max || value < this.min) {
        this._value = this.prevValue;
      }
      else {
        this._value = parseFloat(value.toFixed(this.precision));
        this.prevValue = this._value;
      }
      this.valueChange.emit(this._value);
      if (!this.firstLoad) {
        this.onChange.emit(this._value);
        this.firstLoad = false;
      }
    });
  }
  @Input() required: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() disabled: boolean = false;

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onChange: EventEmitter<number> = new EventEmitter<number>();

  _value: number;
  private prevValue: number;
  private firstLoad: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  onValueChange(event) {
    this.value = event;
  }
}
