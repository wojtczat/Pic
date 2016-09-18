import { Component } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';
import { DataService } from '../../services/data.service';

@Component({
  templateUrl: 'build/pages/CommentsModal/CommentsModal.html',
  providers: [DataService]
})

export class CommentsModal {

	items: Array<any> = [];
	commentBox: string = "";

	constructor(public viewCtrl: ViewController, private data: DataService) {
		this.data.currentCommentName = viewCtrl.data.name;
		console.log(this.data.currentCommentName);
		this.updateComments();
	}

	private updateComments(e?) {
		this.data.getComments(this.data.currentCommentName, res => {
			console.log(res.json());
			this.items = res.json();

			if (e != null){
				e.complete();
			}
		});
	}

	public closeModal() : void {
		this.viewCtrl.dismiss();
	}

	private itemSelected(s: string){
		console.log(s);
	}

	private addComment() {
		if (this.commentBox.length != 0){
			this.data.submitComment(this.data.currentCommentName, this.commentBox, res => {
				console.log(res);
				this.updateComments();
			});
		}
	}
}
