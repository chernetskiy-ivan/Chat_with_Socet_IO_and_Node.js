document.addEventListener('click', event => {
    //на всякий там случай
    event.preventDefault()

    console.log(event.target)
})