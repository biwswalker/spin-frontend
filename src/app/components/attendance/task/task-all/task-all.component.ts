import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../providers/task.service';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'task-all',
  templateUrl: './task-all.component.html',
  styleUrls: ['./task-all.component.scss']
})
export class TaskAllComponent implements OnInit {

  public keyword = ''
  private subjectKeyword = new BehaviorSubject<string>(this.keyword);
  private crrKeyword = this.subjectKeyword.asObservable();
  private nowPage = 1;
  private timeout = null;

  constructor(private taskService: TaskService, private utilsService: UtilsService) { }

  ngOnInit() {
    this.taskService.findWorkingTaskByWeek(this.utilsService.getCurrentThDate(), this.utilsService.convertEnDateToTh(this.utilsService.getPreviousWeekDate(this.utilsService.getCurrentEnDate()))).subscribe((weekTasks) => {
      console.log('Weeks')
      console.log(weekTasks)
    });

    this.crrKeyword.subscribe(keyword => {
      this.timeout = null;
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.timeout = null;
        console.log(keyword)
      }, 1000);
    })
  }

  onSearch() {
    this.subjectKeyword.next(this.keyword)
  }

  onScrollDown() {
    console.log('scrolled!!');
    // this.taskService.findAllTask((this.onlyMember ? 'Y' : 'N'), this.nowPage, 5).subscribe(
    //   tasks => {
    //     if (tasks) {
    //       console.log(tasks);
    //       this.nowPage += 1;
    //     }

    //   }, err => {
    //     console.log(err);
    //   }
    // )

  }

}
