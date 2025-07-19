let API_KEY = "005a2dd124f34e66befd6138830f9800";
let url = "https://newsapi.org/v2/everything";
let searchInput = document.getElementById("searchInput");
let newsContainer=document.getElementById("news-container")
let loading=document.getElementById("loading")
let noData=document.getElementById("noData")




let dispalyNewsData=(data)=>{
    console.log(data)
    let div=document.createElement("div")
    div.classList.add("cart")

    let image=document.createElement("img")
    image.src=data.urlToImage
    image.style.width="100%"
    image.style.height="50%"
    div.appendChild(image)
    newsContainer.appendChild(div)

    let h3=document.createElement("h3")
    h3.innerHTML=data.author
    h3.classList.add("author")
    div.appendChild(h3)


    let p=document.createElement("p")
    p.innerHTML=data.content
    p.classList.add("content")
    div.appendChild(p)


    let a=document.createElement("a")
    a.innerHTML="view more"
    a.href=data.url;
    a.target="_blank"
    div.appendChild(a)


   
}

let allNewsData=(data)=>{
    if(data.length==0){
        newsContainer.innerHTML=noData.innerHTML;

    }else{
       for (let item of data){
         dispalyNewsData(item)

    }
    
}
}

let fetchData = async (search) => {
    try {
        loading.style.display="block"

        let data = await fetch(`${url}?q=${search}&apiKey=${API_KEY}`);
        let jsonData = await data.json();
        loading.style.display="none";
        allNewsData(jsonData.articles)
    } catch (error) {
        console.log(error); 
    }
};

window.onload=() =>{
    fetchData("cinema")
}

searchInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        newsContainer.innerHTML=""
        fetchData(searchInput.value);
        searchInput.value=""

    }
});
