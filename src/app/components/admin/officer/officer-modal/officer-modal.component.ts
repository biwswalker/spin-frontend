import { OfficerService } from './../../../../providers/officer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Officer } from '../../../../models/officer';

@Component({
  selector: 'app-officer-modal',
  templateUrl: './officer-modal.component.html',
  styleUrls: ['./officer-modal.component.scss']
})
export class OfficerModalComponent implements OnInit {

  public officerGroup: FormGroup;
  public officer: Officer;
  public mode: string;
  public isActive: boolean = true;

  public headerTxt: string = '';
  constructor(private officerService: OfficerService) { }

  ngOnInit() {
  }

  oncloseModal() {
    this.officerService.onCloseModal();
  }

  onSubmit() {

  }

  onChangeActiveFlag() {
    this.isActive = !this.isActive;
  }

}
