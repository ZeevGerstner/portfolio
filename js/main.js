console.log('Starting up');

function initPage() {
    createProjs();
    renderProjs();
}

function renderProjs() {
    var projs = getProjs();
    var strHtmls = projs.map(function (proj) {
        return strHtmls = `<div class="col-md-4 col-sm-6 portfolio-item">
                                            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1" onclick="onClickProj('${proj.id}')">
                                            <div class="portfolio-hover"  >
                                            <div class="portfolio-hover-content">
                                                 <i class="fa fa-plus fa-3x"></i>
                                            </div>
                                            </div>
                                            <div class="image-container">    
                                                        <div class="img-fluid img-div" style="background-image: url(img/portfolio/${proj.img})">
                                                        </div>    
                                                </div>
                                            </a>
                                            <div class="portfolio-caption">
                                                <h4>${proj.name}</h4>
                                                <p class="text-muted">${proj.desc}</p>
                                            </div>
                                    </div>`
    })
    $('.myprojs').html(strHtmls.join(''))
}

function onClickProj(projId) {
    var projs = getProjs();
    var proj = getItembyId(projs, projId);
    $('.modal-body').html(`
                                             <h2>${proj.name}</h2>
                                            <p class="item-intro text-muted">${proj.title}</p>
                                            <p>${proj.desc}</p>
                                            <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.modalImg}" alt="" >
                                            <ul class="list-inline">
                                              <li>Date: ${proj.publishedAt}</li>
                                              <li>Category: ${proj.labels.join(', ')}</li>
                                            <a href="./projs/${proj.id}/index.html" target="_blank">${proj.name} link</a>
                                            </ul>
                                            <button class="btn btn-primary" data-dismiss="modal" type="button">
                                                <i class="fa fa-times"></i>
                                                Close Project</button>`
    )
}

function onSubmitMessage() {
    var $email = $('#email-adress');
    var $subject = $('#subject-area');
    var $message = $('#message-area');
    var url = `https://mail.google.com/mail/?view=cm&fs=1&to=zeev.gerstner@gmail.com&su=${$subject.val()}&b
    ody=${$message.val()}`;

    if (!$email.val()) return;
    window.open(url, '_blank');

    $email.val('');
    $subject.val('');
    $message.val('');
    $('.offcanvas-btn').removeClass('offcanvas-btn-open');
    $('.offcanvas-aside').removeClass('offcanvas-aside-open');

}

function onClosecontect(){
    $('.offcanvas-btn').removeClass('offcanvas-btn-open');
    $('.offcanvas-aside').removeClass('offcanvas-aside-open');

}

// function openCanvas() {
//     console.log('open');
//     $('.offcanvas-btn').addClass('offcanvas-btn-open');
//     $('.offcanvas-aside').addClass('offcanvas-aside-open');

//     document.querySelector(".offcanvas-aside").style.width = '70vm';
//     // document.getElementById(".contact").style.marginLeft = "250px";
// }

// /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
// function closeNav() {
//     console.log('open');
//     $('.offcanvas-btn').removeClass('offcanvas-btn-open');
//     $('.offcanvas-aside').removeClass('offcanvas-aside-open');

//     document.querySelector("mySidenav").style.width = '30vm';

//     // document.getElementById("main").style.marginLeft = "0";
// } 