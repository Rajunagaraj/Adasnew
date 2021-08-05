import {
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ShapeType } from "../../_models/shape-types";
import { ApiService } from "../../services/api.service";
import "jquery";
import { HostListener } from "@angular/core";
import { Subscription, Subject } from "rxjs";
import { Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../../services/dataservice.service";
export class Shape {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shape: string;
  text: string;
}
@Component({
  selector: "app-annotation",
  templateUrl: "./annotation.component.html",
  styleUrls: ["./annotation.component.scss"],
})
export class AnnotationComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  Object_class: any;
  Scene_level: any;
  selectedShape: any;
  shapeValue: string;
  public search: any = "";

  shape_list;
  type = "rectangle";
  text: "car";
  timeLeft: number = 0;
  project_names: any;
  horizontalPosition: any = "7083c - 720g";
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  @ViewChild("myPinch", { static: false }) myPinch;
  widths = 600;
  @Input() shapesToDraw: Shape[] = [];
  shapeType = "Rectangle";
  object_Category = [
    {
      colorbox: "pink",
      Category: "Ignore",
      count: 0,
    },
    {
      colorbox: "green",
      Category: "Motor Bike",
      count: 2,
    },
    {
      colorbox: "red",
      Category: "Passenger",
      count: 1,
    },
    {
      colorbox: "pink",
      Category: "Pedestrain",
      count: 3,
    },
    {
      colorbox: "pink",
      Category: "Vehicle",
      count: 4,
    },
  ];

  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

  interval: any;
  imageSource: any = "assets/images/annotate1.jpeg";
  images = [
    "assets/images/annotate.jpeg",
    "assets/images/annotate2.jpeg",
    "assets/images/annotate3.jpeg",
    "assets/images/annotate4.jpeg",
    "assets/images/annotate5.jpeg",
  ];
  constructor(
    private datService: DataService,
    private api: ApiService,
    private routed: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.subscription = this.datService.projectIdId$.subscribe((ProjectId) => {
      this.project_names = ProjectId;
    });
    this.GetObjectLevel();
    this.GetSceneLevel();
    this.Get_annotation_file();
    // this.adata.getLabels().subscribe( (data) => {
    // this.availableLabels = data['available'];
    this.availableLabels = { 1: "car", 2: "truck" };
    this.defaultLabel = 1;
    console.log(this.currAnnoArea, "ll");
    this.currentLabel["id"] = 1;
    this.currentLabel["lbl"] = this.defaultLabel[this.currentLabel["id"]];

    //seek to the requested image if applicable
    if ("seektoimg" in this.queryParameters) {
      console.debug(
        "Seeking to requested image: " + this.queryParameters["seektoimg"]
      );
      // this.loadNextImage(false,'name',this.queryParameters["seektoimg"]);
    }
    // });
  }
  onGoToPage2(): void {
    // ?this.datService.setId(this.project_names
    let project_names = localStorage.getItem("projectName");
    this.router.navigate(["/Task_list"], {
      queryParams: { project_name: project_names },
    });
  }
  Get_annotation_file() {
    this.routed.queryParamMap.subscribe((params) => {
      let Project_name = params.get("project_name");
      let File_Name = params.get("File_Name");
      this.api
        .Get_annotation(Project_name, File_Name)
        .subscribe((data): any => {
          this.defImg = data[0]["File_Name"];
        });
      localStorage.setItem("projectName", Project_name);
    });
  }

  play() {
    this.timeLeft = this.images.length - 1;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.imageSource = this.images[this.timeLeft];
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  previous() {
    if (this.timeLeft === 0) {
      this.timeLeft = this.images.length - 1;
    } else {
      this.timeLeft = this.timeLeft - 1;
    }
    this.imageSource = this.images[this.timeLeft];
  }

  next() {
    if (this.timeLeft === this.images.length - 1) {
      this.timeLeft = 0;
    } else {
      this.timeLeft = this.timeLeft + 1;
    }
    this.imageSource = this.images[this.timeLeft];
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  GetObjectLevel(): void {
    this.api.GetObjectLevels().subscribe((results) => {
      this.Object_class = results;
      console.log(this.Object_class, "##");
    });
  }
  GetSceneLevel(): void {
    this.api.GetSceneLevels().subscribe((results) => {
      this.Scene_level = results;
      console.log(this.Scene_level, "##");
    });
  }
  //draw
  Change_object_Cla(item: any) {
    this.text = item.target.value;
    console.log(this.text, "jj");
  }
  @HostListener("document:keyup", ["$event"])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "Delete") {
    }
  }

  // New code Start below
  defImg: string = "assets/images/annotate3.jpeg";
  currImg: string = this.defImg;
  currImgName: string;
  currAnnoArea = [
    {
      id: 1,
      x: 94,
      y: 113,
      z: 100,
      height: 58,
      width: 80,
      lblid: 2,
      lbltxt: "Truck",
    },
  ];
  currDbName: string;
  aspectRatio: number = 0.0;
  availableLabels: {};
  defaultLabel: {};
  currentLabel: Map<string, any>;
  queryParameters: {};

  imageLoaded() {
    if (this.currAnnoArea != null) {
      const self = this;
      (<any>$("img#img-to-annotate")).selectAreas({
        minSize: [30, 30],
        aspectRatio: this.aspectRatio,
        labelsDict: self.availableLabels,
        defaultLabelId: 3,
        // Object.keys(self.defaultLabel)[0],
        onLoaded: function () {
          //'add'
          (<any>$("img#img-to-annotate")).selectAreas(
            "add",
            self.currAnnoArea,
            true
          );

          const windowXmid = window.innerWidth / 2;
        },
        onChanged: function (event, id, areas) {},
      });
      console.log(self.currAnnoArea, +" areas", arguments);
    }
  }
  expandContract(pixels: number) {
    const areas = (<any>$("img#img-to-annotate")).selectAreas("areas");
    console.log(areas, "areas");
    const area0 = areas[0];
    area0.x = area0.x - pixels;
    area0.y = area0.y - pixels;
    area0.width = area0.width + pixels * 2;
    area0.height = area0.height + pixels * 2;

    (<any>$("img#img-to-annotate")).selectAreas("remove", 0);
    (<any>$("img#img-to-annotate")).selectAreas("add", area0);
  }
  verticalExpandContract(pixels: number) {
    const areas = (<any>$("img#img-to-annotate")).selectAreas("areas");

    const area0 = areas[0];
    area0.y = area0.y - pixels;
    area0.height = area0.height + pixels * 2;

    (<any>$("img#img-to-annotate")).selectAreas("remove", 0);
    (<any>$("img#img-to-annotate")).selectAreas("add", area0);
  }
  HorizontalExpandContract(pixels: number) {
    const areas = (<any>$("img#img-to-annotate")).selectAreas("areas");

    const area0 = areas[0];
    area0.x = area0.x - pixels;
    area0.width = area0.width + pixels * 2;

    (<any>$("img#img-to-annotate")).selectAreas("remove", 0);
    (<any>$("img#img-to-annotate")).selectAreas("add", area0);
  }
  updateImgAreas(self) {
    var areas = (<any>$("img#img-to-annotate")).selectAreas("areas");
    if (areas.length == 0) {
      return;
    }
    console.log(self.currDbName, self.currImgName, areas, "areas");
    // self.adata.updateAnnotation(self.currDbName, self.currImgName, areas).subscribe(
    //   data => {
    //     if (data['response'] === 'valid') {
    //       console.log('update success');
    //       self.alerts.success(self.currImgName + ' updated');
    //     } else {
    //       console.log('update failure');
    //       self.alerts.danger(self.currImgName + ' update failed');
    //     }
    //   }, error => { });
    console.log("update call made");
  }
  temp: any;
  loadPrevImage() {
    // this.updateImgAreas(this);
    var areas = (<any>$("img#img-to-annotate")).selectAreas("areas");
    (<any>$("img#img-to-annotate")).selectAreas("destroy");
    this.currAnnoArea = null;
    // this.currImg = this.defImg;
    this.currImg = "assets/images/annotate3.jpeg";
    console.log(this.temp, "areasareas");
    this.currAnnoArea = this.temp;
    // this.currAnnoArea = [{
    //   id: 0, x: 5, y: 113, z: 100, height: 90, width: 163, lblid: 2,
    //   lbltxt: "Truck"
    // },{
    //   id: 0, x: 225, y: 123, z: 100, height: 90, width: 103, lblid: 1,
    //   lbltxt: "Car"
    // }];
    this.imageLoaded();
  }
  loadNextImage(unreviwed, filter = "", filterval = "") {
    var areas = (<any>$("img#img-to-annotate")).selectAreas("areas");
    this.temp = areas;
    console.log(areas, "next");
    //  this.updateImgAreas(this);
    (<any>$("img#img-to-annotate")).selectAreas("destroy");
    this.currAnnoArea = null;
    (this.defImg = "assets/images/annotate.jpeg"), (this.currImg = this.defImg);
    this.currAnnoArea = [
      {
        id: 1,
        x: 194,
        y: 113,
        z: 0,
        height: 100,
        width: 190,
        lblid: 2,
        lbltxt: "Truck",
      },
    ];
     this.imageLoaded();
  }
  zoomIn() {
    if (this.widths == 750) {
    } else {
      this.imageLoaded();
      this.widths = this.widths + 50;
    }
  }
  zoomOut() {
    if (this.widths == 400) {
    } else {
      this.widths = this.widths - 50;
    }
  }
  // New end here
}
