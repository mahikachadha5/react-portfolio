export const getImageURl = (path) => {
    return new URL(`/assets/${path}`, import.meta.url).href;
}