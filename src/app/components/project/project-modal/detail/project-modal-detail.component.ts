import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from '../../../../models/project';

@Component({
  selector: 'project-modal-detail',
  styleUrls: ['./project-modal-detail.component.scss'],
  template: `
  <form [formGroup]="projectDetailGroup">
  <!-- Visibility -->
  <div class="row">
    <div class="col-8">
      <p>อนุญาติให้คนอื่นเห็นโครงการได้</p>
    </div>
    <div class="col-4">
      <div class="toggleWrapper">
        <input type="checkbox"
               id="visibility-flag"
               name="visibility-flag"
               formControlName="visibilityFlag" />
        <label for="visibility-flag"
               class="toggle">
          <span class="toggle__handler"></span>
        </label>
      </div>
    </div>
  </div>

  <div class="row">
    <!-- Image -->
    <div class="col-4">
      <img src="./assets/img/ico/startup.png"
           class="img-thumbnail rounded">
    </div>

    <!-- Project ABBR $$ Project Name-->
    <div class="col-8">
      <div class="row">
        <div class="col-12 form-group">
          <label for="project-abbr">ชื่อย่อโครงการ *</label>
          <input type="text"
                 class="form-control"
                 id="project-abbr"
                 name="project-abbr"
                 formControlName="projectAbbr">
        </div>
      </div>
      <div class="row">
        <div class="col-12 form-group">
          <label for="project-name">ชื่อโครงการ *</label>
          <input type="text"
                 class="form-control"
                 id="project-name"
                 name="project-name"
                 formControlName="projectName">
        </div>
      </div>
    </div>

  </div>

  <!-- Customer Name -->
  <div class="row">
    <div class="col-12 form-group">
      <label for="customer-name">ชื่อ ลูกค้า/หน่วยงาน *</label>
      <input type="text"
             class="form-control"
             id="customer-name"
             name="customer-name"
             formControlName="customerName">
    </div>
  </div>

  <div class="row">
    <div class="col-12">

      <!-- Tab menu -->
      <ul class="nav nav-pills nav-justified"
          id="tap-info"
          role="tablist">
        <li class="nav-item">
          <a class="nav-link active"
             href="#tab-detail"
             role="tab"
             id="detail-a"
             data-toggle="tab">ข้อมูลโครงการ</a>
        </li>
        <li class="nav-item">
          <a class="nav-link"
             href="#tab-hardware"
             role="tab"
             id="hardware-a"
             data-toggle="tab">Hardware</a>
        </li>
        <li class="nav-item">
          <a class="nav-link"
             href="#tab-software"
             role="tab"
             id="software-a"
             data-toggle="tab">Software</a>
        </li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content">
        <!-- Project Detail -->
        <div role="tabpanel"
             class="tab-pane in active"
             id="tab-detail">
          <div class="form-group">
            <textarea class="form-control"
                      rows="5"
                      id="project-detail"
                      name="project-detail"
                      formControlName="projectDetail"></textarea>
          </div>
        </div>

        <!-- Hardware -->
        <div role="tabpanel"
             class="tab-pane"
             id="tab-hardware">
          <div class="form-group">
            <textarea class="form-control"
                      rows="5"
                      id="hardware"
                      name="hardware"
                      formControlName="hardware"></textarea>
          </div>
        </div>

        <!-- Software -->
        <div role="tabpanel"
             class="tab-pane"
             id="tab-software">
          <div class="form-group">
            <textarea class="form-control"
                      rows="5"
                      id="software"
                      name="software"
                      formControlName="software"></textarea>
          </div>
        </div>
      </div>

    </div>
  </div>
</form>
  `
})
export class ProjectModalDetailComponent implements OnInit {

  public projectDetailGroup: FormGroup;
  public project: Project = new Project();

  constructor() { }

  ngOnInit() {
    this.projectDetailGroup = new FormGroup({
      projectAbbr: new FormControl(this.project.projectAbbr, Validators.required),
      projectName: new FormControl(this.project.projectName, Validators.required),
      customerName: new FormControl(this.project.customerName, Validators.required),
      projectDetail: new FormControl(this.project.detail),
      hardware: new FormControl(this.project.hardware),
      software: new FormControl(this.project.software),
      visibilityFlag: new FormControl((this.project.visibilityFlag == 'Y' ? true : false))
    })
  }

}
