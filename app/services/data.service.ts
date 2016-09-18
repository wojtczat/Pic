import { Injectable } from '@angular/core';
import {Http, HTTP_PROVIDERS, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation, Camera, Base64ToGallery, File } from 'ionic-native';

@Injectable()
export class DataService {

	pos: any = {
		coords: {
			longitude: 0,
			latitude: 0
		}
	};

	constructor(private http: Http) {
		

		console.log("Data service");

		setTimeout(()=>{
			console.log("Fetching location...");
			Geolocation.getCurrentPosition().then(pos => {
				this.pos = pos;
			}).catch(reason => {
				console.log("Could not find location!");
				console.log(reason);
			});
		}, 0);

		setInterval(()=>{

			console.log("Fetching location...");
			Geolocation.getCurrentPosition().then(pos => {
				this.pos = pos;
			}).catch(reason => {
				console.log("Could not find location!");
				console.log(reason);
			});

		}, 1000*60);
	}

	ngOnInit() {
	}

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

	public get(name: string, callback: any) : void {

		this.http.get("http://45.79.169.174/" + name).subscribe(res => {
			callback(res);
		});
	}

	public takePicture() : void {
		Camera.getPicture({	destinationType: Camera.DestinationType.DATA_URL,
							allowEdit: true,
							quality: 50,
							correctOrientation: true,
							mediaType: Camera.MediaType.ALLMEDIA})
							.then((imageData) => {

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

		callback(this.pos);
	}
}
