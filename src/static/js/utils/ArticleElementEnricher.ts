// Utils
import isExternalURL from "./isExternalUrl";

class ArticleElementEnricher {
  constructor(element: any, options: any) {
    if (!element) {
      return;
    }
    this._element = element;
    this._options = options;

    this._init();
  }

  _element: any = null;
  _options: any = null;
  _links: any = [];
  _images: any = [];
  _videos: any = [];

  _enrichLinks() {
    this._links.forEach((link: any) => {
      if (isExternalURL(link.href)) {
        link.setAttribute("target", "__blank");
        link.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  _enrichImages() {
    this._images.forEach((img: any) => {
      const parentNode = img.parentNode;
      const imgClone = img.cloneNode();
      const sibling = img.nextElementSibling;
      const figure = document.createElement("figure");
      imgClone.setAttribute("loading", "lazy");
      figure.dataset.figure = "";

      parentNode?.removeChild(img);
      figure.appendChild(imgClone);

      if (sibling && sibling.tagName != "p") {
        const caption = document.createElement("figcaption");
        caption.textContent = sibling.textContent;

        figure.appendChild(caption);
        parentNode?.removeChild(sibling);
      }

      parentNode?.appendChild(figure);
    });
  }

  _enrichVideos() {
    this._videos.forEach((video: any) => {
      const parentNode = video.parentNode;
      const videoClone = video.cloneNode();
      const wrapper = document.createElement("div");
      wrapper.classList.add("article__video-wrapper");
      videoClone.classList.add("article__video");

      video.parentNode.removeChild(video);
      wrapper.appendChild(videoClone);
      parentNode.appendChild(wrapper);
    });
  }

  _cacheSelectors() {
    this._images = [...this._element.querySelectorAll("img")].filter(
      (img) => !img.classList.length
    );
    this._links = [...this._element.querySelectorAll("a")].filter(
      (img) => !img.classList.length
    );
    this._videos = [
      ...this._element.querySelectorAll(
        'iframe[src^="https://www.youtube.com/embed"]'
      ),
    ].filter((video) => !video.classList.length);
  }

  _init() {
    this._cacheSelectors();
    this._enrichImages();
    this._enrichVideos();
    this._enrichLinks();
  }
}

export default ArticleElementEnricher;
