import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession } from '../shared';
import { restrictedWordsValidator } from '../shared/index';

@Component({
  templateUrl: './create-session.component.html',
  selector: 'create-session',
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input,
      .error select,
      .error textarea {
        background-color: #e3c3c5;
      }
      .error ::-webkit-input-placeholder {
        color: #999;
      }
      .error ::-moz-placeholder {
        color: #999;
      }
      .error :-moz-placeholder {
        color: #999;
      }
      .error :ms-input-placeholder {
        color: #999;
      }
    `,
  ],
})
export class CreateSessionComponent implements OnInit {
  @Output() sessionAdded: EventEmitter<ISession> = new EventEmitter();
  @Output() cancelAddSession: EventEmitter<any> = new EventEmitter();
  sessionForm: FormGroup;
  name: FormControl;
  presenter: FormControl;
  duration: FormControl;
  level: FormControl;
  abstract: FormControl;

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [
      Validators.required,
      Validators.maxLength(400),
      restrictedWordsValidator(['foo', 'bar']),
    ]);

    this.sessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract,
    });
  }

  saveSession(formValues) {
    const session: ISession = {
      id: undefined,
      voters: [],
      ...formValues,
      duration: +formValues.duration,
    };
    this.sessionAdded.emit(session);
  }

  cancel() {
    this.cancelAddSession.emit();
  }
}
