
function settime(time) {
    const hour = parseInt(time / 3600);
    let rimainingsec = time % 3600
    const minute = parseInt(rimainingsec / 60)
    rimainingsec = rimainingsec % 60
    return `${hour} hour ago ${minute} minute ${rimainingsec} second ago`
}
const loadcategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displaycategories(data.categories))
        .catch(err => console.log(err))

}
const loadvideo = (searchText = "") => {
    fetch(
        `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
      )
        .then(res => res.json())
        .then(data => displayvideo(data.videos))
        .catch(err => console.log(err))

}
const removeactiveclass=() =>{
    const buttons=document.getElementsByClassName('category-btn')
    
    for(let btn of buttons){
        btn.classList.remove('active')
    }

}
const loadcategoryvideo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeactiveclass();
            const activBtn =document.getElementById(`btn-${id}`)
            activBtn.classList.add('active')
            displayvideo(data.category)
        })
        .catch(err => console.log(err))

}


const displaycategories = (categories) => {

    const categoryContainer = document.getElementById('categories')

    categories.forEach((item) => {

        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick ="loadcategoryvideo(${item.category_id})" class="btn category-btn">
            ${item.category}
        </button>
        `
        categoryContainer.append(buttonContainer)

    });
}
const loaddatails=async (videoId) => {
    const url =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(url)
    const data =await res.json()
    displaydatails(data.video)
    
}

const displaydatails= (videod)=>{
    console.log(videod);
    const modalContainer =document.getElementById('modal')
    modalContainer.innerHTML=`
    <img src=${videod.thumbnail}/>
    <p> ${videod.description}}</p>`


    document.getElementById('mymodal').showModal()

}


const displayvideo = (videos) => {
    const videoContainer = document.getElementById('video')
    videoContainer.innerHTML = ""

    if (videos.length == 0) {
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
        <div class="min-h-[300] w-full flex flex-col justify-center items-center">
            <img src="asset/Icon.png" alt="">
            <p class="text-center text-2xl font-bold py-4">no content wait update</p>
        </div>  `
    }
    else{
        videoContainer.classList.add("grid")
    }
    videos.forEach(item => {
        const card = document.createElement('div')
        card.classList = "card card-compact"
        card.innerHTML = `
        <figure class="h-[200px] relative">
            <img class="h-full w-full object-cover"
            src=${item.thumbnail}
            alt="Shoes" />
            ${item.others.posted_date?.length == 0
                ? ""
                : `<span class="right-2 bottom-2 absolute text-xs text-white bg-black rounded p-1">${settime(item.others.posted_date)}</span>`

            }
            
        </figure>
        <div class="px-0 py-2 flex gap-2 ">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src=${item.authors[0].profile_picture}>
            </div>
            <div>
                <h2 class="font-bold">${item.title}</h2>
                <div class=" flex items-center gap-2">
                    <p class="text-gray-400">${item.authors[0].profile_name}</p>
                    ${item.authors[0].verified === true ? '<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" >' : ""}
                </div>
                <p><button onclick="loaddatails('${
                   item.video_id

                }')" class="btn btn-sm btn-error "> datails</button></p>
            </div>   
        
            
        </div>
        `
        videoContainer.append(card)
    })

}

document.getElementById('input').addEventListener("keyup", (e)=>{
    loadvideo(e.target.value);

})

loadcategories();
loadvideo();








