import { Injectable } from "@angular/core";
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Logger } from './logger.service'
import { Category } from '../_models/category.model';
import * as moment from 'moment'
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

export interface NewCategoryData {
	key?: String
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
	getCategory(categoryId:String):any {
		let path = '/users/'+categoryId;
		return this.af.database.object(path);
	}

	loadCurrentCategory(authData:any) {
		this.getCategory(authData.uid).subscribe((catData:any) => {
			this.logger.log('set currentCategory',catData);
			this.currentCategory.next(catData)
		});
		return this.currentCategory
	}

	makeProviderObj(providerData:Array<any>) {
		let ret = {};
		for (let item of providerData) {
			ret[item.providerId.replace('.com','')] = item.uid;
		}
		console.log('makeProviderObj',ret);
		return ret;
	}

	setUserAccount(authData:any) {
		this.logger.log('set account',authData);

		let providerData = authData.auth.providerData; //[0];

		let catData:any = {
			uid: authData.uid
			,email: authData.auth.email
			//,providerId: providerData.providerId
			,lastLogin: moment().format()
			//,providerUid: providerData.uid
			,providers: this.makeProviderObj(authData.auth.providerData)
			,photoURL: authData.auth.photoURL || 'http://simpleicon.com/wp-content/uploads/user1.png'
			,displayName: authData.auth.displayName
		};

		/* Ended up not needing this, but it's handy to know...
		let providerMap:any = {
			'2': 'facebook'
			,'3': 'google'
			,'4': 'firebase'
		};*/


		if (authData.auth.firstName) catData.firstName = authData.auth.firstName;
		if (authData.auth.lastName) catData.lastName = authData.auth.lastName;

		let cat = this.getCategory(catData.uid);

		let cat$ = cat.subscribe((category:any) => {
			this.logger.log('cat exists?',category.$exists(),cat);
			if (!category.$exists() || !category.dateCreated) {
				this.logger.log('add dateCreated',moment().format());
				catData.dateCreated = moment().format();
				cat.set(catData);
			}
			cat$.unsubscribe();
		});

		return cat.update(catData);

	}

}
