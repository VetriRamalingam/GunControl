import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManfhomePage } from './manfhome';

@NgModule({
  declarations: [
    ManfhomePage,
  ],
  imports: [
    IonicPageModule.forChild(ManfhomePage),
  ],
})
export class ManfhomePageModule {}
