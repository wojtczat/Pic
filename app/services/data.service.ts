import { Injectable } from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from 'ionic-native';
import { Camera } from 'ionic-native';
import { Base64ToGallery } from 'ionic-native';
import { File } from 'ionic-native';

@Injectable()
export class DataService {

	constructor(private http: Http) {

		//http.get('http://www.google.ca').subscribe(res => console.log(res));
	}

	public getPicture() {
		Camera.getPicture({}).then((imageData) => {

			let base64Image = 'data:image/jpeg;base64,' + imageData;
			console.log(base64Image);
			console.log("CAMERA OK");

			File.readAsText(imageData).then(res =>{

				Base64ToGallery.base64ToGallery(res, 'img_').then(
				res => {
					console.log('Saved image to gallery');
					console.log(res);
				},
				err => console.log('Error saving image to gallery ', err)
			);
			});

			

		}, (err) => {

			console.log(err);
			console.log("ERROR IN CAMERA");
		});
	}

	public getLocation(callback: any) {


		console.log("Getting location");
		Geolocation.getCurrentPosition().then(pos => {
			console.log("OK!");
			callback(pos);
		}).catch(reason => {
			console.log("ERROR");
			console.log(reason);
		});
	}
}