import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';
import { CategoryService } from '../../global/_services/category.service';
import { UtilService } from '../../global/_services/utils.service';
import { Category } from '../../global/_models/category.model';

@Component({
  moduleId: module.id,
  selector: 'category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.less']
})
export class CategoryEditorComponent extends CategoryDetailComponent implements OnInit {
  savedCategory: any;
  currentCategory: Category;
  showLinkOptions: Boolean = false;

	constructor(public categoryService:CategoryService,public utils:UtilService, public activatedRoute:ActivatedRoute, public router:Router) {
  	super(categoryService,activatedRoute,router);
	}

	ngOnInit() {
		this.routeParams$ = this.activatedRoute.params.subscribe(params => this.loadCategory(params));
		this.categoryService.currentCategory.subscribe((data:any) => this.currentCategory = data);
	}

	saveCategory() {
		this.category.$key ? this.updateCategory() : this.createCategory();
	}

	cancelEdit() {
		let path:string = '/admin/categories';
		if (this.category.$key) {
			path += '/' + this.category.$key;
		}
		this.router.navigate([path]);
	}

	createCategory() {
		this.savedCategory = this.catSvc.categoryList$.push(this.category);
		this.savedCategory.then(this.openDetail.bind(this));
	}

	updateCategory() {
		this.savedCategory = { key: this.category.$key };
		this.catSvc.getCategory(this.category.$key).set(this.utils.cleanObj(this.category)).then(this.openDetail.bind(this));
	}

	openDetail() {
		this.router.navigate(['../../'+this.savedCategory.key]);
	}

	showLinkButton() {
		return this.currentCategory ? ( this.currentCategory.$key == this.id) : false;
	}

	toggleLinkOptions() {
		this.showLinkOptions = !this.showLinkOptions;
	}

	archiveUser() {
  	// TODO: Archive User
	}

	restoreUser() {
  	// TODO: Restore User
	}

}
