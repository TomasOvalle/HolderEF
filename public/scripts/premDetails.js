console.log(location);
const queries = new URL(location.href)
const pid = queries.searchParams.get("id")
console.log("Product ID:", pid);

async function premDetails() {
    try {
        let response = await fetch("/api/sessions/online");
        response = await response.json();
        console.log(response);
        const user = response.response;
        console.log("User role:", user.role);
        if (user.role === 2) {
            console.log("Prem user detected:", user)
            template = (data) => `
    <div class="container-bakemonogatari">
        <div class="div1"> 
            <figure class="Bakemonogatari">
            <img class="img-fluid rounded" src="${data.photo}" alt="${data._id}" />
            </figure>
        </div>
        <div class="div2"> 
            <h1>${data.title}</h1>
            <h2>${data.price}</h2>
        </div>
        <div class="div3">
            <div class="d-grid gap-2 col-6">
                <a href="./productsAdm.html">
                    <button type="button" class="btn"">Administrar Producto</button>
                </a>
            </div>
        </div>
        <div class="div4"> 
            <p><strong>Publisher:</strong> ${data.publisher}</p>
            <p><strong>Category:</strong> ${data.category}</p>
        </div>
        <div class="div5"> 
            <h3>Sinopsis:</h3>
            <figcaption class="figure-caption"></figcaption>
        </div>
    </div>`;
    let res = await fetch("/api/products/"+pid);
    res = await res.json();
    console.log(res);
    const product = Array.isArray(res.response) ? res.response : [res.response];
    console.log(product);
    document.getElementById("premDetails").innerHTML = product
        .map((each) => template(each))
        .join("")
        }
    } catch (error) {
        console.log(error);
    }
}

premDetails();