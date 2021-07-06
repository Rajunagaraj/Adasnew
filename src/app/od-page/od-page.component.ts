import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { Router } from '@angular/router';
@Component({
  selector: "app-od-page",
  templateUrl: "./od-page.component.html",
  styleUrls: ["./od-page.component.scss"],
})
export class ODPageComponent implements OnInit {
  model: any = {};
  constructor(private api: ApiService,private route:Router) {}
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
  File_Name_Number: any;
  ngOnInit() {
    this.gettask_list();
  }
  Taskfile_list: any;
  File_Names: any = "";
  Status: any = "";
  Prioritys: any = "";
  createddate: any;
  filterdOptions: any;
  gettask_list() {
    this.api.Gettask_list().subscribe((data): any => {
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
  annotation_go(){
    this.route.navigate(['/Annotation_page']);
  }
}
