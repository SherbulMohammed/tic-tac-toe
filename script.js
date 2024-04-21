const gridElements = document.querySelectorAll('[data-grid]')

gridElements.forEach(grid => {
    grid.addEventListener('click', handleClick, { once: true })
})

function handleClick(e) {
    console.log('clicked')
}