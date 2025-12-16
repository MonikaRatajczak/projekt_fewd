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
        points: 0
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
