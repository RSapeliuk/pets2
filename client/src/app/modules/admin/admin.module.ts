import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from '../../components/admin/admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule, MatExpansionModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule
} from '@angular/material';
import {MainPageModule} from '../main-page/main-page.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MainPageModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    MatCheckboxModule,
  ]
})
export class AdminModule { }
