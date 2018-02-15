import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  public exampleForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.validateForm();
  }

  validateForm(){
    this.exampleForm = new FormGroup({
      first_name: new FormControl(Validators.compose([Validators.required])),
      last_name: new FormControl(Validators.compose([Validators.required])),
      user_name: new FormControl(Validators.compose([Validators.required])),
      city: new FormControl(Validators.compose([Validators.required])),
      state: new FormControl(Validators.compose([Validators.required])),
      zip: new FormControl(Validators.compose([Validators.required])),
    });
  }
}
