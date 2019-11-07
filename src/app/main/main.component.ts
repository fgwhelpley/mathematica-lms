import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NotebookTabService } from "../notebook-tab.service";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { takeWhile } from 'rxjs/operators';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit, OnDestroy {
  notebooks: any[];
  activeId: string;
  alive = true;

  constructor(
    private notebookTabService: NotebookTabService,
    private router: Router,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) {
    this.route.queryParamMap
      .pipe(takeWhile(() => this.alive))
      .subscribe(params => {
        const lesson = params.get('lesson');
        const name = params.get('name');
        if (lesson && name) {
          this.open(lesson, name);
        } else {

        }
      });
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.alive = false;
  }

  open(lesson, name) {
    this.update(this.notebookTabService.open({ lesson, name }));
  }

  close(notebook, event: Event) {
    const nb = this.notebookTabService.close(notebook);
    this.update({id: null, ...nb});
    event.preventDefault();
  }

  tabChange(event: NgbTabChangeEvent) {
    // this.router.navigate([], {queryParams: {lesson: }});
    event.preventDefault();
  }

  private update({ id }) {
    this.notebooks = this.notebookTabService.notebooks;
    this.activeId = this.notebooks.length > 0 ? id : null;
  }
}
