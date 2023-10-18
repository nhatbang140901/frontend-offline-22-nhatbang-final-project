const API = axios.create({
    baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});

const elSearchInput1 = document.getElementById("searchInput1");

dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale("vi");

elSearchInput1.addEventListener('keyup', function (e) {
    if(e.key === 'Enter'){
        const keyword = elSearchInput1.value.trim();
        if( keyword){
            window.location.href = `search.html?keyword=${keyword}`;
        }
        else{
            alert('Vui lòng nhập từ khóa cần tìm')
            elSearchInput1.value = '';
        }
    }
    
});