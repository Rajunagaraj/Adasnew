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
  projec_forms: FormGroup;
  Project_list: Project_list[] = [];
  peopleLoading = false;
  marking: any = [];
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
    this.route.navigate(["/Task_list"], {
      queryParams: { project_name: this.projec_forms.value.Project_list_name },
    });
  }
  onChange(project_name_list: any) {
    let project_name = { project_name: project_name_list };
    var names =
      "'2D Object Detection', '3D Point cloud', 'Lane Detection','TSR','Road Boundry'";
    var Arr = names.split(",");
    Arr.forEach((item) => {
      let test = item.replace(/"|'/g, "");
      this.marking.push(test);
      console.log(this.marking, "names", item);
    });
    this.api.getmarking(project_name).subscribe((x) => {
      this.peopleLoading = false;
    });
  }
}
