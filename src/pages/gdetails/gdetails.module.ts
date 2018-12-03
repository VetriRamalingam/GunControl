import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GdetailsPage } from './gdetails';

@NgModule({
  declarations: [
    GdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(GdetailsPage),
  ],
})
export class GdetailsPageModule {}
