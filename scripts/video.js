function getTime(time) {
    const hour = parseInt(time / 3600);
    let remainSeconds = time % 3600;
    const minute = parseInt(remainSeconds / 60);
    remainSeconds = remainSeconds % 60;
    return `${hour} hours ${minute} minutes ${remainSeconds} seconds`
}

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch((error) => console.log(error));
}
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch((error) => console.log(error));
}
const loadCategoryVideo = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => displayVideos(data.category))
        .catch((error) => console.log(error));
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = '';
    videos.forEach((video) => {
        console.log(video);
        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
        <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="w-full h-full object-cover"
      alt="Shoes" />
      ${video.others.posted_date?.length === 0 ? '' : `<span class="absolute right-2 -bottom-2 text-white bg-black p-1 rounded">${getTime(video.others.posted_date)}</span>`}
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
        <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
    </div>
    <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex items-center gap-2">
            <p>${video.authors[0].profile_name}</p>
            ${video.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="verified">` : ""}
        </div>
        <p></p>
    </div>
    </div>
  </div>
        `;
        videoContainer.appendChild(card);
    })
}

const displayCategories = (categories) => {

    const categoryContainer = document.getElementById('categories');

    categories.forEach((item) => {
        console.log(item);
        // create a button
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button onclick="loadCategoryVideo(${item.category_id})" class="btn">
        ${item.category}
        </button>
        `;
        // button.classList = 'btn';
        // button.innerText = item.category;

        categoryContainer.appendChild(buttonContainer);
    });
}


loadCategories();
loadVideos();