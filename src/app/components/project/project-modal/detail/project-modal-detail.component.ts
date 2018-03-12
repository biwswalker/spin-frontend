import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from '../../../../models/project';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ProjectService } from '../../../../providers/project.service';

@Component({
  selector: 'project-modal-detail',
  styleUrls: ['./project-modal-detail.component.scss'],
  templateUrl: './project-modal-detail.component.html',
})
export class ProjectModalDetailComponent implements OnInit{

  public projectDetailGroup: FormGroup;
  public project: Project = new Project();
  public fileToUpload: File = null;

  resizedImage:string=null;
  resizedImageTrusted:SafeUrl=null;
  constructor(private ng2ImgToolsService: Ng2ImgToolsService,
              private sanitizer: DomSanitizer,
              private zone: NgZone,
              private projectService:ProjectService) { }

  ngOnInit() {
    this.project.isVisble = false;
    this.project.activeFlag = 'A';
    this.validateForm();
    this.fileToUpload = null;
    this.resizedImage = './assets/img/ico/startup.png';
    this.resizedImageTrusted = this.sanitizer.bypassSecurityTrustUrl(this.resizedImage);
  }

  validateForm(){
    this.projectDetailGroup = new FormGroup({
      projectAbbr: new FormControl(this.project.projectAbbr, Validators.required),
      projectName: new FormControl(this.project.projectName, Validators.required),
      customerName: new FormControl(this.project.customerName, Validators.required),
      projectDetail: new FormControl(this.project.detail),
      hardware: new FormControl(this.project.hardware),
      software: new FormControl(this.project.software),
      visibilityFlag: new FormControl(this.project.isVisble)
    })
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.resizeImage(this.fileToUpload);
  }

  // resize image to thumbnail size
  resizeImage(file:File){
    console.info("Starting resize for file:", file);
    this.ng2ImgToolsService.resize([file], 200, 200).subscribe( result =>{
        this.resizedImage=window.URL.createObjectURL(result);
        this.resizedImageTrusted=this.sanitizer.bypassSecurityTrustUrl(this.resizedImage);
        this.convertFileToBase64(result,file);
      }, error => {
            console.error("Resize error:", error);
       }
    );
  }

  // convert upload file to string base64
  convertFileToBase64(thumbnail,origin) {
    var thm:File = thumbnail;
    var ori:File = origin;
    var thmReader:FileReader = new FileReader();
    var oriReader:FileReader = new FileReader();

    thmReader.onloadend = (e) => {
      this.project.projectThumbnail = thmReader.result;
      console.log(this.project.projectThumbnail);
    }
    oriReader.onloadend = (e) => {
      this.project.projectImage = oriReader.result;
    }

    thmReader.readAsDataURL(thm);
    oriReader.readAsDataURL(ori);
  }

  prepareDataForEdit(projectId:string){
    this.project = new Project;
    this.projectService.findProjectById(projectId).subscribe(
      data=>{
        console.log('project member: ',data);
        this.project = data;
        this.project.isVisble = (this.project.visibilityFlag == 'Y'?false:true);
        this.resizedImageTrusted =  this.project.projectThumbnail;
      }
    )

  }


}
