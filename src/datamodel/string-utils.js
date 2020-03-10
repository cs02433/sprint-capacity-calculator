export default {
    capatilizeFirstLetter: function (str) {
        if (!str || str.length === 0) {
            return str;
        }
        const firstChar = str.substr(0, 1);
        const restOfString = str.length > 1 ? str.substr(1) : "";
        return firstChar.toUpperCase() + restOfString;
    }
}