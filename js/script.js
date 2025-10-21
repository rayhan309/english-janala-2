const createElements = arr => {
    const ar = arr.map((el) => `<span class="btn text-gray-500 bg-gray-100">${el}</span>`);
    return ar.join(" ");
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const unHidden = spinner => {
    if (spinner == true) {
        document.getElementById('loadings').classList.remove("hidden")
        document.getElementById('card-container').classList.add("hidden")
    }
    else{
        document.getElementById('loadings').classList.add("hidden")
        document.getElementById('card-container').classList.remove("hidden")  
    }
}

const loadLevels = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displyLevels(data.data)
    })
}
// {
//     "id": 3,
//     "level": 2,
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস"
// }
const lessons = (id) => {
    unHidden(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const btn = document.getElementById(`lesson-btn-${id}`)
        const btns = document.querySelectorAll(".btns")
        btns.forEach(element => {
            element.classList.remove("active")
        });
        btn.classList.add("active")
        displyShow(data.data)
    })
}
const wordDetailes = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displywordDitailes(data.data)
    })
}
// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }
const displywordDitailes = (word) => {
    const container = document.getElementById('modal-container')
    container.innerHTML = `
      <div class="space-y-3">
        <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
        <p class="text-xl font-semibold">Meaning</p>
        <p class="text-xl font-medium">${word.meaning}</p>
      </div>
      <div class="mt-4 space-y-3">
        <p class="text-xl font-semibold">Example</p>
        <p class="text-xl font-medium">${word.sentence}</p>
      </div>
      <div class="mt-4 space-y-3">
        <p class="text-xl font-medium">Synonyms</p>
        <div class="">${createElements(word.synonyms)}</div>
      </div>`
    document.getElementById('my_modal_5').showModal()
}
const displyShow = words => {
    const container = document.getElementById('card-container')
    container.innerHTML = ""
    if (words.length === 0) {
        container.innerHTML = 
        `<div class="space-y-5 my-10 col-span-full"> 
            <img src="./assets/alert-error.png" alt="" class="mx-auto">
            <p class="text-lg text-center font-normal text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h3 class="text-[38px] text-center font-medium text-[#292524]">নেক্সট Lesson এ যান</h3>
        </div>`
        unHidden(false)
        return;
    }
    words.forEach(word => {
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
        <div class="text-center space-y-5 pt-10 pb-1 px-10 rounded-xl bg-white h-full">
            <h2 class="text-3xl font-bold text-[#000000]">${word.word ? word.word : "শব্দ খুজে পাওয়া যায়নি"}</h2>
            <p class="text-xl font-medium text-[#000000]">Meaning /Pronounciation</p>
            <p class="text-3xl text-[#2c2c2c] font-semibold">"${word.meaning ? word.word : "অর্থ খুজে পাওয়া যায়নি"} / ${word.pronunciation}"</p>
            <div class="flex justify-between items-center mt-10 mb-7">
              <button onclick="wordDetailes(${word.id})" class="btn bg-[#1A91FF10]"><i class="fa-solid fa-circle-question"></i></button>
              <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        container.appendChild(cardDiv)
    })
    unHidden(false)
}
const displyLevels = levels => {
    const container = document.getElementById('btn-container')
    container.innerHTML = '';
    levels.forEach(element => {
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
        <button id="lesson-btn-${element.level_no}" onclick="lessons(${element.level_no})" class="btns btn btn-outline btn-primary"><i class="fa-solid fa-book-open-reader"></i> Lesson - ${element.level_no}</button>
        `
        container.appendChild(btnDiv)
    });
}
loadLevels()

document.getElementById("search-btn").addEventListener('click', () => {
    const btns = document.querySelectorAll(".btns")
        btns.forEach(element => {
            element.classList.remove("active")
        });
    const input = document.getElementById("input").value.trim().toLowerCase();
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data => {
        const allWord = data.data;
        const filter = allWord.filter(word => word.word.toLowerCase().includes(input))
        displyShow(filter)
    })    
})