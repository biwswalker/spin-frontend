import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-by-tag',
  templateUrl: './by-tag.component.html',
  styleUrls: ['./by-tag.component.scss', '../person-report.component.scss']
})
export class ByTagComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  initialData(data){
    console.log(data)
  }
}

