import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';

@Component({
  templateUrl: 'build/pages/feed/feed.html'
})

export class Feed {

	protected picMetaData: Array<any> = [];

	constructor(public navCtrl: NavController, private data: DataService) {}

	ngOnInit() {
	   this.loadPics(null);
	}

	private loadPics(e ?) : void {
		this.data.getLocation(pos => {
			this.data.query(pos, res => {
				console.log("query finished");
				console.log(res.json());
				this.picMetaData = res.json();

				let i = 0;

				if (this.picMetaData.length == 0 && e != null){
					e.complete();
				}

				this.picMetaData.forEach( p => {
					this.data.get(p.name, r => {
						p.data = r._body;
						i++;

						if (i == this.picMetaData.length && e != null){
						  e.complete();
						}
					});
				});
			})
		})

	}
}
