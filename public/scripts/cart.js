const template = (data) => `
<div class="Container container-fluid ">
    <figure class="figure">
        <img style="width: 253px; height: 351px" class="img-fluid rounded" src="${data.product_id.photo}" alt="${data._id}" />
            <figcaption class="editorial figure-caption">${data.product_id.publisher}</figcaption>
            <figcaption class="titulo figure-caption">${data.product_id.title}</figcaption>
            <figcaption class="precio figure-caption">${data.product_id.price}</figcaption>
            <button type="button" class="btn" onclick="DeleteFromCart('${data._id}')">DeleteFromCart</button>
            <input type="number" id="quantity-${data._id}" value="${data.quantity}" min="1">
            <button type="button" class="btn" onclick="updateQuantity('${data._id}', document.getElementById('quantity-${data._id}').value)">Update Quantity</button>
    </figure>
</div>
`;

async function fetchUserCart() {
    try {
        let sessionResponse = await fetch("/api/sessions/online");
        sessionResponse = await sessionResponse.json();
        const userId = sessionResponse.response._id;

        console.log("Usuario autenticado ID:", userId);

        let cartsResponse = await fetch("/api/carts/");
        cartsResponse = await cartsResponse.json();
        const allCarts = cartsResponse.response;

        console.log("Todos los carritos:", allCarts);

        const userCart = allCarts.find(cart => cart.user_id._id === userId);

        if (userCart) {
            const cartId = userCart._id;
            console.log("Carrito del usuario ID:", cartId);
            if (userCart.product_id) {
                document.querySelector("#productsOnCart").innerHTML = template(userCart);
            } else {
                console.log("El carrito del usuario está vacío.");
            }
        } else {
            console.error("No se encontró un carrito para el usuario autenticado.");
        }
    } catch (error) {
        console.error("Error al obtener el carrito del usuario:", error);
    }
}

fetchUserCart();


/*async function GetTotalPurchase(user_id) {
    try {

            const uid = user_id;
            let response = await fetch("/api/tickets/"+ uid);
            response = await response.json();
            console.log(response);
            if (response.statusCode === 200) {
                Swal.fire({
                    title: "Done!",
                    icon: "success",
                    timer: 5000,
                    timerProgressBar: true,
                    confirmButtonColor: "#ff3b3c",
                });
            } else {
                Swal.fire({
                    title: "Try again!",
                    icon: "error",
                    timer: 5000,
                    timerProgressBar: true,
                    confirmButtonColor: "#ff3b3c",
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
}

GetTotalPurchase();*/

    async function DeleteFromCart(product_id) {
        try {
            let response = await fetch("/api/sessions/online");
            response = await response.json();
            if (response.statusCode === 200) {
                const opts = {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                };
                const id = product_id;
                let response = await fetch("/api/carts/" + id, opts);
                response = await response.json();
                if (response.statusCode === 200) {
                    Swal.fire({
                        title: "Done!",
                        icon: "success",
                        timer: 5000,
                        timerProgressBar: true,
                        confirmButtonColor: "#ff3b3c",
                    });
                    location.reload()
                } else {
                    Swal.fire({
                        title: "Try again!",
                        icon: "error",
                        timer: 5000,
                        timerProgressBar: true,
                        confirmButtonColor: "#ff3b3c",
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
            Swal.fire({
                title: error.message,
                icon: "error",
                timer: 5000,
                timerProgressBar: true,
                confirmButtonColor: "#ff3b3c",
            });
        }
    };


/*async function EmptyCart(user_id) {
    try {
        let response = await fetch("/api/sessions/online");
        response = await response.json();
        if (response.statusCode === 200) {
            const opts = {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
            };
            const id = user_id;
            let response = await fetch("/api/carts/all/" + id, opts);
            response = await response.json();
            if (response.statusCode === 200) {
                Swal.fire({
                    title: "Cart Emptied",
                    icon: "success",
                    timer: 5000,
                    timerProgressBar: true,
                    confirmButtonColor: "#ff3b3c",
                });
                //location.reload();
            } else {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    timer: 5000,
                    timerProgressBar: true,
                    confirmButtonColor: "#ff3b3c",
                });
            }
        } else {
            Swal.fire({
                title: "Please log in!",
                icon: "warning",
                confirmButtonColor: "#ff3b3c",
                timer: 5000,
                timerProgressBar: true,
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: "An error occurred",
            icon: "error",
            timer: 5000,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
        });
    }
}
EmptyCart();*/

    async function updateQuantity(productId, newQuantity) {
        try {
            const url = `/api/carts/${productId}`;
            const data = { quantity: newQuantity };
    
            const opts = {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            };
    
            let response = await fetch(url, opts);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            response = await response.json();
            console.log(response);
    
            if (response.statusCode === 200) {
                Swal.fire({
                    title: "Quantity updated!",
                    icon: "success",
                    timer: 5000,
                    timerProgressBar: true,
                    confirmButtonColor: "#ff3b3c",
                });
                //location.reload();
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
            Swal.fire({
                title: "Error updating quantity",
                text: error.message,
                icon: "error",
                timer: 5000,
                timerProgressBar: true,
                confirmButtonColor: "#ff3b3c",
            });
        }
    }

