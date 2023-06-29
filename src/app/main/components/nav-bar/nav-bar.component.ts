import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nav-bar-page',
  templateUrl: './nav-bar.component.html',
  styles: [],
})
export class NavbarComponent {
  @Input() timelineForOneDay: any;
  @Output() newSearchByCityEvent = new EventEmitter<string>();

  searchByCity(value: string) {
    this.newSearchByCityEvent.emit(value);
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


