
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 299,
    category: "electronics",
    rating: 4.5,
    description: "High-quality wireless headphones with noise cancellation",
    icon: "🎧",
  },
  {
    id: 2,
    name: "Cotton T-Shirt",
    price: 29,
    category: "clothing",
    rating: 4.2,
    description: "Comfortable 100% cotton t-shirt in various colors",
    icon: "👕",
  },
  {
    id: 3,
    name: "JavaScript Guide",
    price: 45,
    category: "books",
    rating: 4.8,
    description: "Complete guide to modern JavaScript programming",
    icon: "📚",
  },
  {
    id: 4,
    name: "Garden Tools Set",
    price: 89,
    category: "home",
    rating: 4.3,
    description: "Essential tools for your garden maintenance",
    icon: "🌱",
  },
  {
    id: 5,
    name: "Running Shoes",
    price: 129,
    category: "sports",
    rating: 4.6,
    description: "Lightweight running shoes for optimal performance",
    icon: "👟",
  },
  {
    id: 6,
    name: "Smartphone",
    price: 699,
    category: "electronics",
    rating: 4.4,
    description: "Latest smartphone with advanced camera features",
    icon: "📱",
  },
  {
    id: 7,
    name: "Denim Jeans",
    price: 79,
    category: "clothing",
    rating: 4.1,
    description: "Classic fit denim jeans in premium quality",
    icon: "👖",
  },
  {
    id: 8,
    name: "Cooking Masterclass",
    price: 35,
    category: "books",
    rating: 4.7,
    description: "Learn professional cooking techniques at home",
    icon: "📖",
  },
  {
    id: 9,
    name: "LED Desk Lamp",
    price: 55,
    category: "home",
    rating: 4.0,
    description: "Adjustable LED desk lamp with USB charging port",
    icon: "💡",
  },
  {
    id: 10,
    name: "Yoga Mat",
    price: 39,
    category: "sports",
    rating: 4.5,
    description: "Non-slip yoga mat for comfortable practice",
    icon: "🧘",
  },
  {
    id: 11,
    name: "Laptop",
    price: 899,
    category: "electronics",
    rating: 4.3,
    description: "High-performance laptop for work and gaming",
    icon: "💻",
  },
  {
    id: 12,
    name: "Winter Jacket",
    price: 159,
    category: "clothing",
    rating: 4.4,
    description: "Warm winter jacket with water-resistant coating",
    icon: "🧥",
  },
]

// Global variables
let filteredProducts = [...products]
let currentCategory = "all"
let currentMaxPrice = 1000
let currentSort = "name"

// DOM elements
const productsGrid = document.getElementById("productsGrid")
const categoryFilters = document.getElementById("categoryFilters")
const priceRange = document.getElementById("priceRange")
const priceDisplay = document.getElementById("priceDisplay")
const sortSelect = document.getElementById("sortSelect")
const resultsInfo = document.getElementById("resultsInfo")
const noResults = document.getElementById("noResults")


function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let starsHTML = ""

  for (let i = 0; i < fullStars; i++) {
    starsHTML += "★"
  }
  if (hasHalfStar) {
    starsHTML += "☆"
  }
  for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
    starsHTML += "☆"
  }

  return starsHTML
}


function renderProducts(products) {
  if (products.length === 0) {
    productsGrid.style.display = "none"
    noResults.style.display = "block"
    resultsInfo.textContent = "No products found"
    return
  }

  productsGrid.style.display = "grid"
  noResults.style.display = "none"

  productsGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                ${product.icon}
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price}</div>
                <div class="product-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span class="rating-text">${product.rating}/5</span>
                </div>
                <p class="product-description">${product.description}</p>
            </div>
        </div>
    `,
    )
    .join("")

  // Update results info
  const categoryText = currentCategory === "all" ? "all categories" : currentCategory
  resultsInfo.textContent = `Showing ${products.length} product${products.length !== 1 ? "s" : ""} in ${categoryText} under $${currentMaxPrice}`
}


function filterProducts() {
  filteredProducts = products.filter((product) => {
    const categoryMatch = currentCategory === "all" || product.category === currentCategory
    const priceMatch = product.price <= currentMaxPrice
    return categoryMatch && priceMatch
  })

  sortProducts()
}

function sortProducts() {
  filteredProducts.sort((a, b) => {
    switch (currentSort) {
      case "name":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      case "price":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "rating":
        return a.rating - b.rating
      case "rating-desc":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  renderProducts(filteredProducts)
}

categoryFilters.addEventListener("click", (e) => {
  if (e.target.classList.contains("category-btn")) {
    // Remove active class from all buttons
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.classList.remove("active")
    })

    // Add active class to clicked button
    e.target.classList.add("active")

    currentCategory = e.target.dataset.category
    filterProducts()
  }
})

priceRange.addEventListener("input", (e) => {
  currentMaxPrice = Number.parseInt(e.target.value)
  priceDisplay.textContent = `$${currentMaxPrice}`
  filterProducts()
})

sortSelect.addEventListener("change", (e) => {
  currentSort = e.target.value
  sortProducts()
})

productsGrid.addEventListener("click", (e) => {
  const productCard = e.target.closest(".product-card")
  if (productCard) {
    const productId = productCard.dataset.id
    const product = products.find((p) => p.id == productId)
    alert(`You clicked on: ${product.name}\nPrice: $${product.price}\nRating: ${product.rating}/5`)
  }
})

document.addEventListener("DOMContentLoaded", () => {
  filterProducts()
})

const themeToggle = document.getElementById("themeToggle")
const body = document.body

const currentTheme = localStorage.getItem("theme") || "light"
body.setAttribute("data-theme", currentTheme)
updateThemeToggleText(currentTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeToggleText(newTheme)
})

function updateThemeToggleText(theme) {
  themeToggle.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark"
}

function addStaggeredAnimation() {
  const productCards = document.querySelectorAll(".product-card")
  productCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
  })
}

const originalRenderProducts = renderProducts
renderProducts = (products) => {
  originalRenderProducts(products)
  setTimeout(addStaggeredAnimation, 50)
}
