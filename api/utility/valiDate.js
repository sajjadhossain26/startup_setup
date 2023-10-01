

// Email validation

export const isEmail= (email) => {
    return email.toLowerCase().match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
}