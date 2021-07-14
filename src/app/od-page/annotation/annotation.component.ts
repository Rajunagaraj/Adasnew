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
import { Subscription,Subject } from 'rxjs';

import { Input } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../../services/dataservice.service";
export class Shape {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shape:string;
  text:string;
}
@Component({
  selector: "app-annotation",
  templateUrl: "./annotation.component.html",
  styleUrls: ["./annotation.component.scss"],
})
export class AnnotationComponent implements OnInit,OnDestroy  {
  subscription: Subscription;
  Object_class:any;
  Scene_level: any;
  current_user: any;
  svg: any;
  selectedShape: any;
  shapeValue: string;
  selectedTool: ToolType;
  isSelectingPoints: boolean = false;
  public search: any = "";
  click = false; // flag to indicate when shape has been clicked
  clickX;
  clickY; // stores cursor location upon first click
  moveX = 0;
  moveY = 0; // keeps track of overall transformation
  lastMoveX = 0;
  lastMoveY = 0; // stores previous transformation (move)
  elementWithFocus = null;
  shape_list;
  type = "rectangle";
  text: "car";
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

 
  horizontalPosition: any = "7083c - 720g";
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  @ViewChild("myPinch", { static: false }) myPinch;
  widths=400;
  zoomIn() {
    if(this.widths == 700){
    }
      else{
      this.widths = (this.widths + 50);}
    } 
  
  zoomOut(){
    if(this.widths == 400){
    } else{
      this.widths = (this.widths - 50);
    }
}
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

  interval:any;
  imageSource: any =
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg';
  images = [
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
    'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
    'https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg',
    'https://www.whatsappimages.in/wp-content/uploads/2021/01/Boys-Feeling-Very-Sad-Images-Pics-Downlaod.jpg'
  ];
  timeLeft: number = 0;
  project_names:any;
  constructor(private datService: DataService,private api: ApiService,
    private route: ActivatedRoute,
    private router: Router) {
   

}
  ngOnInit() {
    this.subscription = this.datService.projectIdId$.subscribe(ProjectId => {
      this.project_names = ProjectId; 
    });
  
    this.Get_login_details();
    this.GetObjectLevel();
    this.GetSceneLevel();
    //draw image on svg
    this.setType("Rectangle");
  }
  onGoToPage2(){
    this.datService.setId(this.project_names)
    console.log(this.project_names,"jjj");
    this.router.navigate(['/Task_list'], { queryParams: { project_name: this.project_names }});

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
  GetObjectLevel():void {
    this.api.GetObjectLevels().subscribe((results) => {
      this.Object_class = results;
      console.log(this.Object_class,"##")
    });
  }
  GetSceneLevel():void {
    this.api.GetSceneLevels().subscribe((results) => {
      this.Scene_level = results;
      console.log(this.Scene_level,"##")
    });
  }
  Get_login_details(): void {
    this.api.Currentuser.subscribe((results) => {
      this.current_user = results;
      console.log(this.current_user, "##");
    });
  }
  //draw
  selectShape(shapeType: string): void {
    this.click = true
    this.shapeType = shapeType;
    this.selectedShape = ShapeType[shapeType];
    this.shapeValue = ShapeType[this.selectedShape];
    this.isSelectingPoints = false;
    console.log("selected shape:", this.shapeValue);
  }

 
  @Input() shapesToDraw: Shape[] = [];
  shapeType = "Rectangle";
  setType(type: string) {
    this.shapeType = type;
  }
  currentShape = new Subject<Shape>();
  // the shape being just drawn
  createdShape: Shape;
  startDrawing(evt: MouseEvent) {
    console.log("tettts");
    let draw = true;
    if(this.shapeValue == "Rectangle"){
     evt.preventDefault();
    this.createdShape = {
      type: this.shapeType,
      x: evt.offsetX,
      y: evt.offsetY,
      width: 0,
      height: 0,
      shape:'s',
      text:this.text
    };
    if(this.createdShape.height>=0){
      draw = false;
      this.shapesToDraw.push(this.createdShape);
    }
   
    console.log(this.shapesToDraw,"this.shapesToDraw");
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
 
  Change_object_Cla(item:any){
    this.text = item.target.value;
    console.log( this.text,"jj");
  }
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


