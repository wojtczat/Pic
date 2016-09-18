import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { ImagePicker } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/upload/upload.html'
})

export class Upload {

    public doCamera() : void {
		    this.data.takePicture()
	  }

   /* ngOnInit() {
      this.doCamera();
    }*/
    
    public doGallery () : void {
            this.data.getImage()
    }

	constructor(public navCtrl: NavController, private data: DataService) {}
}
