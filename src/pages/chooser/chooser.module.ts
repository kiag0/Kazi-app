import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooserPage } from './chooser';

@NgModule({
  declarations: [
    ChooserPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooserPage),
  ],
})
export class ChooserPageModule {}
