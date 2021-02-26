import { Component, Input, OnChanges } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { ISession } from '../shared';
import { VoterService } from './voter.service';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  visibleSessions: ISession[] = [];
  @Input() sortBy: string;
  @Input() eventId: number;
  hasVoted: boolean;

  constructor(
    private authService: AuthService,
    private voterService: VoterService
  ) {}

  ngOnChanges() {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortSessions(this.sortBy);
    }
  }

  filterSessions(filter: string) {
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

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(
        this.eventId,
        session,
        this.authService.currentUser.userName
      );
    } else {
      this.voterService.addVoter(
        this.eventId,
        session,
        this.authService.currentUser.userName
      );
    }

    if (this.sortBy === 'votes') {
      this.visibleSessions.sort((session, nextSession) => {
        return nextSession.voters.length - session.voters.length;
      });
    }
  }

  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(
      session,
      this.authService.currentUser.userName
    );
  }
}
