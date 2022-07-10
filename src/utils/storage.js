export const getItem = (name) => JSON.parse(window.localStorage.getItem(name))
export const setItem = (name, item) => window.localStorage.setItem(name, JSON.stringify(item))
export const removeItem = name => window.localStorage.removeItem(name)
