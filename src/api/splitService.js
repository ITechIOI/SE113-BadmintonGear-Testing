const getLinkImage = (link) => {
    if (!link) return "";
    return link.split(" ")[0];
}

const getPublicId = (link) => {
    if (!link) return "";
    const parts = link.split(" ");
    return parts[parts.length - 1];
}

export {getLinkImage, getPublicId};