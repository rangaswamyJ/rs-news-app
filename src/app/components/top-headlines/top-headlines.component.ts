import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';
import { Article, NewsResponse } from 'src/app/shared/services/news-response';

@Component({
  selector: 'app-top-headlines',
  templateUrl: './top-headlines.component.html',
  styleUrls: ['./top-headlines.component.css']
})
export class TopHeadlinesComponent implements OnInit {
  articles : Article[];
  constructor(private ns:NewsService) {
   }


  ngOnInit() {
    this.loadNews();
  }

  loadNews()
  {
    return this.ns.getTopNews().subscribe((data:NewsResponse)=>{
      this.articles =  data.articles;
    });
  }
}
