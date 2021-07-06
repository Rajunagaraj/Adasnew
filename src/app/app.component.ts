import { ApiService, CONNECTION_TYPE } from "./services/api.service";
import { Component, OnInit, InjectionToken } from "@angular/core";
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  stagger,
  animateChild,
  state,
  keyframes,
} from "@angular/animations";
import { ConnectionService } from "ng-connection-service";
import { Inject } from "@angular/core";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger("slowConnectionMessage", [
      transition(":enter", [
        style({ transform: "translateY(-50px)" }),
        animate(
          "0.7s",
          keyframes([
            style({ transform: "translateY(-50px)", offset: 0 }),
            style({ transform: "translateY(0px)", offset: 0.7 }),
          ])
        ),
      ]),
      transition(":leave", [
        style({ transform: "translateY(0px)" }),
        animate(
          "0.5s",
          keyframes([
            style({ transform: "translateY(0px)", offset: 0 }),
            style({ transform: "translateY(-50px)", offset: 0.5 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  status = "ONLINE"; //initializing as online by default
  isConnected = true;
  isConnectionSlow: boolean = false;

  constructor(
    private connectionService: ConnectionService,
    @Inject(CONNECTION_TYPE) private connectionType: string
  ) {
    this.isConnectionSlow = this.connectionType === "2g" ? true : false;
    this.connectionService.monitor().subscribe((isConnected) => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
      } else {
        this.status = "OFFLINE";
      }
    });
  }
  ngOnInit() {}
}
