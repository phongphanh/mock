import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Article, ArticleDetail } from 'src/app/model/article';
import { ArticleService } from '../article.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editorForm: FormGroup;

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      if (param.get('slug') != null) {
        this.articleService.articleDetail(param.get('slug')).subscribe((data: ArticleDetail) => {
          this.createForm(data.article);
        });
      } else {
        this.createForm(undefined);
      }
    });
  }

  get editorFormControls() {
    return this.editorForm.controls;
  }

  onSubmit() {
    if (this.editorForm.valid) {
      this.articleService.createArticle(this.editorForm.value).subscribe((data: ArticleDetail) => {
        this.router.navigate(['article', data.article.slug]);
      }, (error) => {
        console.log(error);
      });
    }
  }

  getTags(listTag: string[]) {
    console.log(listTag);
    this.editorForm.controls.tagList.setValue(listTag);
  }

  createForm(article: Article) {
    this.editorForm = this.formBuilder.group({
      title: [article? article.title : '', Validators.required],
      description: [article? article.description : '', Validators.required],
      body: [article? article.body : '', Validators.required],
      tagList: [article? article.tagList : [], Validators.required]
    })
  }
}
