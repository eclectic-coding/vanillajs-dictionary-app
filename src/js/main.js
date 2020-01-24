let valueEntered = document.querySelector('input[name="search-term"]')
const wordSelector = document.querySelector('#word')
const wordDefinition = document.querySelector('#definition')
const wordPronunciation = document.querySelector('#pronunciation')
const typeTags = document.querySelector('#type-tags')

function loadWord() {
  getWord('cat')
}

// Global Fetch API function
async function fetchData(word, term) {
  let response = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/${term}`, {
    'method': 'GET',
    'headers': {
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': 'eb6bbb0083msh556615179cda3c6p16e09ajsn4509bd1f13fe'
    }
  })
  let data = await response.json()
  return data
}

// Search form Event Listener
function captureValue(event) {
  if (event.key !== 'Enter') return
  getWord(this.value)
  valueEntered.value = ''
}
valueEntered.addEventListener('keydown', captureValue, false)

const getTypes = (word) => {
  fetchData(word, 'hasTypes')
    .then(data => {
      const tagType = data.hasTypes
      // TODO - after, live, add link
      typeTags.innerHTML = tagType.slice(0, 4).map(tag => {
        return '<div class="tag is-info is-light has-margin-5" role="listitem">' + tag + '</div>'
      }).join('')
    })
}

const getWord = (word) => {
  fetchData(word, '')
    .then(data => {
      console.log(data)
      const searchedWord = data.word
      console.log(searchedWord)
      wordSelector.textContent = data.word
      wordDefinition.textContent = data.results[1].definition
      wordPronunciation.textContent = data.pronunciation.all
    })
    .catch(err => {
      console.log(err)
    })
  getTypes(word)
  getDefinitions(word)
}

const getDefinitions = (word) => {
    fetchData(word, 'definitions')
      .then(data => console.log(data))
}






