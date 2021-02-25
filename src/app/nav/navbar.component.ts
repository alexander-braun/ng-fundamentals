import { Component, OnInit } from '@angular/core';
import { EventService, ISession } from '../events';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      .nav.navbar-nav {
        font-size: 15px;
      }
      #searchForm {
        margin-right: 100px;
      }
      @media (max-width: 1200px) {
        #searchForm {
          display: none;
        }
      }
      li > a.active {
        font-weight: 600;
      }
    `,
  ],
})
export class NavBarComponent implements OnInit {
  isAuthenticated: boolean = false;
  searchTerm: string;
  foundSessions: ISession[] = [];

  constructor(
    public authService: AuthService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  searchSessions(term: string) {
    this.eventService.searchSessions(term).subscribe((sessions) => {
      this.foundSessions = sessions;
    });
  }
}
