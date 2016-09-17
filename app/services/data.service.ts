import { Injectable } 					from '@angular/core';
import {Http, HTTP_PROVIDERS, Headers} 	from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation }					from 'ionic-native';
import { Camera } 						from 'ionic-native';
import { Base64ToGallery } 				from 'ionic-native';
import { File } 						from 'ionic-native';

@Injectable()
export class DataService {

	constructor(private http: Http) {}

	public query(pos: any, callback: any) : void {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = {
        	longitude: pos.longitude,
        	latitude: pos.latitude,
        	time: Date.now()
        }

        this.http.post('http://45.79.169.174/api/query', data, {headers: headers}).subscribe(res => {
        	callback(res);
        });

	}

	public getPicture() {
		Camera.getPicture({destinationType: Camera.DestinationType.DATA_URL}).then((imageData) => {

			console.log("Took picture");

			let base64Image = 'data:image/jpeg;base64,' + imageData;

			this.getLocation(pos =>{
				this.sendPicture(base64Image, pos);
			});
           
		}, (err) => {

			console.log("Could not take picture");
			console.log(err);
		});
	}

	public sendPicture(image: string, pos: any){
		let data = {
			image: image,
			longitude: pos.coords.longitude,
			latitude: pos.coords.latitude,
			time: Date.now()
		}

		let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let URL = "http://45.79.169.174/api/save";
        
        this.http.post(URL, data, {
            headers: headers
        }).subscribe(res => {});
	}

	public getLocation(callback: any) {
		console.log("Getting location...");
		Geolocation.getCurrentPosition().then(pos => {
			console.log("Got location!");
			callback(pos);
		}).catch(reason => {
			console.log("Could not get location!");
			console.log(reason);
		});
	}
}