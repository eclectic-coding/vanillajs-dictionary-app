const wordSelector = document.querySelector('#word')
const getWord = (word) => {
  fetch(`https://wordsapiv1.p.rapidapi.com/words/hatchback/${word}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "eb6bbb0083msh556615179cda3c6p16e09ajsn4509bd1f13fe"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const searchedWord = data.word
      console.log(searchedWord)
      wordSelector.textContent = data.word
    })
    .catch(err => {
      console.log(err);
    });
}
getWord('hatchback')

