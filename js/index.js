const API = axios.create({
  baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});

dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale("vi");

const elMenu = document.getElementById("menu");
const elArticlesTopStory1 = document.getElementById("articlesTopStory1");
const elArticlesTopStory2 = document.getElementById("articlesTopStory2");
const elEchoHeroBaner = document.getElementById("EchoHeroBaner");
const elLatestNews = document.getElementById("LatestNews");
const elArticlesTrending = document.getElementById("articlesTrending");
const elArticlesTrendingLarge = document.getElementById("articlesTrendingLarge");

//RENDER MENUS

API.get(`categories_news`).then((response) => {
  const data = response.data;
  const categories = data.data;

  let htmlMenu = "";
  let htmlMenuOther = "";
  categories.forEach((item, index) => {
    if (index < 5) {
      htmlMenu += `<li><a href="index.html">${item.name}</a></li>`;
    } else {
      htmlMenuOther += `<li><a href="index.html">${item.name}</a></li>`;
    }
  });
  elMenu.innerHTML =
    htmlMenu +
    `<li class="menu-item echo-has-dropdown">
    <a href="#" class="echo-dropdown-main-element">Danh mục khác</a>
    <ul class="echo-submenu list-unstyled menu-pages">
        ${htmlMenuOther}
    </ul>
</li>`;
});

//RENDER ARTICLES TOP STORY 

API.get(`articles/popular?limit=1`).then((response) => {
  const articles = response.data.data;

  let html = "";
  articles.forEach((item) => {
    html += `
    <div class="echo-story-picture img-transition-scale">
      <a href="#"><img src="${item.thumb}" alt="" class="img-hover"></a>
    </div>
    <div class="echo-story-text">
      <h4><a href="#" class="title-hover">${item.title}</a></h4>
        <div class="echo-trending-post-bottom-icons">
          <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
          <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> ${item.views} Views</a>
       </div>
    </div>`;
  });
  elArticlesTopStory1.innerHTML = html;
});

API.get(`articles/popular?limit=3`).then((response) => {
  const articles = response.data.data;

  let html = "";
  articles.forEach((item) => {
    html += `
    <div class="cover">
      <div class="echo-story-picture img-transition-scale">
        <a href="#"><img src="${item.thumb}" alt="" class="img-hover"></a>
      </div>
      <div class="echo-story-text">
        <h4><a href="#" class="title-hover">${item.title}</a></h4>
        <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
        </div>
    </div>`;
  });
  elArticlesTopStory2.innerHTML = html;
});

//Echo hero baner

API.get(`articles?limit=1`).then((response) => {
  const articles = response.data.data;
 
  let html = "";
  articles.forEach((item) => {
    html += `
    <div>
    <div class="echo-hero-banner-main-img  img-transition-scale">
      <a href="#"><img class="banner-image-one img-hover" src="${item.thumb}" alt=""></a>
    </div>
      <h1 class="echo-hero-title text-capitalize font-weight-bold"><a href="#" class="title-hover">${item.title}</a></h1>
        <hr>
      <p class="echo-hero-discription">${item.content}</p>
    <div class="echo-hero-area-titlepost-post-like-comment-share">
      <div class="echo-hero-area-like-read-comment-share">
        <a href="#"><i class="fa-light fa-clock"></i>${dayjs(item.publish_date).fromNow()} </a>
      </div>
      <div class="echo-hero-area-like-read-comment-share">
        <a href="#"><i class="fa-light fa-eye"></i> ${item.views} Views</a>
      </div>
     
      
    </div>
    </div>`;
  });
  elEchoHeroBaner.innerHTML = html;
});

// LATEST NEWS

API.get(`categories_news/2/articles?limit=8&page=8`).then((response) => {
  const articles = response.data.data;
  console.log(articles);
  let html = '';
  articles.forEach((item) => {
    html += `
    <div class="swiper-slide">
      <div class="echo-latest-news-main-content">
        <div class="echo-latest-news-img img-transition-scale">
          <a href="#">
          <img src="${item.thumb}" alt="Echo" class="img-hover">
          </a>
        </div>
        <div class="echo-latest-news-single-title">
          <h5><a href="#" class="text-capitalize title-hover">${item.title}</a></h5>
        </div>
        <div class="echo-latest-news-time-views">
          <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
          
        </div>
      </div>
    </div>`;
  });
  elLatestNews.innerHTML = html;
});


//TRENDING

API.get(`articles/popular?limit=4`).then((response) => {
  const articles = response.data.data;
  

  let html = '';
  articles.forEach(item => {
    html += `
    <div class="echo-trending-left-site-post">
      <div class="echo-trending-left-site-post-img img-transition-scale">
        <a href="#">
          <img src="${item.thumb}" alt="Echo" class="img-hover">
        </a>
     </div>
     <div class="echo-trending-right-site-post-title">
        <h5><a href="#" class="text-capitalize title-hover">${item.title}</a></h5>
        <div class="echo-trending-post-bottom-icons">
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
            <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> ${item.views} Views</a>
        </div>
    </div>
</div>`;
  });
  elArticlesTrending.innerHTML = html;
});

API.get(`articles/popular?limit=2`).then((response) => {
  const articles = response.data.data;

  let html = '';
  articles.forEach(item => {
    html += `<div class="echo-trending-right-site-post">
    <div class="echo-trending-right-site-post-img img-transition-scale">
        <a href="#">
            <img src="${item.thumb}" alt="Echo" class="img-hover">
        </a>
    </div>
    <div class="echo-trending-right-site-post-title">
        <h4 class="text-capitalize"><a href="#" class="title-hover">${item.title}</a></h4>
    </div>
    <div class="echo-trending-right-site-like-comment-share-icons">
        <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
        </div>
        <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> ${item.views} Views</a>
        </div>
        
    </div>
</div>`;
  });
  elArticlesTrendingLarge.innerHTML = html;
});
