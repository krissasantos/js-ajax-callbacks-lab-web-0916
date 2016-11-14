function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

$(document).ready(function (){
  handlebarsSetup()
});



function displayError() {
  //instead of:
  // $("errors").append(whatever you're appending)_

  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}


function searchRepositories(){
  event.preventDefault()
  var searchTerms = $('input#searchTerms').val()
  
   // $.ajax({
  //   method: 'GET',
 //   url: `https://api.github.com/search/repositories?q=${searchTerms}` 

  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data =>{
  
     // }).done(function(data){
    //   results(data)
   // })


 //__________replacement of .done portion. it is now squeezed into one function. see abstraction below:

  // var src = $("#results-template")[0].innerHTML
  // var template = Handlebars.compile(src)

  const template = Handlebars.compile($("#results-template").html())
  // var api_owner_list = template(data.items)
  // $("#results").append(api_owner_list)
  $('#results').html(template(data))


  }).fail(error => {
    displayError()
  })

}


function showCommits(href_package){  // alert("hey hey show commits here!")
// debugger
  event.preventDefault()
  var login = href_package.dataset.login
  var name = href_package.dataset.name

  $.get(`https://api.github.com/repos/${login}/${name}/commits`, data => {
    const template = Handlebars.compile($("#commits-template").html())
    $('#details').html(template(data))

  }).fail(error => {
    displayError()
  })

}




