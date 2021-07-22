import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  DataService,
  Project_list,
} from "src/app/services/dataservice.service";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
})
export class ProjectListComponent implements OnInit {
  Priority_level = [
    { Priority: "Highest" },
    { Priority: "Medium" },
    { Priority: "Lowest" },
  ];
  Status_level = [
    { status: "Ready" },
    { status: "InProgress" },
    { status: "Completed" },
  ];
  Action_level = [
    { action: "START" },
    { action: "Done" },
    { action: "Continue" },
  ];
  projec_forms: FormGroup;
  Project_list: Project_list[] = [];
  Loading = false;
  marking = [];
  toolversion = [];
  Project_file_upload:FormGroup;
  successMessage: string;
  title = "Assign Project for Annotation"
  projectWasSaved = false;
  constructor(
    private route: Router,
    private api: ApiService,
    private fd: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.projec_forms = this.fd.group({
      Project_list_name: [null, Validators.required],
      Marking_feature: [null, Validators.required],
      Tool_version_name: [null, Validators.required],
    });
    this.Project_list_call();

    this.Project_file_upload = new FormGroup({
      Project_list: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
      task_level: new FormControl('', [Validators.required]),
      Status: new FormControl('', [Validators.required]),
      Priority:new FormControl('', [Validators.required]),
      Action:new FormControl('', [Validators.required]),
      createddate:new FormControl('', [Validators.required])
    });
  }
  get f(){
    return this.Project_file_upload.controls;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file,"formData");
      this.Project_file_upload.patchValue({
        fileSource: file
      });
    }
  }
  submit(){
    const formData = new FormData();
    formData.append('file', this.Project_file_upload.get('fileSource').value);
    formData.append('project_name', this.Project_file_upload.get('Project_list').value);
    formData.append('project_name', this.Project_file_upload.get('task_level').value);
    formData.append('project_name', this.Project_file_upload.get('Status').value);
    formData.append('project_name', this.Project_file_upload.get('createddate').value.split("-").reverse().join("-"));
    console.log(this.Project_file_upload.value);
    this.Project_file_upload.reset();
    this.Project_file_upload.patchValue({
      Project_list: '',
      file:'',
      task_level:'',
      Status:'',
      Priority:'',
      Action:'',
      createddate:''

   });
    // this.http.post('http://localhost:8001/upload', formData)
    //   .subscribe(res => {
    //     console.log(res);
    //     alert('Uploaded Successfully.');
    //   })
  }
  private Project_list_call() {
    this.Loading = true;
    this.dataService.getPeople().subscribe((x) => {
      this.Project_list = x;
      this.Loading = false;
    });
  }
  customSearchFn(term: string, item: Project_list) {
    term = term.toLowerCase();
    return item.p_name.toLowerCase().indexOf(term) > -1;
  }
  projectDetails_submit(item: any): void {
    this.route.navigate(["/Task_list"], {
      queryParams: { project_name: this.projec_forms.value.Project_list_name },
    });
  }
  Getmarking_Change(project_name_list: any) {
    this.marking = [];
    this.toolversion=[];
    this.projec_forms.patchValue({
      Marking_feature: null,
      Tool_version_name:null
     
   });
   
    this.api.getmarking(project_name_list).subscribe((x) => {
      let items = x[0].project_Feature;
      var Arr = items.split(',');
      Arr.forEach(item => {
        let test = item.replace(/"|'/g, '');
        this.marking.push(test)
 
      });
      this.Loading = false;
      let toolv = x[0].Tool_version;
      let arr1 = toolv.split(',');
      arr1.forEach(item => {
        let test = item.replace(/"|'/g, '');
        this.toolversion.push(test)
 
      });
    });
 
    this.Loading = false;
 
  }
}
