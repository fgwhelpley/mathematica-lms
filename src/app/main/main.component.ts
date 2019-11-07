import { Component, Input, OnInit } from "@angular/core";
import { NotebookTabService } from "../notebook-tab.service";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  notebooks: any[];
  url: SafeResourceUrl;
  activeId: string;

  constructor(
    private domSanitizer: DomSanitizer,
    private notebookTabService: NotebookTabService
  ) {}

  ngOnInit() {}

  open(lesson, name, event: Event) {
    this.notebooks = this.notebookTabService.open({ lesson, name });
    this.update({lesson, name});
    event.preventDefault();
  }

  title({ lesson, name }, bool: boolean = true): string {
    return bool
      ? `Lesson ${lesson}: ${name}`
      : `L${lesson}-${name.replace(/\s/, "")}`;
  }

  close(notebook, event: Event) {
    this.notebooks = this.notebookTabService.close(notebook);
    if (this.notebooks.length) {
      this.update(this.notebooks[this.notebooks.length - 1]);
    } else {
      this.url = null;
    }
    event.preventDefault();
  }

  private update({ lesson, name }) {
    const api = "https://www.wolframcloud.com/obj/fgwhelpley/nbapi";
    this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(
      `${api}?lesson=${lesson}&nb=${name}`
    );
    this.activeId = this.title({ lesson, name }, false);
  }
}
