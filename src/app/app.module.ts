import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// ngrx store
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
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
    AngularCalendarModule
  ],
  providers: [
    {
      provide: ANGULAR_CALENDAR_CONFIG,
      useValue: {
        timespanLabels : {
          daily : 'dnevno',
          weekly: 'tjedno',
          monthly : 'mjesecno'
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
