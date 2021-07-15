import {
  Component,
  ElementRef,
  ContentChild,
  TemplateRef,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  Injector,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ShapeType, ToolType } from "../../_models/shape-types";
import { ApiService } from "../../services/api.service";
import * as $ from "jquery";
import { HostListener } from "@angular/core";
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
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
  click = false; // flag to indicate when shape has been clicked
  elementWithFocus = null;
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
 
  zoomIn() {
    if (this.widths == 750) {

    } else {
      this.widths = this.widths + 50;
    }
  }
  zoomOut() {
    if (this.widths == 400) {
    } else {
      this.widths = this.widths - 50;
    }
  }
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

  interval: any;
  imageSource: any =
    "assets/images/annotate1.jpeg";
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
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.subscription = this.datService.projectIdId$.subscribe((ProjectId) => {
      this.project_names = ProjectId;
    });
    this.GetObjectLevel();
    this.GetSceneLevel();
    //draw image on svg
    this.setType("Rectangle");
  }
  onGoToPage2(): void {
    // ?this.datService.setId(this.project_names
    let project_names = localStorage.getItem("projectName");
    this.router.navigate(["/Task_list"], {
      queryParams: { project_name: project_names },
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
  selectShape(shapeType: string): void {
    this.click = true;
    this.shapeType = shapeType;
    this.selectedShape = ShapeType[shapeType];
    this.shapeValue = ShapeType[this.selectedShape];
   
    console.log("selected shape:", this.shapeValue);
  }

 
  setType(type: string) {
    this.shapeType = type;
  }
  currentShape = new Subject<Shape>();
  // the shape being just drawn
  createdShape: Shape;
  startDrawing(evt: MouseEvent) {
    console.log("tettts");
    let draw = true;
    if (this.shapeValue == "Rectangle") {
      evt.preventDefault();
      this.createdShape = {
        type: this.shapeType,
        x: evt.offsetX,
        y: evt.offsetY,
        width: 0,
        height: 0,
        shape: "s",
        text: this.text,
      };
      if (this.createdShape.height >= 0) {
        draw = false;
        this.shapesToDraw.push(this.createdShape);
      }

      console.log(this.shapesToDraw, "this.shapesToDraw");
    }
  }
  keepDrawing(evt: MouseEvent) {
    console.log(12);
    if (this.createdShape) {
      console.log("keepDrawing");
      this.currentShape.next(this.createdShape);
      this.createdShape.width = evt.offsetX - this.createdShape.x;
      this.createdShape.height = evt.offsetY - this.createdShape.y;
    }
  }

  Change_object_Cla(item: any) {
    this.text = item.target.value;
    console.log(this.text, "jj");
  }
  mouseDown(evt: any, shape) {
    this.shape_list = shape;
    evt.preventDefault();
    this.click = true;
    this.elementWithFocus = evt.target;
  }
  stopDrawing(event: any) {
    this.createdShape = null;
  }
  @HostListener("document:keyup", ["$event"])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "Delete") {
      this.remove(this.shape_list);
    }
  }
  remove(evt: any) {
    console.log(evt, "nnnn");
    this.shapesToDraw = this.shapesToDraw.filter(function (item) {
      return item.width !== evt.width && item.height !== evt.height;
    });
    console.log(this.shapesToDraw, "kk");
  }
  Move(item: any, st: string) {
    console.log("item");
  }
}
