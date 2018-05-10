import { Component, OnInit, ViewChild } from '@angular/core';
import { CategorySearchComponent } from './category-search/category-search.component';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { CategoryInfoComponent } from './category-info/category-info.component';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @ViewChild(CategorySearchComponent) searchComponent;
  @ViewChild(CategoryModalComponent) modalComponent;
  @ViewChild(CategoryInfoComponent) infoComponent;
  constructor() { }

  ngOnInit() {
  }

  onNewCategory(){
    this.modalComponent.ngOnInit();
    this.modalComponent.onOpenModal();
  }

  onEditCategory(category){
    console.log('edit: ',category)
    this.modalComponent.ngOnInit();
    this.modalComponent.category = {...category};
    this.modalComponent.headerTxt = 'แก้ไข';
    this.modalComponent.onOpenModal();
    console.log('modal is opened.')
    
  }

  whenSelectCategory(category){
    console.log('cate selected: ',category)
    this.infoComponent.category = Object.assign(new Category,...category);
    this.infoComponent.found = 'Y';
  }

}
