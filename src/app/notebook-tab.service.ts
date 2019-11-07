import { Injectable } from "@angular/core";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class NotebookTabService {
  notebooks: NotebookTab[] = [];
  selected: number;

  get notebook(): NotebookTab {
    return this.notebooks[this.selected];
  }

  constructor(private domSanitizer: DomSanitizer) {}

  open(notebook: NotebookTab): NotebookTab[] {
    this.selected = this.findIndex(notebook);
    if (this.selected === -1) {
      const api = "https://www.wolframcloud.com/obj/fgwhelpley/nbapi";
      const url = this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${api}?lesson=${notebook.lesson}&nb=${notebook.name}`
      );
      // notebook was not previously open so add to back of list
      this.notebooks = [...this.notebooks, { ...notebook, url }];
    }
    return this.notebooks;
  }

  close(notebook: NotebookTab): NotebookTab[] {
    const index = this.findIndex(notebook);
    if (index === -1) {
      // do nothing since notebook is not in list
    } else {
      // remove notebook from list
      this.notebooks = this.notebooks.filter((a, i) => i !== index);
    }
    return this.notebooks;
  }

  private findIndex(notebook: NotebookTab): number {
    return this.notebooks.findIndex(
      nb => nb.lesson === notebook.lesson && nb.name === notebook.name
    );
  }
}

interface NotebookTab {
  lesson: number;
  name: string;
  url?: SafeResourceUrl;
}
