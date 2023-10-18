const elMenu = document.getElementById("mainMenu");

//RENDER MENUS
API.get(`categories_news`).then((response) => {
    const data = response.data;
    const categories = data.data;
    let htmlMenu ='';
    let htmlMenuOther ='';
    categories.forEach((item, index) => {
        if( index < 3){
            htmlMenu += 
        /* html */
        `<li class="menu-item">
        <a href="category-style.html?id=${item.id}" class="echo-dropdown-main-element active">${item.name}</a>
        </li>`
        }
        else{
            htmlMenuOther += 
        /*html*/
        `<li class="nav-item">
            <a href="category-style.html?id=${item.id}">${item.name}</a>
        </li>`
        }
        
        
    });
    elMenu.innerHTML = htmlMenu + 
    /*html*/
    `<li class="menu-item echo-has-dropdown">
        <a href="#" class="echo-dropdown-main-element">Danh mục khác </a>
        <ul class="echo-submenu list-unstyled menu-pages">
            ${htmlMenuOther};                                        
        </ul>
    </li>`;
 
  });