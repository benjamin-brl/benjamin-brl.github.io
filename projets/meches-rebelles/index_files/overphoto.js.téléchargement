const images = document.querySelectorAll("img#photo");
const main = document.querySelector('main');

function ouvrirModal(image) {

    const bg = document.createElement('div');
    bg.className = 'modal_bg';
    bg.id = 'modal';

    const modal = document.createElement('div');
    modal.className = 'modal_over';
    
    const img = document.createElement('img');
    img.src = image.src;
    img.className = 'modal_img';

    const exit = document.createElement('div');
    exit.className = 'modal_exit';

    img.addEventListener("load", () => {
        const { width, x, y } = img.getBoundingClientRect();
        exit.style.top = `${y}px`;
        exit.style.left = `${x + width - 48}px`;
        exit.textContent = '×';
    });    

    exit.addEventListener('click', removeModal);
    
    img.addEventListener("click", () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            img.requestFullscreen();
        }
    });

    modal.appendChild(exit);
    modal.appendChild(img);
    bg.appendChild(modal);
    main.appendChild(bg);
}



function removeModal() {
    const existModal = document.querySelector('div#modal');
    if (existModal) {
        existModal.remove();
    }
}

images.forEach((image) => {
    image.addEventListener("dblclick", () => {
        ouvrirModal(image);
    });
});