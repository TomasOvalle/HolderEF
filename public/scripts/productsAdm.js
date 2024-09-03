document.querySelector("#product-update").addEventListener("click", async () => {
    const product_id = document.querySelector("#product-id").value;
    const data = {};

    const price = document.querySelector("#product-price").value;
    const stock = document.querySelector("#product-stock").value;

    if ( price && stock) {
        data.price = price;
        data.stock = stock;
    }

    const opts = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }
    console.log(data);

    try {
        let response = await fetch("/api/sessions/online");
        response = await response.json();
        console.log(response);

        let update = await fetch(`/api/products/${product_id}`, opts);
        update = await update.json();
        console.log(update);

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
                confirmButtonColor: "#ff3bc"
            });
        }
        } catch (error) {
        console.error("Error", error);
        Swal.fire({
            title: error.message,
            icon: "error",
            timer: 5000,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
        });
    }
});

document.querySelector("#product-delete").addEventListener("click", async () => {
    const product_Id = document.querySelector("#product-Id").value;
    const data = {};

    const opts = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }
    console.log(data);

    try {
        let response = await fetch("/api/sessions/online");
        response = await response.json();
        console.log(response);

        let deleteProduct = await fetch(`/api/products/${product_Id}`, opts);
        deleteProduct = await deleteProduct.json();
        console.log(deleteProduct);

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
                confirmButtonColor: "#ff3bc"
            });
        }
    } catch (error) {
        console.error("Error", error);
        Swal.fire({
            title: error.message,
            icon: "error",
            timer: 5000,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
        });
    }
});