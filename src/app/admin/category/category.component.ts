import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../global/_models/category.model';
import { CategoryService } from '../../global/_services/category.service';

@Component({
  moduleId: module.id,
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {
  categories: Array<Category>;
  categories$: any;

  constructor(private cs:CategoryService) { }

  ngOnInit() {
    this.categories$ = this.cs.categoryList$.subscribe(this.bindCategories.bind(this));
  }

  bindCategories(data:any) {
    console.log('binding categories',data);
    this.categories = data
  }

  ngOnDestroy() {
    this.categories$.unsubscribe();
  }

}
