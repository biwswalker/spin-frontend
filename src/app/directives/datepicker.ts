import { Directive, ElementRef, ViewContainerRef,Input, HostListener,forwardRef} from "@angular/core";
import { Format } from "../config/properties";
import { ControlContainer, NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
declare var $: any;
@Directive({
  selector: "[summitDatePicker]",
  providers: [{
    provide: NG_VALUE_ACCESSOR,useExisting:
    forwardRef(() => DatePickerDirective),
    multi: true
  }]

})
export class DatePickerDirective implements ControlValueAccessor{
  value: string=null;
  @Input('ngModel') model;
  constructor(private el: ElementRef,
    private controlContainer:ControlContainer){
  //     $(this.el.nativeElement).change(function() {
  //      console.log('data change');
  //  });
  }
  ngAfterViewInit(){
    $(this.el.nativeElement).datepicker().on('change', e => this.onModelChange(e.target.value));

  }
  onModelChange: Function = (e) => {
    console.log(this.controlContainer);
  };


  onModelTouched: Function = (e) => {
  };

  writeValue(val: string) : void {
    console.log('this.el.nativeElement:',this.el.nativeElement);
    console.log(this.model);
    if(this.model){
      this.el.nativeElement.value = this.model;
    }else{
      this.el.nativeElement.value = null;
    }

  }
  resetValue() : void {
   console.log('resetValue');

}

  registerOnChange(fn: Function): void {


      this.onModelChange = fn;

  }

  registerOnTouched(fn: Function): void {
      this.onModelTouched = fn;
  }
}
