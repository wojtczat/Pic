import { Injectable } from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/add/operator/map';

import {Geolocation} from 'ionic-native';
import { Camera } from 'ionic-native';

@Injectable()
export class DataService {

	constructor(private http: Http) {

		//http.get('http://www.google.ca').subscribe(res => console.log(res));
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