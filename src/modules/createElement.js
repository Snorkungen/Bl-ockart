function createElement(parent, elName, ...attributes) {
    const newElement = document.createElement(elName);
    if (attributes !== null && attributes.length > 0) {
        attributes.forEach((attribute) => {
            if (attribute) {
                let [type, value] = attribute.split("=");
                value = attribute.split("=").slice(1).join("=");
                if (type === "content") newElement.textContent = value;
                else newElement.setAttribute(type, value);
            }
        });
    }
    if (parent) parent.appendChild(newElement);
    return newElement;
}


export {
    createElement
}