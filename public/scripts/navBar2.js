async function printConditions2() {
    try {
        let response = await fetch("/api/sessions/online");
        response = await response.json();

        const user = response.response;

        if (user.role === 1) {
            template = `<li class="nav-item"> <a class="nav-link" href="./profile.html">Admin Profile</a></li>`;
            document.querySelector("#conditions2").innerHTML = template;
        }
    } catch (error) {
        console.log(error);
    }
}

printConditions2();