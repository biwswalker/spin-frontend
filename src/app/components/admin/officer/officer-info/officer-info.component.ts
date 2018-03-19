import { OfficerService } from './../../../../providers/officer.service';
import { Component, OnInit } from '@angular/core';
import { Officer } from '../../../../models/officer';
import { Department } from '../../../../models/department';
import { Position } from '../../../../models/position';

@Component({
  selector: 'app-officer-info',
  templateUrl: './officer-info.component.html',
  styleUrls: ['./officer-info.component.scss']
})
export class OfficerInfoComponent implements OnInit {

  public officer: Officer
  constructor(private officerService: OfficerService) { }

  ngOnInit() {
    this.officer = new Officer();
  }

  editOfficer(event) {
    this.officerService.emitOfficer(this.officer.officeId);
    this.officerService.onOpenModal();
  }

}
