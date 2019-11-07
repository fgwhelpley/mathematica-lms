import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { AppRoutingModule } from "./app-routing.module";
import { MainComponent } from "./main/main.component";
import { FramelessComponent } from "./frameless/frameless.component";
import { HeaderComponent } from "./header/header.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    MainComponent,
    FramelessComponent,
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
