import { Component } from '@angular/core';
import { Upload } from '../upload/upload';
import { Feed } from '../feed/feed';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})

export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;

  constructor() {
    this.tab2Root = Feed;
    this.tab1Root = Upload;
  }
}
