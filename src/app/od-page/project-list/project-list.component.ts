import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DataService, Project_list } from "src/app/services/dataservice.service";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
})
export class ProjectListComponent implements OnInit {
  projec_forms: FormGroup;
  Project_list: Project_list[] = [];
  peopleLoading = false;
  constructor(
    private route: Router,
    private api: ApiService,
    private fd: FormBuilder,
    private dataService: DataService
  ) {}
  

  ngOnInit() {
    this.projec_forms = this.fd.group({
      Project_list_name: [null, Validators.required],
      Marking_feature: [null, Validators.required],
      Tool_version_name: [null, Validators.required],
    });
    
    this.Project_list_call();
  }
  private Project_list_call() {
    this.peopleLoading = true;
    this.dataService.getPeople().subscribe((x) => {
      this.Project_list = x;
      this.peopleLoading = false;
    });
  }

  customSearchFn(term: string, item: Project_list) {
    term = term.toLowerCase();
    return item.p_name.toLowerCase().indexOf(term) > -1;
  }
  projectDetails_submit(item: any): void {
    console.log("tets", this.projec_forms.value);
    this.route.navigate(["/Task_list"]);
  }
}
