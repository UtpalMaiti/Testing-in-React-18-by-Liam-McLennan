export function countParagraphs() {
    // Array.prototype.slice.call converts an 'array-like' object into an array
    return Array.prototype.slice.call(document.querySelectorAll('p'))
        .filter(p => p.innerText.length > 0)
        .length;
}