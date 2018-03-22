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
  }],


})
export class DatePickerDirective implements ControlValueAccessor{
  value: string=null;
  constructor(private el: ElementRef,
    private controlContainer:ControlContainer,
    ){

  }
  ngAfterViewInit(){
    $(this.el.nativeElement).datepicker({autoclose:true,format: 'dd/mm/yyyy'}).on('change', e => this.onModelChange(e.target.value));


  }
  onModelChange: Function = (e) => {
    console.log('value is: ',e);
    if(!e){
      this.el.nativeElement.value = null;
    }else{
      this.el.nativeElement.value = e;
    }

  };


  onModelTouched: Function = (e) => {

  };

  writeValue(val: string) : void {
    this.el.nativeElement.value = val;

  }

  registerOnChange(fn: Function): void {
      this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
      this.onModelTouched = fn;
  }
}
