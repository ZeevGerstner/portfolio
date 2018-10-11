console.log('Starting up');

function initPage() {
    createProjs();
    renderProjs();
}

function renderProjs() {
    var projs = getProjs();
    var strHtmls = projs.map(function (proj) {
        console.log(proj.img);
        return strHtmls = `<div class="col-md-4 col-sm-6 portfolio-item">
                                            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1" onclick="onClickProj('${proj.id}')">
                                            <div class="portfolio-hover"  >
                                            <div class="portfolio-hover-content">
                                                 <i class="fa fa-plus fa-3x"></i>
                                            </div>
                                            </div>
                                            <div class="image-container">    
                                                        <div class="img-fluid img-div" style="background-image: url('${proj.img}') ">
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
                                    // <img class="img-fluid" src="${proj.img}" alt="" >

function onClickProj(projId) {
    var projs = getProjs();
    var proj = getItembyId(projs, projId);
    console.log('in');
    
    $('.modal-body').html(`
    <h2>${proj.name}</h2>
    <p class="item-intro text-muted">${proj.title}</p>
                                            <p>${proj.desc}</p>
                                            <img class="img-fluid d-block mx-auto" src="${proj.img}" alt="">
                                            <ul class="list-inline">
                                              <li>Date: January 2017</li>
                                              <li>Category: Games</li>
                                            </ul>
                                            <button class="btn btn-primary" data-dismiss="modal" type="button">
                                                <i class="fa fa-times"></i>
                                                Close Project</button>`
    )
}