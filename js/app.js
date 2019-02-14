'use strict';

function Photo (photo) {
    this.title = photo.title;
    this.image_url = photo.image_url;
    this.description = photo.description;
    this.keyword = photo.keyword;
    this.horns = photo.horns;
}

Photo.allPhotoes =[];

Photo.prototype.render = function () {
    $('main').append('<div class = "clone"></div>');
    let photoClone = $('div[class = "clone"]');

    let photoHtml = $('#photo-template').html();
    photoClone.html(photoHtml);
    photoClone.find('h2').text(this.title);
    photoClone.find('img').attr('src', this.image_url);
    photoClone.find('img').attr('alt', this.keyword + this.description);
    // photoClone.find('p').text(this.description);
    photoClone.removeClass('clone');
    photoClone.attr('class', this.keyword);
}

Photo.prototype.selectPhoto = function () {
    // alert(1);
    $('#photo-selector').append($("<option></option>").attr('value', this.keyword).text(this.keyword));
    let optionClone= $('option[class="clone"]');
    let optionHtml = $('#photo-selector').html();

    
    optionClone.html=(optionHtml);
    // console.log((optionClone.find('option')));
    // console.log(typeof(optionClone.find('option')));
    // optionClone.find('option').text(this.keyword);
    // optionClone.find('option').attr('value', this.keyword);
    // optionClone.removeClass('clone');
    // optionClone.attr('id', this.keyword);
}


Photo.readJson = () => {
    $.get('data/page-1.json', 'json')
        .then(data => {
            data.forEach(obj => {
                Photo.allPhotoes.push(new Photo(obj));
                console.log(Photo.allPhotoes);
            })
        })
        .then(Photo.loadPhoto)
}

Photo.loadPhoto = () => {
    Photo.allPhotoes.forEach(photo => photo.render())
    Photo.allPhotoes.forEach(photo => photo.selectPhoto())
}

$('select[id="photo-selector"]').on('change', function() {
    let $selection = $(this).val();
    Photo.allPhotoes.forEach( photo => {
        if(photo.keyword === $selection){
            $(`div[class="${$selection}"]`).show();
        }else{
            $(`div[class="${photo.keyword}"]`).hide();
        }        
    });
  })

$(() => Photo.readJson());