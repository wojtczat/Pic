import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../services/data.service';

@Component({
  templateUrl: 'build/pages/feed/feed.html'
})
export class Feed {

	protected pos: any = {};

	protected loadedPics: Array<string> = [];

	
	constructor(public navCtrl: NavController, private data: DataService) {
		this.data.getLocation(pos => {
			this.pos = pos;
			console.log(pos);
		});
	}

	ngOnInit() {
		this.data.getLocation(pos => {
			this.pos = pos;
			this.loadPics();
		})
	}

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
