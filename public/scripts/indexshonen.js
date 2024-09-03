const templateShonen = (product) => `
    <div class="Container container-fluid ">
        <figure class="figure">
            <a href="../pages/details.html?id=${product._id}">
                <img style="width: 175px; height: 245px" class="img-fluid rounded" src="${product.photo}" alt="${product._id}" />
            </a>
            <figcaption class="editorial figure-caption">${product.publisher}</figcaption>
            <figcaption class="titulo figure-caption">${product.title}</figcaption>
            <figcaption class="precio figure-caption">${product.price}</figcaption>
            <button type="button" class="btn" onclick="addToCart('${product._id}')">Add to cart</button>
        </figure>
    </div>`;

async function fetchIndexShonen() {
    try {
        let products = await fetch("../data/shonen.json");
        products = await products.json();
        console.log(products);
        if (products?.length > 0) {
            document.getElementById("shonenIndex").innerHTML = products.map((each) => templateShonen(each)).join("");
        }
    } catch (error) {
        console.log(error);
    }
}

fetchIndexShonen();