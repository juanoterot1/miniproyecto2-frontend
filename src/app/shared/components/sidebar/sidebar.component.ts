import {
  Component,
  OnInit
} from '@angular/core';
import {
  NgIconComponent,
  provideIcons
} from '@ng-icons/core';
import {
  bootstrapCalendarDate,
  bootstrapWatch,
  bootstrapSun,
  bootstrapShare,
  bootstrapFeather,
  bootstrapGearWideConnected,
  bootstrapChevronDown,
  bootstrapFiletypeDoc,
  bootstrapClipboard
} from '@ng-icons/bootstrap-icons';
import {
  CommonModule
} from '@angular/common';
import {
  RouterModule
} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [NgIconComponent, CommonModule, RouterModule],
  viewProviders: [provideIcons({
      bootstrapCalendarDate,
      bootstrapWatch,
      bootstrapSun,
      bootstrapShare,
      bootstrapFeather,
      bootstrapGearWideConnected,
      bootstrapChevronDown,
      bootstrapFiletypeDoc,
      bootstrapClipboard
  })]
})
export class SidebarComponent implements OnInit {

  today!: string;
  showDaySubmenu: boolean = false;

  ngOnInit(): void {
      this.today = new Date().toISOString().split('T')[0];
  }

  toggleDaySubmenu(): void {
      this.showDaySubmenu = !this.showDaySubmenu;
  }
}
