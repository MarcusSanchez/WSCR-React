export function validateName(str) {
    // Check if the string matches the pattern of 3-16 characters
    return /^[a-zA-Z0-9]{3,16}$/.test(str);
}

export function validateRoom(str) {
    // Check if the string matches the pattern of four digits
    if (/^\d{4}$/.test(str)) {
        // Convert the string to a number
        let num = parseInt(str, 10);

        // Check if the number is within the desired range
        if (num >= 0 && num <= 9999) {
            return true;
        }
    }
}