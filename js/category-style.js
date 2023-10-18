
const elArticles = document.getElementById("articles");
const elCategoryTitle = document.getElementById("categoryTitle");
const elBtnLoadMore = document.getElementById("BtnLoadMore");
const elMyPagination = document.getElementById("myPagination");
const elTopStory = document.getElementById("TopStory");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));
let currentPage = parseInt(urlParams.get('page'));
if( isNaN( currentPage)) currentPage = 1;

  getArticles(currentPage);

  elBtnLoadMore.addEventListener('click', function() {
    currentPage++;
    elBtnLoadMore.innerText = 'Đang tải thêm...';
    elBtnLoadMore.disabled = true;
    getArticles(currentPage);
  });

  //delegate
  elMyPagination.addEventListener('click', function (e) {
    const el = e.target;
    if(el.classList.contains('page-item')){
        currentPage = parseInt(el.innerText);
        getArticles(currentPage);
        addOrUpdateUrlParameter('page', currentPage)
    };

    if(el.classList.contains('page-item-prev')){
        currentPage --;
        getArticles(currentPage);
        addOrUpdateUrlParameter('page', currentPage)

    }

    if(el.classList.contains('page-item-next')){
        currentPage ++;
        getArticles(currentPage);
        addOrUpdateUrlParameter('page', currentPage)
    }
  })
  
  function addOrUpdateUrlParameter(key, value) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.set('page', currentPage);
    const newUrl = window.location.pathname + '?' + urlParams.toString();
    history.pushState(null, "", newUrl);
    
  }

  function getArticles(page = 1) {
      API.get(`categories_news/${id}/articles?limit=5&page=${page}`).then((response) => {
          const articles = response.data.data;
          let categoryName ='';
          const totalPages = response.data.meta.last_page
         
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
          elArticles.innerHTML = html;
          elBtnLoadMore.innerText ='Xem thêm';
          elBtnLoadMore.disabled = false;
          renderPagination(totalPages);
      })
      .catch(function (error) {
        window.location.href = 'index.html'; 
      });
    
  };
  function renderPagination(total){
    const disabledPrev = currentPage === 1 ? '.pointer-events-none' : '';
    let html = `<a href="#" class"prev page-item-prev ${disabledPrev}">Trở về </a>`;
    for (let index = 1; index <= total; index++) {
        const actived = index === currentPage ? 'actived pointer-events-none' : '';
        html += `<a href="#" class="page-item ${actived}">${index} </a>`;
        
    }
    const disabledNext = currentPage === total ? '.pointer-events-none' : '';
    html += `<a href="#" class"next page-item-next ${disabledNext}"> Tiếp tục</a>`;
    elMyPagination.innerHTML = html;
  }

  //RENDER STORY
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