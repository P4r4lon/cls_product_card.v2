//#region data 
let products = [];
let currentProduct;
//fields to be filled
const headerName = document.getElementById("card__header")
const fullPrice = document.getElementById("price__full")
const itemPrice = document.getElementById("price__per-item")
const productDescription = document.getElementById("product__description")
const colorAmount = document.getElementById("colors__amount")

const selectedClrBlock = document.getElementById("selected__color-block")
const selectedColorHeader = document.getElementById("selected__color-header")

getData()

async function getData() {
    const resp = await fetch("../data.json")
    const respData = await resp.json()
    return respData
}

function fillData(data) {
    products = data
}
setCurrentProductDataById(1)

async function setCurrentProductDataById(id) {
    products = await getData()
    for (let product of products) {
        if (product.id === id) {
            currentProduct = product
        }
    }
    dataUpdate()

}

function dataUpdate() {
    headerName.innerHTML = currentProduct.header
    fullPrice.innerHTML = currentProduct.fullPrice
    itemPrice.innerHTML = `(${currentProduct.perItemPrice} each)`
    productDescription.innerHTML = currentProduct.description
    colorAmount.innerHTML = `colours [${Object.keys(currentProduct.colors).length}]`
    selectColor(Object.keys(currentProduct.colors[0])[0], Object.values(currentProduct.colors[0])[0], selectedColorHeader, selectedClrBlock)
    fillDropDownGroup(currentProduct.colors)

}
//#region slider
const dotSliderGroup = document.querySelector(".gallery__wrapper-ui_pages")
const galleryWrapper = document.querySelector(".gallery__wrapper")
const dots = []
let oldActiveDot = 0
let indexOfSelectedImage = 0
let currentImgs

function fillGallery(color) {
    while (dotSliderGroup.firstChild) {
        dotSliderGroup.removeChild(dotSliderGroup.firstChild)
    }
    currentImgs = currentProduct.imgs[color]
    for (let i = 0; i < currentImgs.length; i++) {
        dots[i] = document.createElement('div')
        dots[i].className = 'pages-dot'
        dotSliderGroup.appendChild(dots[i])
        dots[i].onclick = () => selectImage(i, currentImgs)
    }
    dots[oldActiveDot].classList.add('active')
    selectImage(0, currentImgs)
}


const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")

prevBtn.onclick = () => {
    if (indexOfSelectedImage == 0) {
        selectImage(currentImgs.length - 1)
    } else {
        selectImage(indexOfSelectedImage - 1)
    }
}

nextBtn.onclick = () => {
    if (indexOfSelectedImage == currentImgs.length - 1) {
        selectImage(0)
    } else {
        selectImage(indexOfSelectedImage + 1)
    }
}




function selectImage(num) {
    galleryWrapper.style.backgroundImage = `url(${currentImgs[num]})`
    dots[oldActiveDot].classList.remove('active')
    oldActiveDot = num
    dots[num].classList.add('active')
    indexOfSelectedImage = num
}


//#region dropdown-color

//colors


const mainDropdown = document.querySelector(".dropdown__main")
const dropdownItems = [...document.querySelectorAll(".dropdown__item")]
const dropdownGroup = document.querySelector(".dropdown__group")
mainDropdown.onclick = () => showDropdownSelector()

function showDropdownSelector() {

    if (dropdownGroup.classList.contains("block")) {
        dropdownGroup.classList.toggle("opacity");
        setTimeout(() => {
            dropdownGroup.classList.toggle("block");
        }, 300)
    } else {

        dropdownGroup.classList.toggle("block");
        setTimeout(() => {
            dropdownGroup.classList.toggle("opacity");
        }, 0)
    }
}

function fillDropDownGroup(colors) {
    for (let i = 1; i < colors.length; i++) {
        createDropDownItem(Object.keys(colors[i])[0], Object.values(colors[i])[0])
    }
}

function createDropDownItem(color, hex) {
    const item = document.createElement('div')
    item.className = 'dropdown__item card__info-color_select-dropdown'
    dropdownGroup.appendChild(item)

    const itemClrBlock = document.createElement('div')
    itemClrBlock.className = 'dropdown__color-block'
    itemClrBlock.style.backgroundColor = hex;
    item.appendChild(itemClrBlock)

    const itemClrTitleBlock = document.createElement('div')
    itemClrTitleBlock.className = 'dropdown__color-title'
    item.appendChild(itemClrTitleBlock)

    const itemClrTitle = document.createElement('h3')
    itemClrTitle.className = "bold-weight"
    itemClrTitle.innerText = color
    itemClrTitleBlock.appendChild(itemClrTitle)
    item.onclick = () => selectColor(itemClrTitle.innerText, itemClrBlock.style.backgroundColor, itemClrTitle, itemClrBlock, toShow = true)
}

function selectColor(color, hex, itemClrTitle, itemClrBlock, toShow) {
    itemClrTitle.innerText = selectedColorHeader.innerText
    itemClrBlock.style.backgroundColor = selectedClrBlock.style.backgroundColor

    selectedColorHeader.innerHTML = color
    selectedClrBlock.style.backgroundColor = hex

    toShow && showDropdownSelector()
    fillGallery(color)
}