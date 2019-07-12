import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EventComponent } from './components/event/event.component';
import { FormComponent } from './components/form/form.component';
import { ApplyComponent } from './components/reimbursement/apply/apply.component';
import { TrackComponent } from './components/reimbursement/track/track.component';
import { LecturesComponent } from './components/eresources/lectures/lectures.component';
import { ModulesComponent } from './components/eresources/modules/modules.component';
import { AssignmentsComponent } from './components/eresources/assignments/assignments.component';
import { AddEventComponent } from './components/event/add-event/add-event.component';
import { AllEnrollmentsComponent } from './components/form/all-enrollments/all-enrollments.component'
import { StarPerformerComponent } from './components/star-performer/star-performer.component';

const routes: Routes = [
{path:'',component:LoginComponent},
  {path:'event',component:EventComponent},
  {path:'enrollment',component:FormComponent},
  {path:'apply',component:ApplyComponent},
  {path:'track',component:TrackComponent},
  {path:'lectures',component:LecturesComponent},
  {path:'modules',component:ModulesComponent},
  {path:'assignments',component:AssignmentsComponent},
  {path:'addevent',component:AddEventComponent},
  {path:'all-enrollment',component:AllEnrollmentsComponent},
  {path:'event/edit/:id',component:AddEventComponent},
  {path:'star-performer',component:StarPerformerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
