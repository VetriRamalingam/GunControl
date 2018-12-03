import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CushomePage } from './cushome';

@NgModule({
  declarations: [
    CushomePage,
  ],
  imports: [
    IonicPageModule.forChild(CushomePage),
  ],
})
export class CushomePageModule {}
