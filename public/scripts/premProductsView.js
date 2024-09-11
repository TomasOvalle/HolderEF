async function premProducts() {
    try {
        let response = await fetch("/api/sessions/online");
        response = await response.json();
        console.log(response);

        const user = response.response;
        console.log("User role:", user.role);

        if (user.role === 2) { 
            console.log("Prem user detected:", user);

            let res = await fetch("/api/products/");
            res = await res.json();
            const products = res.response;
            console.log(products);

            const filteredProducts = products.filter(product => product.supplier_id === user._id);
            console.log(filteredProducts);

            const template = (data) => `
                <div class="premProducts container-fluid ">
                    <figure class="figure">
                        <a href="../pages/premDetails.html?id=${data._id}">
                            <img class="img-fluid rounded" src="${data.photo}" alt="${data._id}" />
                        </a>
                        <figcaption class="editorial figure-caption">${data.publisher}</figcaption>
                        <figcaption class="titulo figure-caption">${data.title}</figcaption>
                        <figcaption class="precio figure-caption">${data.price}</figcaption>
                    </figure>
                </div>`;

            document.getElementById("myProducts").innerHTML = filteredProducts.map((each) => template(each)).join("");
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

premProducts();