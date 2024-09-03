document.querySelector("#productsRegister").addEventListener("click", async () => {
    try {
        let response = await fetch("/api/sessions/online");
        response = await response.json();
        console.log(response);

        const user = response.response; // Aquí defines al user

        const data = {
            title: document.querySelector("#Title").value,
            supplier_id: user._id  // Ahora user está definido
        };

        const publisher = document.querySelector("#publisher").value;
        const photo = document.querySelector("#photo").value;
        const price = document.querySelector("#Price").value;
        const category = document.querySelector("#Category").value;
        const stock = document.querySelector("#Stock").value;

        if (publisher && photo && price && category && stock) {
            data.publisher = publisher;
            data.photo = photo;
            data.price = price;
            data.category = category;
            data.stock = stock;
        }

        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        console.log(data);

        let register = await fetch("/api/products", opts);
        register = await register.json();
        console.log(register);

        if (register.statusCode === 201) {
            Swal.fire({
                title: register.message,
                icon: "success",
                timer: 5000,
                timerProgressBar: true,
                confirmButtonColor: "#ff3b3c",
            });

            // Resetear los campos del formulario después de la creación exitosa
            document.querySelector("#Title").value = "";
            document.querySelector("#publisher").value = "";
            document.querySelector("#photo").value = "";
            document.querySelector("#Price").value = "";
            document.querySelector("#Category").value = "";
            document.querySelector("#Stock").value = "";
        } else {
            Swal.fire({
                title: register.message,
                icon: "error",
                timer: 5000,
                timerProgressBar: true,
                confirmButtonColor: "#ff3bc"
            });
        }
    } catch (error) {
        console.error("Error", error);
        Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
            timer: 5000,
            timerProgressBar: true,
            confirmButtonColor: "#ff3bc"
        });
    }
});
