const template = (data) => `
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

async function fetchProducts(limit = 30) {
    try {
        const query = location.search
        const params = new URLSearchParams(query)
        const page = params.get("page")
        console.log(page);
        const category = "manga";
        let res = await fetch(`/api/products/paginate?page=${page || 1}&limit=${limit}&category=${category}`);
        res = await res.json();
        console.log(res);
        const prev = document.querySelector("#prev")
        res.info.prevPage && (prev.innerHTML = `<a href='../pages/products.html?page=${res.info.prevPage}&limit=${limit}'>Previous page</a>`);
        const next = document.querySelector("#next")
        res.info.nextPage && (next.innerHTML = `<a href='../pages/products.html?page=${res.info.nextPage}&limit=${limit}'>Next page</a>`)
        const products = Array.isArray(res.response) ? res.response : [res.response];
        console.log(products);
        document.getElementById("products").innerHTML = products
            .map((each) => template(each))
            .join("")
    } catch (error) {
        console.log(error);
    }
}

fetchProducts();

async function addToCart(id) {
    try {
        let userResponse = await fetch("/api/sessions/online");
        userResponse = await userResponse.json();
        console.log(userResponse);
        if (userResponse.statusCode === 200) {
            const userId = userResponse.response._id;
            const data = {
                product_id: id,
                quantity: 1,
                user_id: userId
            };
            const url = "/api/carts"
            const opts = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type" : "application/json"}
            };
            console.log(data);
            let cartResponse = await fetch(url, opts)
            cartResponse = await cartResponse.json()
            console.log(cartResponse);
            if (cartResponse.statusCode === 201) {
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