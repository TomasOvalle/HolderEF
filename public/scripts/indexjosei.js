const templateJosei = (product) => `
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

async function fetchIndexJosei() {
    try {
        let products = await fetch("../data/josei.json");
        products = await products.json();
        console.log(products);
        if (products?.length > 0) {
            document.getElementById("joseiIndex").innerHTML = products.map((each) => templateJosei(each)).join("");
        }
    } catch (error) {
        console.log(error);
    }
}

fetchIndexJosei();