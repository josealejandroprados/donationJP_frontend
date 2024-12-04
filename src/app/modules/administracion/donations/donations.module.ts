import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationsRoutingModule } from './donations-routing.module';
import { DonationComponent } from './components/donation/donation.component';
import { SharedModule } from "../../../shared/shared.module";


@NgModule({
  declarations: [
    DonationComponent
  ],
  imports: [
    CommonModule,
    DonationsRoutingModule,
    SharedModule
]
})
export class DonationsModule { }
