import { Directive, ElementRef, ViewContainerRef,Input, HostListener,forwardRef } from "@angular/core";
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
  constructor(private el: ElementRef,
    private controlContainer:ControlContainer){

  }
  ngAfterViewInit(){
    $(this.el.nativeElement).datepicker({
      dateFormat: Format.DATE_PIK, isBE: true,
    }).on('change', e => this.onModelChange(e.target.value));
  }
  onModelChange: Function = () => {

  };


  onModelTouched: Function = (e) => {
  };

  writeValue(val: string) : void {
    console.log('writeValue');
      this.value = val;
  }

  registerOnChange(fn: Function): void {
    console.log('registerOnChange');
      this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
      this.onModelTouched = fn;
  }
}
