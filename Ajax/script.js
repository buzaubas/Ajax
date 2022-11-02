$(function () {

    $.get("https://dummyjson.com/products?limit=10", function (response) {
        $.each(response.products, function (index, value) {
            $('.products').append(createItem(value));
        });

    })

        .fail(function () {
            alert('error');
        });

    let timeout = null;
    const $searchInput = $('#search');

    $searchInput.on('keyup', function () {

        if (timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            let searchText = $(this).val();
            if (searchText.length >= 3) {
                getElement(searchText);
            }
        }, 1500);
    });


    function getElement(fraza) {
        $.get("https://dummyjson.com/products?limit=10", function (response) {

            let searchArray = response.products;

            var list = searchArray.filter(function (item) {
                return item.title.toLowerCase().indexOf(fraza.toLowerCase()) >= 0
            });

            $('.products').html('');

            //аналог for для jQuery
            $.each(list, function (index, value) {
                $('#liveResult').append(createLiveResult(value));
                $('.products').append(createItem(value));
            });

            // .fail(function () {
            //     alert('error');
            // });
        })
        .fail(function() {
            alert('error');
        }) 
    }

});

function createLiveResult(params) {
    return `<li class="list-group-item">${params.title}</li>`
}

function createItem(params) {
    return `
    <div class="col-3">
    <div class="card">
        <img src="${params.images[0]}" class="card-img-top" alt="${params.title}">
        <div class="rating">Rating: ${params.rating}</div>
        <div class="card-body">
            <h5 class="card-title">${params.title}</h5>
            <p class="card-text">${params.description}</p>
            <a href="#" class="btn btn-primary">Buy for ${params.price}</a>
        </div>
        </div>
    </div>`

}