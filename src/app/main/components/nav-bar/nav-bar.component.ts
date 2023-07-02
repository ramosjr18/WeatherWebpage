import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar-page',
  templateUrl: './nav-bar.component.html',
  styles: [],
})
export class NavbarComponent {
  @Input() timelineForOneDay: any;
  @Output() newSearchByCityEvent = new EventEmitter<string>();
  
  constructor(private router: Router) {}

  searchByCity(value: string) {
    // Emit the event
    this.newSearchByCityEvent.emit(value);

  // Redirect to the search page with the specified city value
  this.router.navigate(['/main'], { queryParams: { city: value } });
  
  }

  hamburguer() {
    const hamburger = document.querySelector('.hamburger') as HTMLElement;
    const menu = document.querySelector('.menu') as HTMLElement;
  
    // Toggle the menu when the hamburger button is clicked
    hamburger.addEventListener('click', function() {
      menu.classList.toggle('show');
    });
  }
  
}


