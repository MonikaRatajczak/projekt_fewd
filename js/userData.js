// js/userData.js

// ======== POMOCNICZE ========
function loadUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function updateUser(user) {
    let users = loadUsers();
    const idx = users.findIndex(u => u.username === user.username);
    if (idx !== -1) {
        users[idx] = user;
        saveUsers(users);
    }
}

// ======== AUTH ========
function registerUser(username, password) {
    let users = loadUsers();
    if (users.find(u => u.username === username)) {
        throw new Error("Taka nazwa użytkownika już istnieje");
    }
    users.push({
        username,
        password,
        cart: [],        // ["book1", "book2"]
        favorites: [],   // ["book1"]
        purchased: [],   // ["book3"]
        points: 0,
        shippingData: null // {name, address, city, zipcode, phone}
    });
    saveUsers(users);
}

function loginUser(username, password) {
    const users = loadUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) throw new Error("Błędny login lub hasło");
    localStorage.setItem("currentUser", username);
}

function logoutUser() {
    localStorage.removeItem("currentUser");
}

function getCurrentUser() {
    const username = localStorage.getItem("currentUser");
    if (!username) return null;
    const users = loadUsers();
    return users.find(u => u.username === username) || null;
}

function isUserLoggedIn() {
    return getCurrentUser() !== null;
}

// ======== KOSZYK ========
function addToCart(bookId) {
    const user = getCurrentUser();
    if (!user) throw new Error("Brak zalogowanego użytkownika");
    if (!user.cart.includes(bookId)) {
        user.cart.push(bookId);
        updateUser(user);
    }
}

function removeFromCart(bookId) {
    const user = getCurrentUser();
    if (!user) throw new Error("Brak zalogowanego użytkownika");
    user.cart = user.cart.filter(id => id !== bookId);
    updateUser(user);
}

function clearCart() {
    const user = getCurrentUser();
    if (!user) throw new Error("Brak zalogowanego użytkownika");
    user.cart = [];
    updateUser(user);
}

function getCart() {
    const user = getCurrentUser();
    if (!user) return [];
    return user.cart;
}

// ======== ULUBIONE ========
function addToFavorites(bookId) {
    const user = getCurrentUser();
    if (!user) throw new Error("Brak zalogowanego użytkownika");
    if (!user.favorites.includes(bookId)) {
        user.favorites.push(bookId);
        updateUser(user);
    }
}

function removeFromFavorites(bookId) {
    const user = getCurrentUser();
    if (!user) throw new Error("Brak zalogowanego użytkownika");
    user.favorites = user.favorites.filter(id => id !== bookId);
    updateUser(user);
}

function getFavorites() {
    const user = getCurrentUser();
    if (!user) return [];
    return user.favorites;
}

// ======== KUPIONE ========
function addToPurchased(bookId) {
    const user = getCurrentUser();
    if (!user) throw new Error("Brak zalogowanego użytkownika");
    if (!user.purchased.includes(bookId)) {
        user.purchased.push(bookId);
        updateUser(user);
    }
}

function removeFromPurchased(bookId) {
    const user = getCurrentUser();
    if (!user) throw new Error("Brak zalogowanego użytkownika");
    user.purchased = user.purchased.filter(id => id !== bookId);
    updateUser(user);
}

function getPurchased() {
    const user = getCurrentUser();
    if (!user) return [];
    return user.purchased;
}

// ======== PUNKTY ========
function addPoints(amount) {
    const user = getCurrentUser();
    if (!user) throw new Error("Brak zalogowanego użytkownika");
    user.points += amount;
    updateUser(user);
}

function usePoints(amount) {
    const user = getCurrentUser();
    if (!user) throw new Error("Brak zalogowanego użytkownika");
    if (user.points < amount) {
        throw new Error("Za mało punktów");
    }
    user.points -= amount;
    updateUser(user);
}

function getPoints() {
    const user = getCurrentUser();
    if (!user) return 0;
    return user.points;
}

// ======== DANE WYSYŁKI ========
function saveShippingData(data) {
    // data = {name, address, city, zipcode, phone}
    const user = getCurrentUser();
    if (!user) throw new Error("Brak zalogowanego użytkownika");
    user.shippingData = data;
    updateUser(user);
}

function getShippingData() {
    const user = getCurrentUser();
    if (!user) return null;
    return user.shippingData;
}

// ======== LISTA KSIĄŻEK (STAŁA BAZA) ========
const INITIAL_BOOKS = [
    {
        id: "book1",
        title: "Clean Code",
        author: "Robert C. Martin",
        price: 49.99,
        image: "📘"
    },
    {
        id: "book2",
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        price: 39.99,
        image: "📗"
    },
    {
        id: "book3",
        title: "Refactoring",
        author: "Martin Fowler",
        price: 59.99,
        image: "📕"
    },
    {
        id: "book4",
        title: "The Pragmatic Programmer",
        author: "David Thomas & Andrew Hunt",
        price: 54.99,
        image: "📙"
    },
    {
        id: "book5",
        title: "Design Patterns",
        author: "Gang of Four",
        price: 69.99,
        image: "📘"
    }
];

function initBooksIfNeeded() {
    if (!localStorage.getItem("books")) {
        localStorage.setItem("books", JSON.stringify(INITIAL_BOOKS));
    }
}

function loadBooks() {
    return JSON.parse(localStorage.getItem("books") || "[]");
}

function getBookById(bookId) {
    const books = loadBooks();
    return books.find(b => b.id === bookId) || null;
}
