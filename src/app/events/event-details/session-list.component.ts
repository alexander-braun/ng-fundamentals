import { Component, Input, OnChanges } from '@angular/core';
import { ISession } from '../shared';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  visibleSessions: ISession[] = [];
  @Input() sortBy: string;

  ngOnChanges() {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortSessions(this.sortBy);
    }
  }

  filterSessions(filter) {
    if (filter === 'all') {
      this.visibleSessions = [...this.sessions];
    } else {
      this.visibleSessions = this.sessions.filter(
        (session) => session.level.toLowerCase() === filter
      );
    }
  }

  sortSessions(sortValue) {
    this.visibleSessions.sort((session, nextSession) => {
      if (sortValue === 'votes') {
        return nextSession.voters.length - session.voters.length;
      } else if (sortValue === 'name') {
        const s1 = session.name;
        const s2 = nextSession.name;
        return s1 > s2 ? 1 : s1 === s2 ? 0 : -1;
      }
    });
  }
}
