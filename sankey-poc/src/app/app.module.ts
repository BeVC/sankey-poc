import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { CesGaugeComponent } from './score-widgets/ces-gauge/ces-gauge.component';
import { CsatGaugeComponent } from './score-widgets/csat-gauge/csat-gauge.component';

@NgModule({
  declarations: [
    AppComponent,
    SidepanelComponent,
    CesGaugeComponent,
    CsatGaugeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
