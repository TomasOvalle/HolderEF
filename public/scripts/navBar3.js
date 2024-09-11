async function printConditions3() {
    try {
        let response = await fetch("/api/sessions/online");
        response = await response.json();

        const user = response.response;

        if (user.role === 2) {
            template = `<li class="nav-item"> <a class="nav-link" href="./premProductsView.html">Admin Profile</a></li>`;
            document.querySelector("#conditions3").innerHTML = template;
        }
    } catch (error) {
        console.log(error);
    }
}