import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-frameless',
  templateUrl: './frameless.component.html',
  styleUrls: ['./frameless.component.css']
})
export class FramelessComponent implements OnInit {

  url = 'https://www.wolframcloud.com/env/fgwhelpley/info';
  url2 = `${this.url}?_view=frameless`;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  beSafe(url): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}