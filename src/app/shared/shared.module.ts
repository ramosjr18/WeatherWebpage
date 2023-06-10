import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [Error404PageComponent],
  exports: [],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
