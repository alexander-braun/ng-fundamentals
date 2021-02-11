import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent, ISession } from '../shared';
import { EventService } from '../shared/event.service';

@Component({
  templateUrl: './event-details.component.html',
  styles: [
    `
      .container {
        padding-left: 20px;
        padding-right: 20px;
      }
      .event-image {
        height: 100px;
      }
      a:hover {
        cursor: pointer;
      }
    `,
  ],
})
export class EventDetailsComponent implements OnInit {
  event: IEvent;
  addMode = false;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    session.id = this.event.sessions[this.event.sessions.length - 1].id + 1;
    this.event.sessions.push(session);
    this.eventService.updateEventWithNewSession(this.event);
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }
}
