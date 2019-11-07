import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  src1: SafeResourceUrl;
  src2: SafeResourceUrl;
  url = 'https://www.wolframcloud.com/obj/fgwhelpley/nbapi';
  res$: Observable<SafeResourceUrl>;

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) {
    
  }

  getNB(lesson, name) {
    return `${this.url}?user=${encodeURIComponent('faisal@makingmath.com')}&lesson=${lesson}&nb=${name}`;
  }

}
