
const elCategoryName = document.getElementById("categoryName");
const elArticlesContent = document.getElementById("articleContent");
const elPublishDate = document.getElementById("publishDate");
const elArticleTitle = document.getElementById("articleTitle");
const elArticleThumb = document.getElementById("articlethumb");
const elTopStory = document.getElementById("TopStory");

let RENCENT_POSTS = JSON.parse(localStorage.getItem('RENCENT_POSTS')) || [];
console.log(RENCENT_POSTS);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));


API.get(`articles/${id}`).then((response) => {
const articles = response.data.data;
console.log(articles);
elCategoryName.innerText = articles.category.name;
elPublishDate.innerText = articles.publish_date;
elArticleTitle.innerText = articles.title;
elArticlesContent.innerHTML = articles.content;
elArticleThumb.src = articles.thumb;
/* if( !RENCENT_POSTS.includes(id)){
  if
  RENCENT_POSTS.push(id);
  localStorage.setItem('RENCENT_POSTS', JSON.stringify(RENCENT_POSTS));
} */
})
.catch(function (error) {
  window.location.href = 'index.html'; 
});

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
