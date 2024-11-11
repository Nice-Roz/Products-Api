const BASE_URL = 'https://product.wamasolution.com'

const productList = document.getElementById('product-list');
// https://product.wamasolution.com/api/products

let page_num = 1;
let page_size = 4;
let order_by = 'id';
let order_direction='desc';
let search_query = '';
async function fetchProducts(page_num, page_size,order_by,order_direction,search_query){
    try{
       const response=await fetch(`${BASE_URL}/api/products?page_num=${page_num}&page_size=${page_size}&order_by=${order_by}&order_direction=${order_direction}&search_query=${search_query}`);
// console.log(response)
       const {data, current_page, from, to, last_page} = await response.json();
      displayProduct(data);
// console.log('Data', data)
      displayPagination(current_page, from, to, last_page );
    }catch(error){
        console.log('Error',error);
    }
}

function displayProduct(products){
    productList.innerHTML = '';
    products?.forEach(item=>{
        productList.innerHTML += `
        <div class="product">
        <img src="${BASE_URL}/${item?.image}"/>
        <div class="content">
        <h3>Name : ${item?.name}</h3>
        <p>Description : ${item?.description}</p>
        <p>Price: ${item?.price} - <del> ${+item?.price + +item?.discount}</del> </p>
        <p>Quantity : ${item?.quantity}</p>
        
        </div>
        <button class="btn-trash">Delete</button>
        </div>
        `
    })
}

function displayPagination(current_page, from , to , last_page){
    const pagination= document.getElementById('pagination')
    pagination.innerHTML='';
    pagination.innerHTML=`
    <button onclick="prevPage()" ${current_page===1 && 'disabled'}> Prev</button>
    <span>${from}-${to}</span>
    <button onclick="nextPage()" ${current_page === last_page && 'disabled'}>Next</button>`
}

function prevPage(){
    page_num--;
    fetchProducts(page_num,page_size,order_by,order_direction,search_query);
}
function nextPage(){
    page_num++;
    fetchProducts(page_num,page_size,order_by,order_direction,search_query);
}
function changePager(value){
    page_size=value;
    fetchProducts(page_num,page_size,order_by,order_direction,search_query);
}
function orderBy(value){
    order_by=value;
    fetchProducts(page_num,page_size,order_by,order_direction,search_query);
}
function orderDirection(value){
    order_direction=value;
    fetchProducts(page_num,page_size,order_by,order_direction,search_query);
}
function search(value,event){
    if(event.key=== 'Enter'){
        event.preventDefault();
        search_query = value.trim();
        fetchProducts(page_num,page_size,order_by,order_direction,search_query);
    }

    // search_query = value;
    // fetchProducts(page_num,page_size,order_by,order_direction,search_query);
}

fetchProducts(page_num,page_size,order_by,order_direction,search_query);