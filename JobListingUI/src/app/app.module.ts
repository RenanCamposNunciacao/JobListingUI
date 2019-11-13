import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { JobListingComponent } from './components/job-listing/job-listing.component';
import { GenericRequestService } from './services/generic-request.service';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    JobListingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [GenericRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
