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
        genre: "Programming",
        image: "img/clean.jpg"
    },

    {
        id: "book2",
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        genre: "Programming",
        price: 39.99,
        image: "img/you.jpg"
    },
    {
        id: "book3",
        title: "Refactoring",
        author: "Martin Fowler",
        genre: "Programming",
        price: 59.99,
        image: "img/ref.jpg"
    },
    {
        id: "book4",
        title: "The Pragmatic Programmer",
        author: "David Thomas & Andrew Hunt",
        genre: "Programming",
        price: 54.99,
        image: "img/parag.jpg"
    },
    {
        id: "book5",
        title: "Design Patterns",
        author: "Gang of Four",
        genre: "Programming",
        price: 69.99,
        image: "img/des.jpg"
    },
    {
        id: "book6",
        title: "Harry Potter i Kamień Filozoficzny",
        author: "J.K. Rowling",
        genre: "Fantasy",
        price: 33.99,
        image: "img/kam.jpg"
    },
    {
        id: "book7",
        title: "Harry Potter i Komnata Tajemnic",
        author: "J.K. Rowling",
        genre: "Fantasy",
        price: 33.99,
        image: "img/kom.jpg"
    },
    {
        id: "book8",
        title: "Harry Potter i Więzień Azkabanu",
        author: "J.K. Rowling",
        genre: "Fantasy",
        price: 33.99,
        image: "img/wiez.jpg"
    },
    {
        id: "book9",
        title: "Harry Potter i Czara ognia",
        author: "J.K. Rowling",
        genre: "Fantasy",
        price: 33.99,
        image: "img/czara.jpg"
    },
    {
        id: "book10",
        title: "Harry Potter i Zakon Feniksa",
        author: "J.K. Rowling",
        genre: "Fantasy",
        price: 33.99,
        image: "img/zakon.jpg"
    },
    {
        id: "book11",
        title: "Harry Potter i Książę Półkrwi",
        author: "J.K. Rowling",
        genre: "Fantasy",
        price: 33.99,
        image: "img/ksiaz.jpg"
    },
    {
        id: "book12",
        title: "Harry Potter i Insygnia Śmierci",
        author: "J.K. Rowling",
        genre: "Fantasy",
        price: 33.99,
        image: "img/insygnia.jpg"
    },
    {
        id: "book13",
        title: "Narkotyki",
        author: "Stanisław Ignacy Witkiewicz",
        genre: "Essay",
        price: 38.99,
        image: "img/nark.jpg"
    },
    {
        id: "book14",
        title: "Lalka",
        author: "Bolesław Prus",
        genre: "Classic Polish literature",
        price: 74.99,
        image: "img/lalka.jpg"
    },
    {
        id: "book15",
        title: "Chłopi",
        author: "Władysław Stanisław Reymont",
        genre: "Classic Polish literature",
        price: 112.99,
        image: "img/chlopi.jpg"
    },
    {
        id: "book16",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Drama",
        price: 12.99,
        image: "img/tokill.jpg"
    },
    {
        id: "book17",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Drama",
        price: 58.99,
        image: "img/price.jpg"
    },
    {
        id: "book18",
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian novel",
        price: 29.99,
        image: "img/1984.jpg"
    },
    {
        id: "book19",
        title: "The Book Thief",
        author: "Markus Zusak",
        genre: "Drama",
        price: 20.99,
        image: "img/thif.png"
    },
    {
        id: "book20",
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        genre: "Dystopian novel",
        price: 42.99,
        image: "img/451.jpg"
    },
    {
        id: "book21",
        title: "Steve Jobs",
        author: "Walter Isaacson",
        genre: "Biography",
        price: 59.67,
        image: "img/steve.jpg"
    },
    {
        id: "book22",
        title: "John Adams",
        author: "David McCullough",
        genre: "Biography",
        price: 26.89,
        image: "img/john.jpg"
    },
    {
        id: "book23",
        title: "Alexander Hamilton",
        author: "Ron Chernow",
        genre: "Biography",
        price: 90.99,
        image: "img/alex.jpg"
    },
    {
        id: "book24",
        title: "Capital in the Twenty First Century",
        author: "Thomas Piketty",
        genre: "Economy",
        price: 109.79,
        image: "img/capital.jpg"
    },
    {
        id: "book25",
        title: "Basic Economics: A Citizen's Guide to the Economy",
        author: "Thomas Sowell",
        genre: "Economy",
        price: 34.99,
        image: "img/basic.jpg"
    },
    {
        id: "book26",
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        genre: "Economy",
        price: 38.99,
        image: "img/think.jpg"
    },
    {
        id: "book27",
        title: "The Hitchhiker’s Guide to the Galaxy",
        author: "Douglas Adams",
        genre: "Science Fiction",
        price: 18.99,
        image: "img/galaxy.jpg"
    },
    {
        id: "book28",
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
        price: 20.99,
        image: "img/dune.jpg"
    },
    {
        id: "book29",
        title: "Brave New World",
        author: "Aldous Huxley",
        genre: "Science Fiction",
        price: 8.99,
        image: "img/brave.jpg"
    },
    {
        id: "book30",
        title: "Love You Forever",
        author: "Robert Munsch",
        genre: "For Kids",
        price: 39.99,
        image: "img/love.jpg"
    },
    {
        id: "book31",
        title: "The Girl With the Dragon Tattoo",
        author: "Stieg Larsson",
        genre: "Detective",
        price: 39.99,
        image: "img/girl.jpg"
    },
    {
        id: "book32",
        title: "The Big Sleep",
        author: "Raymond Chandler",
        genre: "Detective",
        price: 19.99,
        image: "img/sleep.jpg"
    },
    {
        id: "book33",
        title: "Murder on the Orient Express",
        author: "Agatha Christie",
        genre: "Detective",
        price: 32.99,
        image: "img/murder.jpg"
    },
    {
        id: "book34",
        title: "The Complete Sherlock Holmes",
        author: "Arthur Conan Doyle",
        genre: "Detective",
        price: 10.29,
        image: "img/holmes.jpg"
    },
    {
        id: "book35",
        title: "The Giving Tree",
        author: "Shel Silverstein",
        genre: "For Kids",
        price: 15.99,
        image: "img/tree.jpg"
    },
    {
        id: "book36",
        title: "Charlotte’s Web",
        author: "E.B. White",
        genre: "For Kids",
        price: 26.69,
        image: "img/web.jpg"
    },
    {
        id: "book37",
        title: "Where the Sidewalk Ends",
        author: "Shel Silverstein",
        genre: "For Kids",
        price: 13.99,
        image: "img/ends.jpg"
    },
    {
        id: "book38",
        title: "If You Give a Mouse a Cookie",
        author: "Laura Joffe Numeroff",
        genre: "For Kids",
        price: 19.29,
        image: "img/mouse.jpg"
    }

    
];
const booksContainer = document.getElementById("books");
/***********************
 * INICJALIZACJA DANYCH
 ***********************/
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

/***********************
 * RENDER KSIĄŻEK
 * (TA SAMA FUNKCJA DLA WSZYSTKICH WIDOKÓW)
 ***********************/
function renderBooks(books, container = booksContainer) {
  container.innerHTML = "";

  books.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";

    const imageEl = document.createElement("div");
    imageEl.className = "book-image";
    const img = document.createElement("img");
    img.src = book.image;
    img.alt = book.title;
    img.className = "book-img";
    imageEl.appendChild(img);

    const titleEl = document.createElement("div");
    titleEl.className = "book-title";
    titleEl.textContent = book.title;

    const authorEl = document.createElement("div");
    authorEl.className = "book-author";
    authorEl.textContent = "by " + book.author;

    const genreEl = document.createElement("div");
    genreEl.className = "book-genre";
    genreEl.textContent = book.genre;

    const priceEl = document.createElement("div");
    priceEl.className = "book-price";
    priceEl.textContent = book.price.toFixed(2) + " PLN";

    const actionsEl = document.createElement("div");
    actionsEl.className = "book-actions";

    const addToCartBtn = document.createElement("button");
    addToCartBtn.className = "btn-primary";
    addToCartBtn.textContent = "Add to cart";
    addToCartBtn.onclick = function () {
      if (!isUserLoggedIn()) {
        msg.style.color = "red";
        msg.textContent = "Please log in to add books to your cart.";
        return;
      }
      try {
        addToCart(book.id);
        msg.style.color = "green";
        msg.textContent = `✓ Added "${book.title}" to your cart.`;
      } catch (err) {
        msg.style.color = "red";
        msg.textContent = err.message;
      }
    };

    const addToFavBtn = document.createElement("button");
    addToFavBtn.className = "btn-secondary";
    addToFavBtn.textContent = "♥ Add to favourites";
    addToFavBtn.onclick = function () {
      if (!isUserLoggedIn()) {
        msg.style.color = "red";
        msg.textContent = "Please log in to add books to favourites.";
        return;
      }
      try {
        addToFavorites(book.id);
        msg.style.color = "green";
        msg.textContent = `✓ Added "${book.title}" to your favourites.`;
      } catch (err) {
        msg.style.color = "red";
        msg.textContent = err.message;
      }
    };

    actionsEl.appendChild(addToCartBtn);
    actionsEl.appendChild(addToFavBtn);

    card.appendChild(imageEl);
    card.appendChild(titleEl);
    card.appendChild(authorEl);
    card.appendChild(genreEl);
    card.appendChild(priceEl);
    card.appendChild(actionsEl);

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initBooksIfNeeded();

  // kontenery
  const categorySection = document.getElementById("categorySection");
  const categoryTitle = document.getElementById("categoryTitle");
  const categoryBooksContainer = document.getElementById("categoryBooks");

  // render strony głównej
  renderBooks(loadBooks());

  // obsługa kliknięcia kategorii
  const categoryItems = document.querySelectorAll(".categories-list li");

  categoryItems.forEach(item => {
    item.addEventListener("click", () => {
      const selectedCategory = item.dataset.category;

      // UI active
      categoryItems.forEach(li => li.classList.remove("active"));
      item.classList.add("active");

      // ALL → chowamy sekcję kategorii
      if (selectedCategory === "all") {
        categorySection.classList.add("hidden");
        return;
      }

      const books = loadBooks().filter(
        book => book.genre === selectedCategory
      );

      categoryTitle.textContent = selectedCategory;
      categorySection.classList.remove("hidden");

      // ⬅️ TEN SAM WYGLĄD KART
      renderBooks(books, categoryBooksContainer);
    });
  });
});

