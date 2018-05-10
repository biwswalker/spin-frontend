import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../../models/category';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.scss']
})
export class CategoryInfoComponent implements OnInit {
public category:Category = new Category;
public found:string = 'N';

@Output() categoryEdit = new EventEmitter<Category>();
  constructor() { }

  ngOnInit() {
  }

  editCategory(){
    this.categoryEdit.emit({...this.category});
  }

}
