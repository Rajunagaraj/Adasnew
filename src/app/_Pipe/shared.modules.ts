import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchPipe } from '.././_Pipe/search.pipe';
// import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
@NgModule({
  declarations: [SearchPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // NgSelectModule,
    MatMenuModule,
		MatTreeModule,
		MatIconModule,
		MatRadioModule,
		MatButtonModule,
		MatDividerModule,
		MatGridListModule,
		MatDialogModule,
		MatCheckboxModule,
		MatExpansionModule,
		MatTableModule,
    MatBadgeModule,
		MatButtonToggleModule,
    MatToolbarModule,
    MatSnackBarModule, MatFormFieldModule, MatSelectModule, MatInputModule
  ],
  exports:[SearchPipe,CommonModule,FormsModule,ReactiveFormsModule,MatMenuModule,
  MatTreeModule,MatSnackBarModule, MatFormFieldModule, MatSelectModule, MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatRadioModule,
  MatButtonModule,
  MatDividerModule,
  MatGridListModule,
  MatDialogModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatTableModule,
  MatBadgeModule,
  MatButtonToggleModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ShredModule { }
