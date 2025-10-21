const spans = arr => {
    const ar = arr.map((el) => `<span class="btn text-gray-500 bg-gray-100">${el}</span>`);
    console.log(ar.join(" "))
}

const mama = ['rayhan', 'mama', 'fijur']
spans(mama)