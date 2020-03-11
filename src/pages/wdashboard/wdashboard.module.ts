import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WdashboardPage } from './wdashboard';

@NgModule({
  declarations: [
    WdashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(WdashboardPage),
  ],
})
export class WdashboardPageModule {}
