import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../../../providers/category.service';
import { Category } from '../../../../models/category';
import { EventMessagesService } from '../../../../providers/utils/event-messages.service';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss']
})
export class CategorySearchComponent implements OnInit {


  public categoryList: Category[] = [];
  public page = 1;
  public size = 20;
  public dataTotal = 0;
  public throttle = 1000;
  public scrollDistance = 1;
  public onlyMember = false;
  public keyword = '';
   // Send value back to parent
  @Output() categorySelected = new EventEmitter<string>();
  
  constructor(private categoryService:CategoryService,
  private eventMessageService:EventMessagesService) {
  }

  ngOnInit() {
    this.categoryService.categoryHaveChanged.subscribe(
      ()=>{
        this.doSearch();
      })
  }
  doSearch(){
    this.categoryList = [];
    this.page = 1;
    this.onScrollDown();
  }

  onScrollDown() {
    this.categoryService.findByCriteria(this.page,this.size,this.keyword).subscribe(
      data=>{
        console.log(data);
        this.dataTotal = data.totalElements;
        if(data.content){
          this.categoryList = [...this.categoryList,...data.content]
          if(this.categoryList.length != 0 && this.page == 1){
            this.onCategorySelected(this.categoryList[0]);
          }
          this.page += 1;
        }

      },err=>{
        console.log(err);
        this.eventMessageService.onCustomError('เกิดข้อผิดพลาด',err.error.message);
      }
    )

  }

  onCategorySelected(category){
    this.categorySelected.emit({...category});
  }
}

