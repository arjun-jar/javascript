const auth="563492ad6f91700001000001acf5001c38ac4ecfb49b6e23443db1dd"
const gallery=document.querySelector(".gallery");
const searchInput=document.querySelector(".search");
const submitButton=document.querySelector(".submit-button");
const searchForm=document.querySelector(".search-form");
const moreButton=document.querySelector(".more");

let currentSearch;
let searchValue;
let page=1;

//adding eventListner
searchInput.addEventListener("input",(e)=>{
e.preventDefault()
 searchValue=e.target.value

})
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    currentSearch=searchValue
    searchCurated(searchValue)
}) 
moreButton.addEventListener("click",()=>{
    console.log("clicking...")
    changeFetchLink()

}) 

async function  fetchURL(url){
    const curatedImages= await fetch(url,
    {
    method:"GET",
    headers:{Accept:"application/json",
            Authorization:auth 
    }})
return curatedImages.json();
}
function generatePictures(images){
console.log(images)
    images.photos.forEach(image=>{
        const photo=document.createElement("div")
        photo.innerHTML=`<div class="image-gallery"><button class="img-btn"><a href=${image.src.original}>download</a></button><p> Photographer : ${image.photographer}</p></div><img src=${image.src.large}/> `
        photo.classList.add="gallery"
        gallery.appendChild(photo)
    })
}
async function  curated(){
let fetchLink=`https://api.pexels.com/v1/curated?per_page=20&page=${page}`
const images= await fetchURL(fetchLink)
generatePictures(images)
}
function clear(){
    gallery.innerHTML=""
    searchInput.value=""
}
async function  searchCurated(query){
clear()
fetchLink=`https://api.pexels.com/v1/search?query=${query}&per_page=20&page=${page}`
const images= await fetchURL(fetchLink)
 generatePictures(images)

}
async function changeFetchLink(){
page++
 if(currentSearch){
    fetchLink=`https://api.pexels.com/v1/search?query=${currentSearch}&per_page=20&page=${page}`
 }
 else{
    fetchLink=`https://api.pexels.com/v1/curated?per_page=20&page=${page}`
 }
 const images= await fetchURL(fetchLink)
 generatePictures(images)
}

curated()
