import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommentComponent } from '../../components/comment/comment.component';

@Component({
  templateUrl: 'build/pages/settings/settings.html',
  directives: [CommentComponent]
})

export class SettingsComponent {

  constructor(public navCtrl: NavController) {}

}
