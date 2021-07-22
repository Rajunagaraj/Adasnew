import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router'; 
import { ApiService } from "../services/api.service";
import { Router } from '@angular/router';
import { DataService } from "../services/dataservice.service";
@Component({
  selector: "app-od-page",
  templateUrl: "./od-page.component.html",
  styleUrls: ["./od-page.component.scss"],
})
export class ODPageComponent implements OnInit {
  File_Name_Number: any;
  Project_name:any
  Taskfile_list: any;
  File_Names: any = "";
  Status: any = "";
  Prioritys: any = "";
  createddate: any;
  filterdOptions: any;
  constructor(private api: ApiService,private route:Router,private routed: ActivatedRoute,private sharedservice:DataService) {
   
  }
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

  ngOnInit() { 
    this.Project_name = localStorage.getItem("projectName");
  this.routed.queryParamMap.subscribe(params => { 
    this.Project_name = params.get('project_name')}); 
    localStorage.setItem('projectName', this.Project_name)
    this.gettask_list(this.Project_name);
  }

  gettask_list(project_name) {
    this.api.Gettask_list(project_name).subscribe((data): any => {
      this.Taskfile_list = data;
      this.filterdOptions = this.Taskfile_list;
      this.Task_filter_dropdwon(data);
    });
  }
  Task_filter_dropdwon(item: any) {
    this.File_Name_Number = item.map((itm) => itm["File_Name"]);
  }
  File_number() {
    this.filterdOptions = this.Taskfile_list.filter((item) =>
      item.File_Name.toLowerCase().includes(this.File_Names.toLowerCase())
    );
  }
  priority_number() {
    this.filterdOptions = this.Taskfile_list.filter((item) =>
      item.Priority.toLowerCase().includes(this.Prioritys.toLowerCase())
    );
  }
  status_changes() {
    this.filterdOptions = this.Taskfile_list.filter((item) =>
      item.status.toLowerCase().includes(this.Status.toLowerCase())
    );
  }
  created_date() {
    const temps = this.createddate.split("-").reverse().join("-");
    this.filterdOptions = this.Taskfile_list.filter((item) =>
      item.Created_Date.includes(temps)
    );
  }
  Reset() {
    this.filterdOptions = this.Taskfile_list;
    this.File_Names = "";
    this.Status = "";
    this.Prioritys = "";
    this.createddate = "";
  }
  annotation_go(filename,project_names){
    this.route.navigate(["/Annotation_page"], {
      queryParams: { project_name:project_names,File_Name:filename },
    });
   
  }
}
