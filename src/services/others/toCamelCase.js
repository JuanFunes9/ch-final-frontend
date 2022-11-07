const toCamelCase = (word) => {

    const firstLetter = word.split("")[0].toUpperCase();
    const CamelWord = word.split("")

    CamelWord.splice(0, 1, firstLetter).join("");

    return CamelWord;

}

export default toCamelCase;