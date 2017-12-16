import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2';
import { Category } from '../../global/_models/category.model';
import { CategoryService } from '../../global/_services/category.service';
import {Subscription} from "rxjs";

@Component({
  moduleId: module.id,
  selector: 'category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.less']
})
export class CategoryDetailComponent implements OnInit {
	category: Category;
	id: String;
	category$: FirebaseObjectObservable<any>;
	routeParams$: Subscription;


	constructor(public catSvc:CategoryService, public activatedRoute:ActivatedRoute, public router:Router) {	}

	ngOnInit() {
		// Pass the routeParams data over to loadUser()
		this.routeParams$ = this.activatedRoute.params.subscribe(params => this.loadCategory(params));
	}

	loadCategory(params:any) {
		this.category = undefined; // Start out setting this.user to undefined so that the directive content disappears
		if (params['id'] && params['id'] != 'create') {  // Add the && != 'create" to catch just in case this is picked up with a activatedRoute param of 'create'
			this.id = params['id'];
			this.category$ = this.catSvc.getCategory(this.id);  // Get the FirebaseObjectObservable reference here
			this.category$.subscribe(this.popCategory.bind(this));  // Pass the user data to popUser.  Add .bind(this) to refer to the proper function scope
		} else {

			// TODO: Figure out the proper way to do this - I think you're suppose to implement a Class that implements the Interface
			this.category = {name:'',description:'',displayName:''}; // Make a new cateory
		}
	}

	editUser() {
		this.router.navigate(['../edit/'+this.category.$key],{relativeTo:this.activatedRoute});
	}

	popCategory(catData:any) {
		this.category = catData;
	}

	allowEdit() {
		let canEdit = false;

		if (1 == 1) {  // TODO: Switch this to use if (isAdmin or uid = currentUser.uid)
			canEdit = true;
		}

		return canEdit;
	}

	ngOnDestroy() {
		if (this.routeParams$) {
			this.routeParams$.unsubscribe();
		}
	}
}
