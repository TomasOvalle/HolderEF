async function cvProducts() {
    try {
        let response = await fetch("/api/sessions/online");
        response = await response.json();
        console.log(response);

        const user = response.response;
        console.log("User role:", user.role);

        if (user.role === 2 || user.role === 1) {
            console.log("Prem user detected:", user);

            const category = "libro";
            console.log(category);
            let res = await fetch(`/api/products?category=${category}`);
            res = await res.json();
            const products = res.response;
            console.log(products);

            const filteredProducts = products.filter(product => product.supplier_id !== user._id);
            console.log(filteredProducts);

            template = (data) => `
                <div class="Container container-fluid ">
                    <figure class="figure">
                        <a href="../pages/details.html?id=${data._id}">
                            <img style="width: 195px; height: 280px" class="img-fluid rounded" src="${data.photo}" alt="${data._id}" />
                        </a>
                        <figcaption class="editorial figure-caption">${data.publisher}</figcaption>
                        <figcaption class="titulo figure-caption">${data.title}</figcaption>
                        <figcaption class="precio figure-caption">${data.price}</figcaption>
                        <button type="button" class="btn btn" onclick="addToCart('${data._id}')">Add to cart</button>
                    </figure>
                </div>`;
            document.getElementById("cv-products").innerHTML = filteredProducts.map((each) => template(each)).join("");
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
            confirmButtonColor: "#ff3b3c",
        });
    }
}

cvProducts();
