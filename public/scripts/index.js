const template = (product) => `
    <div class="Container container-fluid ">
        <figure class="figure">
            <a href="../pages/details.html?id=${product._id}">
                <img style="width: 253px; height: 351px" class="img-fluid rounded" src="${product.photo}" alt="${product._id}" />
            </a>
            <figcaption class="editorial figure-caption">${product.publisher}</figcaption>
            <figcaption class="titulo figure-caption">${product.title}</figcaption>
            <figcaption class="precio figure-caption">${product.price}</figcaption>
            <button type="button" class="btn btn-primary" onclick="addToCart('${product._id}')">Add to cart</button>
        </figure>
    </div>`;

async function fetchIndex() {
    try {
        let products = await fetch("../data/index.json");
        products = await products.json();
        console.log(products);
        if (products?.length > 0) {
            document.getElementById("productsIndex").innerHTML = products.map((each) => template(each)).join("");
        }
    } catch (error) {
        console.log(error);
    }
}

fetchIndex();

async function addToCart(id) {
    try {
        let response = await fetch("/api/sessions/online");
        response = await response.json();
        if (response.statusCode === 200) {
            const data = {
                product_id: id,
                quantity: 1
            };
            const url = "/api/carts"
            const opts = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type" : "application/json"}
            };
            console.log(data);
            let response = await fetch(url, opts)
            response = await response.json()
            console.log(response);
            if (response.statusCode === 201) {
                Swal.fire({
                    title: "Done!",
                    icon: "success",
                    timer: 5000,
                    timerProgressBar: true,
                    confirmButtonColor: "#ff3b3c",
                });
            } else {
                Swal.fire({
                    title: "Please log in!",
                    iconColor: "white",
                    confirmButtonColor: "#ff3b3c",
                    timer: 5000,
                    timerProgressBar: true,
                });
            }
        } else {
            Swal.fire({
                title: "Please log in!",
                iconColor: "white",
                confirmButtonColor: "#ff3b3c",
                timer: 5000,
                timerProgressBar: true,
            });
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            title: error.message,
            icon: "error",
            timer: 5000,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
        });
    }
};



