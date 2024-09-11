async function fetchProfile() {
    try {
        let response = await fetch("/api/sessions/online");
        response = await response.json();
        //console.log(response);

        const user = response.response;
        const uid = response.response._id;

        //console.log(uid);
        //console.log("User role:", user.role);

        if (user.role === 1 || user.role === 2) {
            //console.log(user);
            template = (data) =>`
                    <article class="tw-followCard">
                        <header class="tw-followCard-header">
                            <img class="tw-followCard-avatar" src="${data.photo}" alt="${data._id}">
                            <div class="tw-followCard-info">
                                <span class="tw-followCard-infoUserName">@${data.email}</span>
                            </div>
                        </header>
                    </article>`;

        let res = await fetch("/api/users/"+uid);
        res = await res.json();
        //console.log(res);
        const userProfile = Array.isArray(res.response) ? res.response : [res.response];
        //console.log(userProfile);
        document.getElementById("profile").innerHTML = userProfile
            .map((each) => template(each))
            .join("");

            document.querySelector("#productsRegister").addEventListener("click", async () => {
                const data = {
                    title: document.querySelector("#Title").value,
                    publisher: document.querySelector("#publisher").value,
                    photo: document.querySelector("#photo").value,
                    price: document.querySelector("#Price").value,
                    category: document.querySelector("#Category").value,
                    stock: document.querySelector("#Stock").value
                };
                //console.log(data);

                const opts = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
                //console.log(data);
            
                try {
                    let response = await fetch("/api/sessions/online");
                    response = await response.json();
                    //console.log(response);
            
                    let register = await fetch("/api/products", opts);
                    register = await register.json();
                    //console.log(register);
            
                    if (register.statusCode === 201) {
                        Swal.fire({
                            title: "Done!",
                            icon: "success",
                            timer: 5000,
                            timerProgressBar: true,
                            confirmButtonColor: "#ff3b3c",
                        });
                        document.querySelector("#Title").value = "";
                        document.querySelector("#publisher").value = "";
                        document.querySelector("#photo").value = "";
                        document.querySelector("#Price").value = "";
                        document.querySelector("#Category").value = "";
                        document.querySelector("#Stock").value = "";
                    } else {
                        Swal.fire({
                            title: "The product has not created",
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
            })

        } else {
            console.log("Non admin o prem user detected:", user);
            template = (data) => `                
                <div class="Container container-fluid ">
                    <figure class="figure">
                            <img style="width: 253px; height: 351px" class="img-fluid rounded" src="${data.photo}" alt="${data._id}" />
                        <figcaption class="editorial figure-caption">${data.email}</figcaption>
                    </figure>
                </div>`;

        let userProfile = await fetch("/api/users/"+uid);
        userProfile = await userProfile.json();
        userProfile = userProfile.response

        //console.log(response);
        //console.log(userProfile);

        if (userProfile?.length > 0) {
            document.getElementById("profile").innerHTML = userProfile
            .map((each) => template(each))
            .join("");
        }
        }
    } catch (error) {
        console.error("Error", error);
    }
}

fetchProfile();
