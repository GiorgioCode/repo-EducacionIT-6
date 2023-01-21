//documentacion de la API: https://fakestoreapi.com/

const boton = $('button')
const divEstado = $('#estado')

boton.click(function (){
    $.get('https://fakestoreapi.com/products/',function(data){
        $.each(data, function(i,item){
            let tarjeta = `
            <div class="card" style="width: 18rem;">
            <img src="${item.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <p class="card-text h3">${item.title}</p>
            <p class="card-text ">${item.category}</p>
            <p class="card-text h2 aling-right">$ ${item.price} </p>
            </div>
            </div>`;
           $("#container").append(tarjeta);
       });
    })
})