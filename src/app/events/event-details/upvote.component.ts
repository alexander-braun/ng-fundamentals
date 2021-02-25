import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'upvote',
  styleUrls: ['./upvote.component.css'],
  template: `
    <div class="votingWidgetContainer pointable" (click)="onClick()">
      <div class="well votingWidget">
        <div class="votingButton">
          <i
            class="glyphicon"
            [classList]="heartClass"
            [style.color]="iconColor"
          ></i>
        </div>
        <div class="badge badge-inverse votingCount">
          <div>{{ count }}</div>
        </div>
      </div>
    </div>
  `,
})
export class UpvoteComponent {
  @Input() count: number;
  @Input() set voted(val) {
    this.iconColor = val ? 'red' : 'white';
    this.heartClass = val
      ? 'glyphicon glyphicon-heart'
      : 'glyphicon glyphicon-heart-empty';
  }
  @Output() vote = new EventEmitter();
  iconColor: string;
  heartClass: string;

  onClick() {
    this.vote.emit({});
  }
}
