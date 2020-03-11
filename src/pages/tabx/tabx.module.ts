import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabxPage } from './tabx';

@NgModule({
  declarations: [
    TabxPage,
  ],
  imports: [
    IonicPageModule.forChild(TabxPage),
  ]
})
export class TabxPageModule {}
