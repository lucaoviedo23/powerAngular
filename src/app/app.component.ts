import { Component } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ onMainContentChange ],
})
export class AppComponent {
  public onSideNavChange: boolean;
  title: any;

  constructor(private sidenavService: SidenavService) {
    this.sidenavService.sideNavState$.subscribe( res => {
      this.onSideNavChange = res;
    });
  }
}
