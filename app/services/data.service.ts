import { Injectable } from '@angular/core';
import {Http, HTTP_PROVIDERS, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation, Camera, Base64ToGallery, File } from 'ionic-native';

@Injectable()
export class DataService {

	constructor(private http: Http) {}

	public query(pos: any, callback: any) : void {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const data = {
        	longitude: pos.coords.longitude,
        	latitude: pos.coords.latitude,
        	time: Date.now()
        }

        this.http.post('http://45.79.169.174/api/query', data, {headers: headers}).subscribe(res => {
        	callback(res);
        });
	}

	public takePicture() : void {
		Camera.getPicture({destinationType: Camera.DestinationType.DATA_URL}).then((imageData) => {

			console.log("Took picture");

			let base64Image = 'data:image/jpeg;base64,' + imageData;

			this.getLocation(pos => {
				this.sendPicture(base64Image, pos);
			});

		}, err => {
			console.log("Could not take picture");
			console.log(err);
		});
	}

	public sendPicture(image: string, pos: any) : void {

		const data = {
			image: image,
			longitude: pos.coords.longitude,
			latitude: pos.coords.latitude,
			time: Date.now()
		}

		console.log("Sending this...");
		console.log(data);

		let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const URL = "http://45.79.169.174/api/save";

    this.http.post(URL, data, {
        headers: headers
    }).subscribe(res => {});
	}

	public getLocation(callback: any) : void {

		console.log("Fetching location...");
		Geolocation.getCurrentPosition().then(pos => {
			console.log("Location found!");
			callback(pos);
		}).catch(reason => {
			console.log("Could not find location!");
			console.log(reason);
		});

	}
}
