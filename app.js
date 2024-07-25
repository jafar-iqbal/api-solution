const loadAllProducts = async (search) => {
  document.getElementById("loading-cotnainer").style.display = "block";
  const res = await fetch(`https://fakestoreapi.com/products/${search}`);
  const data = await res.json();
  if (!data.length) {
    document.getElementById("not-found").style.display = "block";
    document.getElementById("loading-cotnainer").style.display = "none";
  } else if (data.length > 0) {
    document.getElementById("loading-cotnainer").style.display = "none";
    document.getElementById("not-found").style.display = "none";
  }
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ""; // Clear previous products
  data.filter((product) => {
    const div = document.createElement("div");
    div.classList.add("product-img");
    div.innerHTML = `
                <div class="image">
                    <img src=${product.image} alt="">
                </div>
                <h4>${product.title}</h4>
                <div class="price-category">
                    <p>Price ${product.price}</p>
                    <button style="margin: 10px;">${product.category}</button>
                </div>
                <hr>
                <div class="detail-section">
                    <div class="views">
                        <i class="fa-solid fa-eye"></i>
                        <p>${product.rating.count}</p>
                    </div>
                    <div class="rating">
                        <i class="star fa-solid fa-star"></i>
                        <p>${product.rating.rate}</p>
                    </div>
                    <button onclick="addToCart('${product.title}','${product.price}')">Add to Cart</button>
                </div>
        `;

    productContainer.append(div);
  });
};

const handleSearch = () => {
  const value = document.getElementById("search-box").value;
  loadAllProducts(`/category/${value}`);
};

const addToCart = (name, price) => {
  const cartContainer = document.getElementById("cart-container");
  const div = document.createElement("div");
  div.classList.add("heading");
  div.innerHTML = `
        <h3>${name}</h3>
        <p>${price}</p>

    `;
  cartContainer.append(div);
};

loadAllProducts("");
