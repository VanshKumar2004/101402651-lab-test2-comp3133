import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaceXService } from '../services/spacex.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.scss']
})
export class MissiondetailsComponent implements OnInit {
  mission: Mission | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private spaceXService: SpaceXService
  ) { }

  ngOnInit(): void {
    const flightNumber = this.route.snapshot.paramMap.get('id');
    if (flightNumber) {
      this.spaceXService.getLaunchByFlightNumber(flightNumber).subscribe({
        next: (data) => {
          this.mission = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching mission details:', err);
          this.isLoading = false;
        }
      });
    }
  }
}