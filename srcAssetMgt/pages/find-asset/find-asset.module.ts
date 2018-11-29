import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindAssetPage } from './find-asset';

@NgModule({
  declarations: [
    FindAssetPage,
  ],
  imports: [
    IonicPageModule.forChild(FindAssetPage),
  ],
})
export class FindAssetPageModule {}
