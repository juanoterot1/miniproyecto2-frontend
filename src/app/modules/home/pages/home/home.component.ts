import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeService } from '../../../../core/services/api/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {
  todayAppointments!: string;
  todayActiveAppointments!: string;
  totalAppointments!: string;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadTodayAppointments();
    this.loadTodayActiveAppointments();
    this.loadTotalDepartments();
  }

  loadTodayAppointments(): void {
    this.homeService.getTodayAppointments().subscribe(
      (response) => {
        this.todayAppointments = response;
      },
      (error) => {
        console.error('Error al cargar turnos de hoy:', error);
      }
    );
  }

  loadTodayActiveAppointments(): void {
    this.homeService.getTodayActiveAppointments().subscribe(
      (response) => {
        this.todayActiveAppointments = response;
      },
      (error) => {
        console.error('Error al cargar turnos activos de hoy:', error);
      }
    );
  }

  loadTotalDepartments(): void {
    this.homeService.getTotalAppointments().subscribe(
      (response) => {
        this.totalAppointments = response;
      },
      (error) => {
        console.error('Error al cargar total de turno:', error);
      }
    );
  }
}
