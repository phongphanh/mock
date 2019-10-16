import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Article, ArticleDetail } from 'src/app/model/article';
import { ArticleService } from '../article.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editorForm: FormGroup;
  status: string;
  slug: string;
  isLogin: boolean = localStorage.getItem('token') != undefined;

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private router: Router, private formBuilder: FormBuilder, private titleBrown: Title) { }

  ngOnInit() {
    this.titleBrown.setTitle('Editor');

    this.route.paramMap.subscribe((param: ParamMap) => {
      if (param.get('slug') != null) {
        this.slug = param.get('slug');
        this.articleService.articleDetail(this.slug, this.isLogin).subscribe((data: ArticleDetail) => {
          this.createForm(data.article);
          this.status = 'update';
        });
      } else {
        this.createForm(undefined);
        this.status = 'create';
      }
    });
  }

  get editorFormControls() {
    return this.editorForm.controls;
  }

  onSubmit() {
    if (this.editorForm.valid) {
      if (this.status == 'create') {
        this.articleService.createArticle(this.editorForm.value).subscribe((data: ArticleDetail) => {
          this.slug = data.article.slug;
          this.router.navigate(['/article', this.slug]);
        }, (error) => {
          console.log(error);
        });
      } else {
        this.articleService.editArticle(this.editorForm.value, this.slug).subscribe((data: ArticleDetail) => {
          this.slug = data.article.slug;
          this.router.navigate(['/article', this.slug]);
        })
      }
    }
  }

  getTags(listTag: string[]) {
    this.editorForm.controls.tagList.setValue(listTag);
  }

  createForm(article: Article) {
    this.editorForm = this.formBuilder.group({
      title: [article? article.title : '', Validators.required],
      description: [article? article.description : '', Validators.required],
      body: [article? article.body : '', Validators.required],
      tagList: [article? article.tagList : [], isNullArr]
    })
  }
}

function isNullArr(control: AbstractControl): ValidationErrors | null {
  return control.value.length == 0 ? {'isNull': true} : null;
}