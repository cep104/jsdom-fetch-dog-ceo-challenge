let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
  loadImages();
  loadBreedOptions();
});

function loadImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
    .then(res=> res.json())
    .then(results => {
      results.message.forEach(image => addImage(image))
    });
}

function addImage(dogPicUrl) {
  let container = document.querySelector('#dog-image-container');
  let newImageEl = document.createElement('img');
  newImageEl.src = dogPicUrl;
  container.appendChild(newImageEl);
}

function loadBreedOptions() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
    .then(res => res.json())
    .then(results => {

      breeds = Object.keys(results.message);
      updateBreedList(breeds);
      addBreedSelectListener();
      
    });
}

function updateBreedList(breeds) {
    debugger
  let ul = document.querySelector('#dog-breeds');
  removeChildren(ul); 
//   when it runs through again after you select a letter it deletes all the dog breeds
//   then repopulates it with the new list of dog breeds based on the letter selected
  breeds.forEach(breed => {
      
      addBreed(breed)
    });
}

function removeChildren(ul) {
  let child = ul.lastElementChild;
//   element is the ul 
console.log(child)
  while (child) { 
    // #deletes items while there are still items in the list
    ul.removeChild(child);
    // goes and delets all child elements of ul(list items)
    child = ul.lastElementChild;
    // child equals the next element so the while loop will go till there are no more child elements
  }
}

function selectBreedsStartingWith(letter) {
  updateBreedList(breeds.filter(breed =>  breed.startsWith(letter)));
}

function addBreedSelectListener() {
  let breedDropdown = document.querySelector('#breed-dropdown');
  breedDropdown.addEventListener('change', function (event) {
    selectBreedsStartingWith(event.target.value);
    
  });
}

function addBreed(breed) {
  let ul = document.querySelector('#dog-breeds');
  let li = document.createElement('li');
  li.innerText = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);
  li.addEventListener('click', updateColor);
}

function updateColor(event) {
  event.target.style.color = 'palevioletred';
}

