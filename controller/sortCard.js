function sortCards(sortType) {
    let results = document.querySelector('.container').children;
    if (sortType === 'alphabetically') {
     Array.from(results).sort((a, b) => {
       return a.querySelector('.name').innerText.localeCompare(b.querySelector('.name').innerText);
     }).forEach(el => {
       el.parentNode.appendChild(el);
     });
    } else if (sortType === 'by-rating') {
     Array.from(results).sort((a, b) => {
       return b.querySelector('.rating').innerText - a.querySelector('.rating').innerText;
     }).forEach(el => {
       el.parentNode.appendChild(el);
     });
    }
   }
   