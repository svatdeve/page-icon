function sortIconsBySize(icons) {
    return icons.sort((a, b) => {
        if (a.data.size < b.data.size) {
            return 1;
        } else {
            return -1;
        }
    });
}

function findBestIcon(icons) {
    return sortIconsBySize(icons)[0];
}

module.exports = findBestIcon;
