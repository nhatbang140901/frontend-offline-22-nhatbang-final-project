
const elHeroAndStory = document.getElementById("heroAndStory");
const elLatestNews = document.getElementById("LatestNews");
const elArticlesTrending = document.getElementById("articlesTrending");
const elVideo = document.getElementById("video");
const elFeaturedPost1 = document.getElementById("FeaturedPost1");
const elFeaturedPost2 = document.getElementById("FeaturedPost2");
const elFeaturedPost3 = document.getElementById("FeaturedPost3");
const elDiscoverCategories = document.getElementById("discoverCategories");
const elPopularOfTheWeeks = document.getElementById("popularOfTheWeeks");



  //RENDER HERO AND STORY
  API.get(`articles?limit=6`).then((response) => {
    const articles = response.data.data;
    let htmlHero ='';
    let htmlStory1 ='';
    let htmlStory2 ='';
    articles.forEach((item, index) => {
        if( index === 0){
            htmlHero += 
        /* html */
        `<div class="col-xl-8 col-lg-7 col-md-12">
        <div class="echo-hero-baner">
            <div class="echo-hero-banner-main-img  img-transition-scale">
                <a href="post-details.html?id={item.id}"><img class="banner-image-one img-hover" src=" ${item.thumb}" alt="Echo"></a>
            </div>
            <h1 class="echo-hero-title text-capitalize font-weight-bold"><a href="post-details.html?id={item.id}" class="title-hover"> ${item.title}</a></h1>
            <hr>
            <p class="echo-hero-discription"> ${item.description}</p>
            <div class="echo-hero-area-titlepost-post-like-comment-share">
                <div class="echo-hero-area-like-read-comment-share">
                    <a href="#"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
                </div>
            </div>
        </div>
    </div>`
        }

        if( index === 1){
            htmlStory1 += 
        /* html */
        `<div class="echo-top-story first">
        <div class="echo-story-picture img-transition-scale">
            <a href="post-details.html?id={item.id}"><img src=" ${item.thumb}" alt="Echo" class="img-hover"></a>
        </div>
        <div class="echo-story-text">
            <h4><a href="post-details.html?id={item.id}" class="title-hover"> ${item.title}</a></h4>
            <div class="echo-trending-post-bottom-icons">
                <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
            </div>
        </div>
    </div>`
        }

        if( index > 1){
            htmlStory2 += 
        /*html*/
        `<div class="echo-top-story">
        <div class="echo-story-picture img-transition-scale">
            <a href="post-details.html?id={item.id}"><img src=" ${item.thumb}" alt="Echo" class="img-hover"></a>
        </div>
        <div class="echo-story-text">
            <h4><a href="post-details.html?id={item.id}" class=" edit1 title-hover"> ${item.title}</a></h4>
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
        </div>
    </div>`
        }
        
        
    });
    elHeroAndStory.innerHTML = 
    `<div class="row gx-5">
        ${htmlHero}
        <div class="col-xl-4 col-lg-5 col-md-12">
            <div class="echo-home-1-hero-area-top-story">
                <h6>Top Story</h6>
                ${htmlStory1}
                ${htmlStory2}
            </div>
        </div>
    </div>`;
  });

  //RENDER LATEST NEW
  API.get(`categories_news/2/articles?limit=8`).then((response) => {
    const articles = response.data.data;
    console.log(articles);
    let html = '';
    articles.forEach(item => {
      html += 
      /* html */
      `<div class="swiper-slide">
        <div class="echo-latest-news-main-content">
          <div class="echo-latest-news-img img-transition-scale">
            <a href="post-details.html?id={item.id}">
            <img src="${item.thumb}" alt="Echo" class="img-hover">
            </a>
          </div>
          <div class="echo-latest-news-single-title">
            <h5><a href="post-details.html?id={item.id}" class="text-capitalize title-hover edit2">${item.title}</a></h5>
          </div>
          <div class="echo-latest-news-time-views">
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
          </div>
        </div>
      </div>`;
      
    });
    elLatestNews.innerHTML = html;
  });

  //RENDER ARTICLES TRENDING
  API.get(`articles/popular?limit=7`).then((response) => {
    const articles = response.data.data;
    let htmlTrendingLeft ='';
    let htmlTrendingRight ='';
    articles.forEach((item, index) => {
        if( index < 5){
            htmlTrendingLeft += 
        /* html */
        `<div class="echo-trending-left-site-post">
            <div class="echo-trending-left-site-post-img img-transition-scale">
                <a href="post-details.html?id={item.id}">
                    <img src="${item.thumb}" alt="Echo" class="img-hover">
                </a>
            </div>
            <div class="echo-trending-right-site-post-title">
                <h5><a href="post-details.html?id={item.id}" class="text-capitalize title-hover"> ${item.title}</a></h5>
                <div class="echo-trending-post-bottom-icons">
                    <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
                    <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> ${item.views} Views</a>
                </div>
            </div>
        </div>`
        }
        else{
            htmlTrendingRight += 
        /*html*/
        `<div class="echo-trending-right-site-post">
        <div class="echo-trending-right-site-post-img img-transition-scale">
            <a href="post-details.html?id={item.id}">
                <img src="${item.thumb}" alt="Echo" class="img-hover">
            </a>
        </div>
        <div class="echo-trending-right-site-post-title">
            <h4 class="text-capitalize"><a href="post-details.html?id={item.id}" class="title-hover"> ${item.title}</a></h4>
        </div>
        <div class="echo-trending-right-site-like-comment-share-icons">
            <div class="echo-trending-right-like-comment-content">
                <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
            </div>
            <div class="echo-trending-right-like-comment-content">
                <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> ${item.views} Views</a>
            </div>
        </div>
    </div>`
        }
        
        
    });
    elArticlesTrending.innerHTML = 
    `<div class="row gx-6">
        <div class="col-xl-6 col-lg-6 col-md-12">
            ${htmlTrendingLeft}
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12">
            ${htmlTrendingRight}
            <hr class="echo-hr-home-1-tranding">
        </div>
    </div>`;
  });

  //RENDER VIDEO
API.get(`articles/popular?limit=5`).then((response) => {
    const data = response.data;
    const categories = data.data;
    let htmlVideoLeft ='';
    let htmlVideoRight ='';
    categories.forEach((item, index) => {
        if( index < 1){
            htmlVideoLeft += 
        /* html */
        `<div class="echo-video-left-site">
            <a href="post-details.html?id={item.id}"><img src="assets/images/home-1/video-left/item.png" alt="Echo"></a>
            <div class="echo-video-left-site-text-box">
                <h5><a href="post-details.html?id={item.id}" class="title-hover">${item.title}</a></h5>
                <hr>
                <div class="echo-video-left-site-read-views">
                    <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
                    <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> ${item.views} Views</a>
                </div>
            </div>
        </div>`
        }
        else{
            htmlVideoRight += 
        /*html*/
        `<div class="echo-video-right-site-content">
        <div class="echo-video-right-site-content-text">
            <h5 class="text-capitalize"><a href="post-details.html?id={item.id}" class=" title-hover text-white edit1">${item.title}</a>
            </h5>
            <hr>
            <a href="#" class="pe-none text-white"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
        </div>
        <div class="echo-video-right-site-content-video">
            <a href="post-details.html?id={item.id}"><img src="${item.thumb}" alt="Echo"></a>
        </div>
    </div>`
        }
        
        
    });
    elVideo.innerHTML =  
    /*html*/
    `<div class="row gx-6">
        <div class="col-xl-8 col-lg-8 col-md-12">
            ${htmlVideoLeft};
        </div>
        <div class="col-xl-4 col-lg-4 col-md-12">
            <div class="echo-video-area-home-1-right-content-responsive">  
            ${htmlVideoRight}; 
            </div>
        </div>
    </div>`;
 
  });

  //RENDER FEATURED POST
  API.get(`articles?limit=2&limit_case=8&page=7`).then((response) => {
    const data = response.data.data;
    console.log(data);
    let html = '';
  
    data.forEach((item) => {
     
        html += 
      /* html */
      `<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
        <div class="echo-feature-area-post">
            <div class="echo-feature-area-post-img img-transition-scale">
                <a href="post-details.html?id=${item.id}">
                    <img src="${item.thumb}" alt="${item.title}" class="img-hover">
                </a>
            </div>
            <div class="echo-feature-area-post-hins">
                 <h5 class="text-capitalize"><a href="post-details.html?id=${item.id}" class="title-hover">${item.title}</a></h5>
             </div>
             <hr>
            <div class="echo-feature-area-read-view">
                 <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
                 <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
            </div>
         </div>
    </div>`;
      
  
      
    });
    elFeaturedPost1.innerHTML = html;
  });
  
  API.get(`articles/popular?limit=4&limit_case=8`).then(response => {
    const data = response.data.data;
  
    let html ='';
    data.forEach((item, index) => {
      html += 
      /* html */
      `<div class="col-xl-6 col-lg-6 col-md-6">
        <div class="echo-feature-area-option-content">
            <div class="echo-feature-area-option-number">
                <h3>0${index + 1}</h3>
            </div>
            <div class="echo-feature-area-option-content-text">
                <h5 class="text-capitalize"><a href="post-details.html?id=${item.id}" class="title-hover edit2">${item.title}</a>
                </h5>
                <div class="echo-feature-area-option-read-more">
                    <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
                </div>
            </div>
        </div>
    </div>`;
    });
    elFeaturedPost2.innerHTML = html;
  });
  
  API.get(`articles/popular?limit=2&limit_case=8`).then(response => {
    const data = response.data.data;
  
    let html = '';
    data.forEach(item => {
      html += 
      /* html */
      `<div class="col-xl-12">
      <div class="echo-feature-area-last-content">
          <div class="echo-feature-area-last-content-img img-transition-scale">
              <a href="post-details.html?id=${item.id}"> <img src="${item.thumb}" alt="${item.title}" class="img-hover"></a>
          </div>
          <div class="echo-feature-area-last-content-text">
              <h3 class="text-capitalize"><a href="post-details.html?id=${item.id}" class="title-hover">${item.title}</a></h3>
              <div class="echo-feature-area-last-content-read-view">
                  <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()} </a>
              </div>
          </div>
      </div>
  </div>`;
    });
    elFeaturedPost3.innerHTML = html;
  });

  ////RENDER POPULAR
  API.get(`articles/popular?limit=3`).then((response) => {
    const articles = response.data.data;
    console.log(articles);
    let html = '';
    articles.forEach((item) => {
      html += 
      /* html */
      `<div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
        <div class="echo-popular-area-single-item">
            <div class="echo-popular-area-img img-transition-scale">
                <a href="#"><img src="${item.thumb}" alt="Echo" class="img-hover"></a>
            </div>
            <div class="echo-popular-area-item-title">
                <h5 class="text-capitalize"><a href="#" class="title-hover edit2">${item.title}</a></h5>
            </div>
            <div class="echo-popular-area-read-view">
                <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
            </div>
        </div>
    </div>`;
      
    });
    elPopularOfTheWeeks.innerHTML = html;
  });
  

