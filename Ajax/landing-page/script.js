$(function () {

    // $.get("https://picsum.photos/id/0/info", function (response) {
    //     console.log(response);
    // });
    //  $.cookie('username', 'Elon Melon');

    // console.log($.cookie());
    // visitSite()

    function visitSite() {
        const visit = $.cookie('visit');
        if (visit) {
            $.cookie('visit', parseInt(visit) + 1);
        }
        else {
            $.cookie('visit', 1);
        }

        return $.cookie('visit');
    }

    $('.counter').html(visitSite());

    function getImage(id) {
        $.get(`https://picsum.photos/v2/list?page=1&limit=3`, function (response) {
            let items = response

            $.each(items, function (index, value) {
                $('#items1').append(createItem(value));
            })
        });
    }
    getImage();
    function createItem(params) {
        return `
        <div class="col-lg-4">
        <div class="rounded"><img src="${params.download_url}"></div>
        <h2>${params.author}</h2>
        </div>
        `
    }


    function getPost() {

        $.get(`https://dummyjson.com/posts?limit=3`, function (response) {
            posts = response.posts
            return response;
        });
    }


    let posts = getPost();
    let imageApple = 'apple.png'
    function getPhoto() {
        $.get(`https://picsum.photos/id/237/500/500`, function (response) {
            // console.log(response);
        });
    }
    let photo = getPhoto()
    let photos = [];
    for (let i = 0; i < 3; i++) {
        $.get(`https://picsum.photos/id/${i}/500/500`, function (response) {
            photos.push(`https://picsum.photos/id/${i}/500/500`);
        });
    }

    getPhoto();

    function createPosts(title, body, photo) {
        return `
        <div class="row featurette">
                <div class="col-md-7">
                    <h2 class="featurette-heading">${title}</h2>
                    <p class="lead">${body}</p>
                </div>
                <div class="col-md-5">
                    <img src = "${photo}" />

                </div>
            </div>

            <hr class="featurette-divider">
        `
    }

    function insertPost() {
        for (let i = 0; i < 3; i++) {
            $('#posts').append(createPosts(posts[i].title, posts[i].body, photos[i]));
        }
    }

    function aCreate() {
        insertPost();
    }
});



