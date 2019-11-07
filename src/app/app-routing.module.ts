import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { FramelessComponent } from './frameless/frameless.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'frameless',
    component: FramelessComponent
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    constructor( @Optional() @SkipSelf() parentModule: AppRoutingModule ) {
        if (parentModule) {
            throw new Error(
                'AppRoutingModule is already loaded. Import it in the AppModule only'
            );
        }
    }
}