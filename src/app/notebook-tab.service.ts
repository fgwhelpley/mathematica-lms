import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotebookTabService {

  notebooks: NotebookTab[] = [];
  selected: number;

  get notebook(): NotebookTab {
    return this.notebooks[this.selected];
  }

  constructor() { }

  open(notebook: NotebookTab): NotebookTab[] {
    this.selected = this.findIndex(notebook);
    if (this.selected === -1) {
      // notebook was not previously open so add to back of list
      this.notebooks = [...this.notebooks, notebook];
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
    return this.notebooks.findIndex(nb => nb.lesson === notebook.lesson && nb.name === notebook.name);
  }

}

interface NotebookTab {
  lesson: number;
  name: string;
}