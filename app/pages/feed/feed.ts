import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../services/data.service';

@Component({
  templateUrl: 'build/pages/feed/feed.html'
})
export class Feed {

	protected loadedPics: Array<any> = [];

	
	constructor(public navCtrl: NavController, private data: DataService) {}

	private loadPics() : void {
		this.data.getLocation(pos => {
			this.data.query(pos, res => {
				console.log("query finished");
				console.log(res);
				this.loadedPics = res;
			})
		})
	}
}
