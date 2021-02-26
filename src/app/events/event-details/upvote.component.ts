import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'upvote',
  styleUrls: ['./upvote.component.css'],
  template: `
    <div class="votingWidgetContainer pointable" (click)="onClick()">
      <div class="well votingWidget">
        <div class="votingButton">
          <i
            class="glyphicon"
            [ngClass]="heartClass"
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
export class UpvoteComponent implements OnChanges {
  @Input() count: number;
  @Input() voted: boolean;
  @Output() vote = new EventEmitter();
  iconColor: string;
  heartClass: string;

  ngOnChanges() {
    if (this.voted) {
      this.iconColor = 'red';
      this.heartClass = 'glyphicon glyphicon-heart';
    } else {
      this.iconColor = 'white';
      this.heartClass = 'glyphicon glyphicon-heart-empty';
    }
  }

  onClick() {
    this.vote.emit();
  }
}
