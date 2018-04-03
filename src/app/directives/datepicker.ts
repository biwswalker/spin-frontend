import { Directive, ElementRef, ViewContainerRef,Input, HostListener,forwardRef, NgZone} from "@angular/core";
import { Format } from "../config/properties";
import { ControlContainer, NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
declare var $: any;
@Directive({
  selector: "[summitDatePicker],[min]",
  providers: [{
    provide: NG_VALUE_ACCESSOR,useExisting:
    forwardRef(() => DatePickerDirective),
    multi: true
  }],


})
export class DatePickerDirective implements ControlValueAccessor{
  value: string=null;
  isFirstVisit = true;

  private minDate:string;
  private maxDate:string;
  constructor(private el: ElementRef,
    private ngZone: NgZone
    ){
    // this.minDateObserve =  setInterval(()=>{
    //   this.minDate = this.el.nativeElement.dataset.dateStartDate;
    //   console.log('min date: ',this.minDate);
    // },1000)
  }
  ngAfterViewInit(){
    // console.log('ngAfterViewInit');
    this.isFirstVisit = false;
    $(this.el.nativeElement).datepicker({autoclose:true,format:'dd/mm/yyyy'}).on('change', e =>{
      this.onModelChange(e.target.value);
    }
   );
   $(this.el.nativeElement).datepicker().on('focus', e =>{
    this.observeDate(e.target);
    }
    );

    // this.observeDate();
  }


  onModelChange: Function = (e) => {
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

  observeDate(e){
      // setTimeout(()=>{
        console.log('el:',this.el);
      this.minDate = this.el.nativeElement.dataset.dateStartDate;
      this.maxDate = this.el.nativeElement.dataset.dateEndDate;


      $(this.el.nativeElement).datepicker('setStartDate',-Infinity)
      $(this.el.nativeElement).datepicker('setEndDate',Infinity)
      if(this.minDate){
        $(this.el.nativeElement).datepicker('setStartDate',this.setMinDate(this.minDate));
      }
      if(this.maxDate){
        $(this.el.nativeElement).datepicker('setEndDate',this.setMaxDate(this.maxDate));
      }



      // },500)
  }

  setMinDate(date:string){
    let yyyy = date.substring(6,10);
    let mm = date.substring(4,5);
    let dd = date.substring(0,2);
    const newDate = `${(+dd+1)}/${mm}/${yyyy}`;
    return newDate;
  }

  setMaxDate(date:string){
    let yyyy = date.substring(6,10);
    let mm = date.substring(4,5);
    let dd = date.substring(0,2);
    let newDate = `${(dd)}/${mm}/${yyyy}`;
    return newDate;
  }
}
