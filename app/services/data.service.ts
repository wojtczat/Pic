import { Injectable } from '@angular/core';
import {Http, HTTP_PROVIDERS, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from 'ionic-native';
import { Camera } from 'ionic-native';
import { Base64ToGallery } from 'ionic-native';
import { File } from 'ionic-native';

@Injectable()
export class DataService {
    
    pos: any = {};
    havePos: boolean = false;

	base64Image: string;

	constructor(private http: Http) {
	}

	public getFirstPic(callback: any) : void {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

		this.http.post('http://45.79.169.174/api/gimme', {}, {
			headers: headers
		}).subscribe(res => {
			console.log(res.json()[0]);
			callback(res.json()[0].image);
		});
	}

	public getPicture() {
		Camera.getPicture({destinationType: Camera.DestinationType.DATA_URL}).then((imageData) => {

			this.base64Image = 'data:image/jpeg;base64,' + imageData;

			/*
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
			*/
            
            if (this.havePos){
                var data = {image:this.base64Image,longitude: this.pos.coords.longitude, latitude: this.pos.coords.latitude, time: Date.now()}
                console.log(data);
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                var URL = "http://45.79.169.174/api/save";
                
                this.http.post(URL, data, {
                    headers: headers
                }).subscribe(res => console.log(res));
            }
           
		}, (err) => {

			console.log(err);
			console.log("ERROR IN CAMERA");
		});
	}

	public getLocation(callback: any) {


		console.log("Getting location");
		Geolocation.getCurrentPosition().then(pos => {
			console.log("OK!");
            
            this.havePos = true;
            this.pos = pos;
            
			callback(pos);
		}).catch(reason => {
			console.log("ERROR");
			console.log(reason);
		});
	}
}