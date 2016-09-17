import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'card',
	templateUrl: 'build/components/card/card.component.html'
})
export class CardComponent implements OnInit {

	myText = "hellofefefefefefef";

	constructor() {}

	ngOnInit() {
		
	}
}