import { Component } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/CommentsModal/CommentsModal.html'
})

export class CommentsModal {

	constructor(public viewCtrl: ViewController) { }

  public closeModal() : void {
    this.viewCtrl.dismiss();
  }

}
