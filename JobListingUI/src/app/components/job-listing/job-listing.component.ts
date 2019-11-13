import { Component } from '@angular/core';
import { GenericRequestService } from '../../services/generic-request.service';
import { Subject, of } from 'rxjs';

@Component({
    selector: 'job-listing',
    templateUrl: './job-listing.component.html',
    styleUrls: ['./job-listing.component.css']
})
/** job-listing component*/
export class JobListingComponent {
    /** job-listing ctor */
  gJobs: any;
  gFilteredJobs: any;
  gCategories: any;

  gSearchFilter: any = { Category: "", Text: "" };
  gSubject: Subject<any> = new Subject();
  gFilter: string = "";

  constructor(private pGenericRequestService: GenericRequestService) {
  }

  ngOnInit() {
    this.getJobs();
    this.gSubject.subscribe(pValue => {
      this.filterJobsV2(pValue);
    });
  }

  getJobs() {
    this.pGenericRequestService.execGet('https://hirehive-testing-account.hirehive.com/api/v1/jobs').subscribe((pData) => {
      this.gJobs = pData.jobs;
      this.gFilteredJobs = pData.jobs;
      this.gCategories = new Set(this.gJobs.map(item => item.category));
    });
  }

  enterSearch() {

    if (this.gFilter.length > 1)
      this.gSearchFilter.Text = this.gFilter;
    else
      this.gSearchFilter.Text = "";
    this.gSubject.next(this.gSearchFilter);
  }

  setCategory(pValue: string) {
    this.gSearchFilter.Category = pValue;
    this.gSubject.next(this.gSearchFilter);
  }

  filterJobsV2(pFilters: any) {
    this.gFilteredJobs = this.gJobs;

    if (pFilters.Category) {
      console.log(pFilters.Category);
      this.gFilteredJobs = this.gFilteredJobs.filter(pJob => pJob.category == pFilters.Category);
    }

    if (pFilters.Text) {
      console.log(pFilters.Text);
      this.gFilteredJobs = this.gFilteredJobs.filter(pJob => pJob.title.toLowerCase().includes(pFilters.Text.toLowerCase()) || pJob.description.text.toLowerCase().includes(pFilters.Text.toLowerCase()));
    }
  }
}
