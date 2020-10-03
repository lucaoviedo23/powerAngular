  import { Component, OnInit } from '@angular/core';
  import { SidenavService } from '../../services/sidenav.service';
  import { onSideNavChange, animateText } from '../../animations/animations';


  interface Page {
    link: string;
    name: string;
    icon: string;
    subpages: Page[];
  }

  @Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [onSideNavChange, animateText]

})
export class SidenavComponent implements OnInit {
  public sideNavState = false;
  public linkText = false;
  public pages: Page[] = [
    {
      name: 'Resumen',
      link: 'resumen',
      icon: 'inbox',
      subpages: [
        {name: 'Dashboard', link: 'dashboard', icon: 'none', subpages: null },
        {name: 'Mapa', link: 'mapa', icon: 'none', subpages: null },
        {name: 'Planta', link: 'planta', icon: 'none', subpages: null }
    ]},
    {name: 'Facturacion', link: 'facturacion', icon: 'star', subpages: null},
    {name: 'Auditor', link: 'auditor', icon: 'send', subpages: null},
    {
      name: 'Analisis',
      link: 'analisis',
      icon: 'send' ,
      subpages: [
        {name: 'Instantaneas', link: 'instantaneas', icon: 'none', subpages: null },
        {name: 'Historicos', link: 'historicos', icon: 'none', subpages: null },
        {name: 'Calidad', link: 'calidad', icon: 'none', subpages: null },
        {name: 'Stand-by', link: 'standBy', icon: 'none', subpages: null },
        {name: 'Eventos', link: 'eventos', icon: 'none', subpages: null }
    ]},
    {name: 'Control', link: 'Control', icon: 'send', subpages: null}
  ];

  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  public onSinenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.sidenavService.sideNavState$.next(this.sideNavState);
  }

}
