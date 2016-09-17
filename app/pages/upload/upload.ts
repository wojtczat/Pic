import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../services/data.service';

@Component({
  templateUrl: 'build/pages/upload/upload.html'
})
export class Upload {

    public base64Img: String;
	pos: any = {};

	long = "";
	lat = "";

	myImage: string;
    
    doCamera(){
		console.log("Getting pic");
		console.log(this.data);
		this.data.getPicture()	
	}

	constructor(public navCtrl: NavController, private data: DataService) {
		this.data.getLocation(pos => {

			this.long = pos.coords.longitude;
			this.lat = pos.coords.latitude;

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
