import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GovhomePage } from './govhome';

@NgModule({
  declarations: [
    GovhomePage,
  ],
  imports: [
    IonicPageModule.forChild(GovhomePage),
  ],
})
export class GovhomePageModule {}
