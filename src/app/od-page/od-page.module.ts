import { NgModule } from '@angular/core';
import { ODPageRoutingModule } from './od-page-routing.module';
import { ODPageComponent } from './od-page.component';
import { AnnotationComponent } from './annotation/annotation.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { ProjectListComponent } from './project-list/project-list.component'
import { ShredModule } from '../_Pipe/shared.modules';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModules } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSvgModule } from 'ngx-svg';
@NgModule({
  declarations: [ODPageComponent, AnnotationComponent, ProjectListComponent],
  imports: [
    CommonModule,ODPageRoutingModule,
  ShredModule,
  PinchZoomModule,
  NgSelectModule,SharedModules,NgxSvgModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ODPageModule { }
