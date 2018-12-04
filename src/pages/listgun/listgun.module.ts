import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListgunPage } from './listgun';

@NgModule({
  declarations: [
    ListgunPage,
  ],
  imports: [
    IonicPageModule.forChild(ListgunPage),
  ],
})
export class ListgunPageModule {}
