const API = axios.create({
    baseURL: "https://apiforlearning.zendvn.com/api/v2/",
  });
  
  dayjs.extend(window.dayjs_plugin_relativeTime);
  dayjs.locale("vi");

  const elMenu = document.getElementById("mainMenu");
  const elArticles = document.getElementById("articles");
  const elCategoryTitle = document.getElementById("category-title");
  const elTopStory = document.getElementById("TopStory");

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = parseInt(urlParams.get('id'));
  let currentPage = 1;

//let currentPage = parseInt(urlParams.get('page'));

  //RENDER MENUS

API.get(`categories_news`).then((response) => {
    const data = response.data;
    const categories = data.data;
  
    let htmlMenu = '';
    let htmlMenuOther = '';
    categories.forEach((item, index) => {
      
      if (index < 3) {
        htmlMenu += `
        <li class="menu-item">
        <a href="category-style-1.html?id=${item.id}" class="echo-dropdown-main-element active">${item.name}</a>
        </li>`
      }else{
        htmlMenuOther +=  `
        <li class="nav-item">
        <a href="category-style-1.html?id=${item.id}">${item.name}</a>
        </li>`
      }
      
    });
  
    elMenu.innerHTML =  `
      ${htmlMenu}
      <li class="menu-item echo-has-dropdown" >
        <a href="#" class="echo-dropdown-main-element">Danh mục khác</a>
        <ul class="echo-submenu list-unstyled menu-pages">
          ${htmlMenuOther}
        </ul>
      </li>`;
});



getArticles();

function getArticles(page = 1) {
    API.get(`categories_news/${id}/articles?limit=5&page=${page}`).then((response) => {
        const articles = response.data.data;
        let categoryName ='';
       
        let html ='';
        articles.forEach(item => {
            const thumb = item.thumb;
            const title = item.title;
            const publishDate = dayjs(item.publish_date).fromNow();
            const description = item.description;
            categoryName = item.category.name;
    
            html += `
            <div class="echo-inner-img-ct-1  img-transition-scale">
            <a href="post-details.html?id=${item.id}"><img src="${thumb}" class="echo-ct-style-1-banner-images" alt="Echo"></a>
        </div>
        <div class="echo-hero-baner-text-heading-info-ct-1">
            <h2 class="echo-hero-title text-capitalize font-weight-bold"><a href="post-details.html?id=${item.id}" class="title-hover">${title}</a></h2>
            <div class="echo-hero-area-titlepost-post-like-comment-share">
                <div class="echo-hero-area-like-read-comment-share">
                <a href="post-details.html?id=${item.id}"><i class="fa-light fa-clock"></i> ${publishDate}</a>
                </div>
                <div class="echo-hero-area-like-read-comment-share">
                <a href="post-details.html?id=${item.id}"><i class="fa-light fa-arrow-up-from-bracket"></i> 3.5k Share</a>
                </div>
            </div>
            <hr>
            <p class="echo-hero-discription">${description}</p>
        </div>`;
        });

        

        elCategoryTitle.innerHTML = categoryName;
        elArticles.innerHTML += html;
        elBtnLoadMore.innerText ='Show More';
        elBtnLoadMore.disabled = false;
    });
};
  
API.get(`articles/popular?limit=4`).then((response) => {
    const data = response.data.data;

    let html = '';
    data.forEach(item => {
        html += `
        <div class="echo-top-story">
            <div class="echo-story-picture img-transition-scale">
                <a href="post-details.html?id=${item.id}"><img src="${item.thumb}" alt="${item.title}" class="img-hover"></a>
            </div>
            <div class="echo-story-text">
                 <h6><a href="post-details.html?id=${item.id}" class="edit title-hover"><p class="edit title-hover "><b>${item.title}</b></p></a></h6>
                 <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
            </div>
        </div>`;
       

    });
    elTopStory.innerHTML = html;
});