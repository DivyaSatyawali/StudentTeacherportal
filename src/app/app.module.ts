import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule , 
         MatCardModule , 
         MatMenuModule , 
         MatToolbarModule ,  
         MatSidenavModule , 
         MatListModule,
         MatProgressSpinnerModule,
         MatInputModule,
         MatExpansionModule,
         MatSelectModule,
         MatOptionModule,
         MatNativeDateModule,
         MatDatepickerModule,
         MatSlideToggleModule,
         MatCheckboxModule,
         MatChipsModule,
         MatSnackBarModule,
         MatDialogModule,
         MatIconModule,
         
        } from '@angular/material';

import { LoginComponent } from './components/login/login.component';
import { EventComponent } from './components/event/event.component';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { ApplyComponent } from './components/reimbursement/apply/apply.component';
import { TrackComponent } from './components/reimbursement/track/track.component';
import { LecturesComponent } from './components/eresources/lectures/lectures.component';
import { ModulesComponent } from './components/eresources/modules/modules.component';
import { AssignmentsComponent } from './components/eresources/assignments/assignments.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AddEventComponent } from './components/event/add-event/add-event.component';
import { EventCardComponent } from './components/event/event-card/event-card.component';
import { HttpClientModule } from '@angular/common/http';
import { AllEnrollmentsComponent } from './components/form/all-enrollments/all-enrollments.component';
import { CookieService } from 'ngx-cookie-service';
import { TrackDetailsComponent } from './components/reimbursement/track-details/track-details.component';
import { StarPerformerComponent } from './components/star-performer/star-performer.component';
import { RoleChangeWarningComponent } from './components/form/all-enrollments/role-change-warning/role-change-warning.component';

@NgModule({
  
  declarations: [
    AppComponent,
    FormComponent,
    LoginComponent,
    EventComponent,
    ApplyComponent,
    MainNavComponent,
    TrackComponent,
    LecturesComponent,
    ModulesComponent,
    AssignmentsComponent,
    AddEventComponent,
    EventCardComponent,
    AllEnrollmentsComponent,
    TrackDetailsComponent,
    StarPerformerComponent,
    RoleChangeWarningComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule, 
    MatMenuModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatListModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule ,
    AmazingTimePickerModule,
    MatCheckboxModule,
    MatChipsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  entryComponents: [ TrackDetailsComponent,RoleChangeWarningComponent]
})
export class AppModule { }
