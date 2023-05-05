import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {LoaderService} from './core_module/services/loader.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {map} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'social-media-app';

  showLoader: boolean = false;

  constructor(
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
  ) {
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
      map((events) => {
        let child = this.activatedRoute.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        if (child?.snapshot.data['title']) {
          return child.snapshot.data['title'];
        }
        return appTitle;
      })
    ).subscribe((t: string) => {
      this.titleService.setTitle(t);
    });
  }

  ngAfterViewInit() {
    this.loaderService?.status?.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }

}
