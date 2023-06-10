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
}
