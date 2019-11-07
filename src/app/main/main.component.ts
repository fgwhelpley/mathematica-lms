import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NotebookTabService } from "../notebook-tab.service";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { takeWhile } from 'rxjs/operators';

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
        }
      });
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.alive = false;
  }

  open(lesson, name) {
    this.notebooks = this.notebookTabService.open({ lesson, name });
    this.update({lesson, name});
  }

  close(notebook, event: Event) {
    this.notebooks = this.notebookTabService.close(notebook);
    if (this.notebooks.length) {
      this.update(this.notebooks[this.notebooks.length - 1]);
    }
    event.preventDefault();
  }

  title({ lesson, name }, bool: boolean = true): string {
    return bool
      ? `Lesson ${lesson}: ${name}`
      : `L${lesson}-${name.replace(/\s/, "")}`;
  }

  private update({ lesson, name }) {
    this.activeId = this.title({ lesson, name }, false);
  }
}
