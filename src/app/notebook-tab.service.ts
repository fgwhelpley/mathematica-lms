import { Injectable } from "@angular/core";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class NotebookTabService {
  private api = "https://www.wolframcloud.com/obj/fgwhelpley/nbapi";
  notebooks: NotebookTab[] = [];
  selected: number;

  get notebook(): NotebookTab {
    return this.notebooks[this.selected];
  }

  constructor(
    private domSanitizer: DomSanitizer,
    private cookieService: CookieService
  ) {
    const notebooks = this.cookieService.get("notebooks");
    if (notebooks) {
      try {
        this.notebooks = JSON.parse(notebooks).map(nb => this.toNotebook(nb));
      } catch (e) {
        this.notebooks = [];
      }
    }
  }

  open(notebook: NotebookTab): NotebookTab {
    this.selected = this.findIndex(notebook);
    if (this.selected === -1) {
      // notebook was not previously open so add to back of list
      this.selected = this.notebooks.length;
      this.notebooks = [...this.notebooks, this.toNotebook(notebook)];
    }
    return this.update();
  }

  close(notebook: NotebookTab): NotebookTab {
    const index = this.findIndex(notebook);
    if (index === -1) {
      // do nothing since notebook is not in list
      return;
    } else {
      // remove notebook from list
      this.notebooks = this.notebooks.filter((a, i) => i !== index);
      this.selected = Math.min(index + 1, this.notebooks.length);
      return this.update();
    }
  }

  private findIndex(notebook: NotebookTab): number {
    return this.notebooks.findIndex(
      nb => nb.lesson === notebook.lesson && nb.name === notebook.name
    );
  }

  private update(): NotebookTab {
    this.cookieService.set(
      "notebooks",
      JSON.stringify(
        this.notebooks.map(nb => ({ lesson: nb.lesson, name: nb.name }))
      )
    );
    return this.notebooks[this.selected];
  }

  private toNotebook({ lesson, name }): NotebookTab {
    return {
      lesson,
      name,
      id: `L${lesson}-${name.replace(/\s/, "")}`,
      title: `Lesson ${lesson}: ${name}`,
      url: this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${this.api}?lesson=${lesson}&nb=${name}`
      )
    };
  }
}

interface NotebookTab {
  lesson: number;
  name: string;
  id: string;
  title: string;
  url?: SafeResourceUrl;
}
