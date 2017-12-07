import { Injectable } from "@angular/core";
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Logger } from './logger.service'
import { Category } from '../_models/category.model';
import * as moment from 'moment'
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

export interface NewCategoryData {
	uid?: String
	,name?: String
	,description?: String
	,photoURL?: String
	,displayName?: String
	,dateCreated?: String
}

@Injectable()

export class CategoryService {
	categoryList$: FirebaseListObservable<any>;
	currentCategory: ReplaySubject<any> = new ReplaySubject(1);

	constructor(private af: AngularFire,private logger:Logger) {
		this.initialize();
	}

	private initialize():void {
		this.categoryList$ = this.af.database.list('/users');
	}


}
