import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../services/data.service';

@Component({
  templateUrl: 'build/pages/upload/upload.html'
})
export class Upload {
    
    doCamera(){
		this.data.takePicture()	
	}

	constructor(public navCtrl: NavController, private data: DataService) {}
}
