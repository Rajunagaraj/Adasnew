import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CONNECTION_TYPE } from './services/api.service';
import { ShredModule } from './_Pipe/shared.modules';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  declarations: [
    AppComponent,
    // SearchPipe
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PinchZoomModule,
    BrowserAnimationsModule,
    ShredModule
  ],
 
  providers: [
    //useFactory
    {
      provide: CONNECTION_TYPE,
      useFactory: () => {
        const userConnection = navigator['connection'];      
        return userConnection['effectiveType'] 
      }
    }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
