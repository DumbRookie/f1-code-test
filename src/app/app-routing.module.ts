import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DriverDetailsComponent} from './components/driver-details/driver-details.component';
import {AppComponent} from './app.component';
import {TablesComponent} from './components/tables/tables.component';

const routes: Routes = [
  {path: '', redirectTo: 'tables', pathMatch: 'full'},
  { path: 'driver/:driverId', component: DriverDetailsComponent },
  {path: 'tables', component: TablesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
