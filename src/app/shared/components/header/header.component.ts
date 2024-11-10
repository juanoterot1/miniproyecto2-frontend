import { Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

}
