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
import { Input } from "@angular/core";
import { Subject } from "rxjs";
export class Shape {
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
@Component({
  selector: "app-annotation",
  templateUrl: "./annotation.component.html",
  styleUrls: ["./annotation.component.scss"],
})
export class AnnotationComponent implements OnInit {
  svg: any;
  selectedShape: any;
  shapeValue: string;
  selectedTool: ToolType;
  isSelectingPoints: boolean = false;
  public search: any = "";
  horizontalPosition: any = "7083c - 720g";
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  @ViewChild("myPinch", { static: false }) myPinch;
  Object_class = [{ class: "CAR" }, { class: "TRUCK" }, { class: "Vehicle" }];
  zoomIn() {
    this.myPinch.zoomIn();
  }
  zoomOut() {
    this.myPinch.zoomOut();
  }
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }
  playPause() {
    var myVideo: any = document.getElementById("my_video_1");
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }

  makeBig() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 560;
  }

  makeSmall() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 320;
  }

  makeNormal() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 420;
  }

  skip(value) {
    let video: any = document.getElementById("my_video_1");
    video.currentTime += value;
  }

  restart() {
    let video: any = document.getElementById("my_video_1");
    video.currentTime = 0;
  }
  constructor(private api: ApiService) { }
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

  current_user: any;
  Get_login_details(): void {
    this.api.Currentuser.subscribe((results) => {
      this.current_user = results;
      console.log(this.current_user, "##");
    });
  }
  //draw
  selectShape(shapeType: string): void {
    this.selectedShape = ShapeType[shapeType];
    this.shapeValue = ShapeType[this.selectedShape];
    this.isSelectingPoints = false;
    console.log("selected shape:", this.shapeValue);
  }

  type = "rectangle";
  ngOnInit() {
    this.Get_login_details();
    //draw image on canvas
    this.setType("rectangle");
  }
  @Input() shapesToDraw: Shape[] = [];
  shapeType = "rectangle";
  setType(type: string) {
    this.shapeType = type;
  }
  currentShape = new Subject<Shape>();
  // the shape being just drawn
  createdShape: Shape;
  startDrawing(evt: MouseEvent) {
    evt.preventDefault();
    this.createdShape = {
      type: this.shapeType,
      x: evt.offsetX,
      y: evt.offsetY,
      w: 0,
      h: 0,
    };
    this.shapesToDraw.push(this.createdShape);
  }

  keepDrawing(evt: MouseEvent) {
    if (this.createdShape) {
      this.currentShape.next(this.createdShape);
      this.createdShape.w = evt.offsetX - this.createdShape.x;
      this.createdShape.h = evt.offsetY - this.createdShape.y;
    }
  }
  click = false; // flag to indicate when shape has been clicked
  clickX;
  clickY; // stores cursor location upon first click
  moveX = 0;
  moveY = 0; // keeps track of overall transformation
  lastMoveX = 0;
  lastMoveY = 0; // stores previous transformation (move)
  elementWithFocus = null;
  shape_list;
  mouseDown(evt: any, shape) {
    this.shape_list = shape;
    evt.preventDefault();
    this.click = true;
    this.elementWithFocus = evt.target;
    this.clickX = evt.clientX;
    this.clickY = evt.clientY;
  }
  stopDrawing() {
    this.createdShape = null;
  }
  @HostListener("document:keyup", ["$event"])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "Delete") {
      this.remove(this.shape_list);
    }
  }
  remove(evt: any) {
    this.shapesToDraw = this.shapesToDraw.filter(function (item) {
      return item.w !== evt.w && item.h !== evt.h;
    });
    console.log(this.shapesToDraw, "nnnn");
  }
  Move(item: any, st: string) {
    console.log("item");
  }
}
