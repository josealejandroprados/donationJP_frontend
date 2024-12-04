import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationsRoutingModule } from './donations-routing.module';
import { DonationComponent } from './components/donation/donation.component';


@NgModule({
  declarations: [
    DonationComponent
  ],
  imports: [
    CommonModule,
    DonationsRoutingModule
  ]
})
export class DonationsModule { }
