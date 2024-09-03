async function printTicket(user_id) {
    try {
        let response = await fetch("/api/sessions/online");
        response = await response.json();

        if (response.statusCode === 200) {
            const id = user_id;
            let total = await fetch("/api/tickets/"+ id);
            total = await response.json();
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
        console.log(error);
    }
}

printTicket();