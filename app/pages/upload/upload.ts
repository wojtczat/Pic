import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';

@Component({
  templateUrl: 'build/pages/upload/upload.html'
})

export class Upload {

    public doCamera() : void {
		    this.data.takePicture()
	  }

    ngOnInit() {
      this.doCamera();
    }

	constructor(public navCtrl: NavController, private data: DataService) {}
}
