import { Component, OnInit } from '@angular/core';
import { User } from '../../global/_models/user.model';
import { CategoryService } from '../../global/_services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
