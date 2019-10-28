import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { Profile, ProfileRes } from 'src/app/model/profile';
import { ArticleService } from 'src/app/editor/article.service';
import { Articles } from 'src/app/model/articles';
import { Article } from 'src/app/model/article';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username;
  user: ProfileRes;
  lists: Article[];
  pagination = [];
  articlesCount: number;
  limit = '5';
  offsetIndex = 0;
  currentPage = 0;
  itemOfPage: number = Number(this.limit);
  paramUser: string;
  currentTab = '';
  curUserName: string = localStorage.getItem('userName');
  isSubmit = false;
  isLogin: boolean = localStorage.getItem('token') !== null;
  loading = true;
  showPagination = true;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private articleService: ArticleService,
    private titleBrown: Title,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.username = this.route.paramMap.subscribe((data: ParamMap) => {
      this.titleBrown.setTitle(data.get('username'));
      this.paramUser = data.get('username').replace('@', '');
      this.profileService.getProfile(this.paramUser).subscribe((res: ProfileRes) => {
        this.user = res;
      }, (error) => {
        this.router.navigate(['/']);
      });
      this.myArticle();
    });

    this.authService.loginEmit.subscribe((res: string) => {
      this.isLogin = res !== '';
    });
  }

  myArticle() {
    this.articleService.getArticleWithOtherUser(this.paramUser, this.limit, this.offsetIndex).subscribe((data: Articles) => {
      this.getDataPerPage(data);
      this.setPage();
    });
  }

  favoritedArticle() {
    this.articleService.getFavoritedArticles(this.paramUser, this.limit, this.offsetIndex).subscribe((data: Articles) => {
      this.getDataPerPage(data);
      this.setPage();
    });
  }

  getDataPerPage(data) {
    this.lists = data.articles;
    this.articlesCount = data.articlesCount;
    this.loading = false;
    this.showPagination = true;
  }

  setPage() {
    this.pagination = [];
    if (Math.ceil(this.articlesCount / Number(this.limit)) !== 1) {
      for (let i = 0; i < Math.ceil(this.articlesCount / Number(this.limit)); i++) {
        this.pagination.push(i);
      }
    }
  }

  changePage(event) {
    this.currentPage = event[1];
    this.offsetIndex = event[0];
    this.loading = true;
    if (this.currentTab === '') {
      this.articleService.getArticleWithOtherUser(this.paramUser, this.offsetIndex, this.offsetIndex).subscribe((item: Articles) => {
        this.getDataPerPage(item);
      });
    } else {
      this.articleService.getFavoritedArticles(this.paramUser, this.limit, this.offsetIndex).subscribe((data: Articles) => {
        this.getDataPerPage(data);
      });
    }
  }

  changeTab(tab: string) {
    this.showPagination = false;
    this.loading = true;
    this.currentTab = tab;
    if (tab === '') {
      this.myArticle();
    } else if (tab === 'favorites') {
      this.favoritedArticle();
    }
  }

  followAuthor(isFollow) {
    if (this.isLogin) {
      this.isSubmit = true;
      if (isFollow) {
        this.profileService.unFollowAuthor(this.paramUser).subscribe((data: ProfileRes) => {
          this.user = data;
          this.isSubmit = false;
        });
      } else {
        this.profileService.followAuthor(this.paramUser).subscribe((data: ProfileRes) => {
          this.user = data;
          this.isSubmit = false;
        });
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
