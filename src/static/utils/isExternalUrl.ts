export default (url: string) => !(location.href.replace("http://", "").replace("https://", "").split("/")[0] === url.replace("http://", "").replace("https://", "").split("/")[0]);
