import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';

@Component({
  templateUrl: 'build/pages/feed/feed.html'
})

export class Feed {

	protected loadedPics: Array<any> = [];

	protected pictureContent: Array<any> = [];

	constructor(public navCtrl: NavController, private data: DataService) {}

	ngOnInit() {
	this.loadPics(null);
	}

	private loadPics(e ?) : void {
		this.data.getLocation(pos => {
			this.data.query(pos, res => {
				console.log("query finished");
				console.log(res.json());
				this.loadedPics = res.json();

				this.pictureContent = new Array<any>(this.loadedPics.length);

				let i = 0;

				if (this.pictureContent.length == 0 && e != null){
					e.complete();
				}

				this.loadedPics.forEach( p => {
					this.data.get(p.name, r => {
						this.pictureContent[this.loadedPics.indexOf(p)] = r._body;
						i++;

						if (i == this.loadedPics.length && e != null){
						  e.complete();
						}
					});
				});
			})
		})

	}
}
