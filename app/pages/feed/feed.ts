import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../services/data.service';

@Component({
  templateUrl: 'build/pages/feed/feed.html'
})
export class Feed {

	pos: any = {};

	constructor(public navCtrl: NavController, private data: DataService) {
		this.data.getLocation(pos => {
			this.pos = pos;
			console.log(pos);
		});

		let myValues = [
			{
				name: "Ori",
				age: 20
			},
			{
				name: "Jacoby",
				age: 34
			},
			{
				name: "Jacoby",
				age: 34
			},
		];
	}
}
