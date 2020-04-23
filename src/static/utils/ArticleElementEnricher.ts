// Utils
import isExternalURL from "./isExternalUrl";

class EnrichArticleElements {
    constructor(element: any, options: any) {
        if (!element) { return; }
        this._element = element;
        this._options = options

        this._init();
    }

    _element: any = null
    _options: any = null
    _links: any = []
    _images: any = []

    _enrichLinks() {
        this._links.forEach((link: any) => {
            if (isExternalURL(link.href)) {
                link.setAttribute('target', '__blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    _enrichImages() {
        this._images.forEach((img: any) => {
            const parentNode = img.parentNode;
            const imgClone = img.cloneNode();
            const sibling = img.nextElementSibling;
            const figure = document.createElement('figure');
            figure.dataset.figure = '';

            img.parentNode.removeChild(img);
            figure.appendChild(imgClone);

            if (sibling && sibling.tagName != 'p') {
                const caption = document.createElement('figcaption');
                caption.textContent = sibling.textContent;

                figure.appendChild(caption);
                parentNode.removeChild(sibling);
            }

            parentNode.appendChild(figure);
        });
    }

    _cacheSelectors() {
        this._images = [...this._element.querySelectorAll('img')].filter(img => !img.classList.length);
        this._links = [...this._element.querySelectorAll('a')].filter(img => !img.classList.length);
    }

    _init() {
        this._cacheSelectors();
        this._enrichImages();
        this._enrichLinks();
    }
}

export default EnrichArticleElements;
