const detailsButton = document.querySelector(".details")
const detailsContainer = document.querySelector(".product__details")

detailsButton.onclick = () => showDetails()

function showDetails() {
    detailsContainer.classList.contains("details__shown") ? onClose() : onOpen()
}


onClose = () => {
    detailsContainer.classList.toggle("ease-height")
}

onOpen = () => {
    setTimeout(() => detailsContainer.classList.toggle("ease-height"), 0)
}



//items 

const openItemDetails = [...document.querySelectorAll(".detail__open")]
const itemDetailsBlocks = [...document.querySelectorAll(".product__details-open")]

openItemDetails.forEach((btn) => btn.onclick = () => showItemDetails(btn))



function showItemDetails(btn) {
    for (let child of btn.childNodes) {
        if (child.firstChild) child.classList.toggle("hidden")

    }

    const id = btn.dataset['block']
    const block = idToDetailsBlock(id)

    block.classList.toggle("hidden")
}

function idToDetailsBlock(id) {
    for (let idb of itemDetailsBlocks) {
        if (idb.id === id) return idb
    }
}