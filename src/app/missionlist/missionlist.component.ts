import { Component, OnInit } from '@angular/core';
import { SpaceXService } from '../services/spacex.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.scss']
})
export class MissionlistComponent implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];

  constructor(private spaceXService: SpaceXService) {}

  ngOnInit(): void {
    this.spaceXService.getLaunches().subscribe(data => {
      this.missions = data;
      this.filteredMissions = data;
    });
  }

  applyFilter(year: string): void {
    if (!year) {
      this.filteredMissions = [...this.missions];
      return;
    }
    this.spaceXService.getLaunchesByYear(year).subscribe(data => {
      this.filteredMissions = data;
    });
  }
}