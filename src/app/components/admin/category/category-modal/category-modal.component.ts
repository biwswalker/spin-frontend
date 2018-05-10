import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../../../../models/category';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { CategoryService } from '../../../../providers/category.service';
import { EventMessagesService } from '../../../../providers/utils/event-messages.service';
declare var SpinModal: any;
@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {
  public modal = new SpinModal;
  public formGroup:FormGroup;
  public category:Category ;
  public headerTxt:string = 'สร้าง'
  constructor(
    private utilsService: UtilsService,
    private categoryService:CategoryService,
    private eventMessagesService:EventMessagesService) { }

  ngOnInit() {
    console.log('ngOnInit')
    this.category = new Category;
    this.category.activeFlag = 'A'
    this.validateForm()
    console.log('category: ',this.category)
  }

  validateForm(){
    this.formGroup = new FormGroup({
      activeFlag:new FormControl(this.category.activeFlag),
      categoryName:new FormControl(this.category.categoryName,Validators.required),
      remark: new FormControl(this.category.remark)
    })
  }
  oncloseModal(){
    this.modal.close('#category-modal');
    this.category = new Category;
  }

  onOpenModal(){
    this.modal.initial('#category-modal', { show: true, backdrop: 'static', keyboard: true });
  }

  onSubmit(){
    this.utilsService.findInvalidControls(this.formGroup);
    if(this.formGroup.valid){

      //Create category
      if(!this.category.categoryId){
        console.log('insert')
        this.categoryService.insert(this.category).subscribe(
          data=>{
            console.log(data)
            this.eventMessagesService.onInsertSuccess('');
          },err=>{
            console.log(err)
            if(err.status == 500){
              this.eventMessagesService.onInsertError(err);
            }
          }
        )
      }
      //Modify category data
      else{
        console.log('update')
        this.categoryService.update(this.category).subscribe(
          data=>{
            console.log(data)
            this.eventMessagesService.onUpdateSuccess('');
          },err=>{
            console.log(err)
            if(err.status == 500){
              this.eventMessagesService.onUpdateError(err);
            }
          }
        )
      }
    }
  }

}
