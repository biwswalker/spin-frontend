import { Injectable } from "@angular/core";
import { HttpRequestService } from "./utils/http-request.service";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class CategoryService{

 
    private isCategoryHaveChanged = new BehaviorSubject<number>(0);
    public categoryHaveChanged = this.isCategoryHaveChanged.asObservable();
    constructor(private request: HttpRequestService){

    }

    findByCriteria(page,size,keyword){
        return this.request.requestMethodGET(`category-management/categories/find-by-criteria?page=${page}&size=${size}&term=${keyword}`);
    }
    findById(id:string){
        return this.request.requestMethodGET(`category-management/categories/${id}`);
    }
    insert(category){
        return this.request.requestMethodPUT('category-management/categories/',category);
    }
    update(category){
        return this.request.requestMethodPOST('category-management/categories/',category);
    }

    onCategoryHaveChanged() {
        this.isCategoryHaveChanged.next(1);
      }
}