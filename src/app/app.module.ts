import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


// ngrx store
import { StoreRouterConnectingModule, DefaultRouterStateSerializer } from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
// ngrx store declarations & local imports
export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];
import { reducers } from './store/core/reducers';

import { environment } from 'src/environments/environment';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
];

// containers
import { AppComponent } from './core/containers/app/app.component';
import { HomeComponent } from './core/containers/home/home.component';

// other modules
import { DemoAdminModule } from './demo-admin/demo-admin.module';
import { AngularCalendarModule } from 'lib/angular-calendar/angular.calendar.module';
import { ANGULAR_CALENDAR_CONFIG } from 'lib/angular-calendar/tokens/angular-calendar.config';
import { TimepickerModule } from 'lib/timepicker/timepicker-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollProgressDemoModule } from 'lib/scroll-progress/scroll-progress.module';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HoldableDirModule } from 'lib/holdable/holdable.module';
import { OnHoverTemplateModule } from 'lib/on-hover-template/on-hover-template.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers, { metaReducers }),
  //  EffectsModule.forRoot(effects),
  StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Store DevTools',
      logOnly: environment.production
    }),
    DemoAdminModule,
    AngularCalendarModule,
    TimepickerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScrollProgressDemoModule,
    MatProgressBarModule,
    HoldableDirModule,
    OnHoverTemplateModule
  ],
  providers: [
    {
      provide: ANGULAR_CALENDAR_CONFIG,
      useValue: {
        timespanLabels : {
          daily : 'daily',
          weekly: 'weekly',
          monthly : 'monthly'
        },
        weekDayLabels: [
          {monday: 'pon'},
          {tuesday: 'uto'},
          {wednesday: 'sri'},
          {thursday: 'čet'},
          {friday: 'pet'},
          {saturday: 'sub'},
          {sunday: 'ned'}
        ]
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
