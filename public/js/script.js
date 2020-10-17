$(document).ready(function(){
    showMainCategories()
 showProductsByCategory()
    showCategories()
})

function showMainCategories() {
    $.get( "maincategories", function( data ) {
        var html = ''
        data.forEach(function(maincategories) {
            html = html + ' <li> <div class ="dropdown"><button class="dropbtn" onmouseover="showCategories('+maincategories.id+')">'+maincategories.namemc+'</button>'+
            '<div class="dropdown-content">'
            '</div>'+
              '</div>'+'</li>'
        })
        $('#navigation ul').html(html)
    });
}

function showCategories(mainCategoryId) {
    $.get( "/maincategories/"+mainCategoryId+'/categories', function( data ) {
        var html = ''
        data.forEach(function(categories) {
          //  console.log(categories.id)
            html = html + '<a href="#" onclick="showProductsByCategory('+categories.id+')">'+categories.namec+'</a>'
        })
        $('.dropdown-content').html(html)
    });
}


function showProductsByCategory(categoryId) {
        var url = '/categories/'+categoryId+'/products'
        console.log(url)
    $.get(url, function(data) {
        console.log(categoryId)
        var html = '';
        data.forEach(
            function(product) {
                if(product){
                console.log(product.id)
                html = html + '<figure class="figure">'+
                 '<img src="'+product.image_path+'">'+
	             '<figcaption>'+product.namep+'</figcaption>'
	             if(product.onsale===true){
	            var price_new=parseFloat(product.price-(product.price*product.commsale/100))
	            console.log(price_new)
                html= html+ '<span class="price_old">'+product.price+' RON</span> '+
                 '<span class="price_new">'+price_new+' RON</span>'
	             }
	             else{
	            html= html+ '<span class="price">'+product.price+' RON</span>'
	             }
	             	           
	            html=html+ 
	            '<div>'+
	            '<button id="button1">Detalii</button>'+
	            '<button type="submit" method="post" id="button" onclick="createRecord('+product.id+')">Cumpara</button>'+
	            '</div>'
                 +'<div>'
                 +'<div id="myModal" class="modal">'

                 +'<div class="modal-content">'
                 +'<span class="close">&times;</span>'
                 +'<p> Detalii produs </p>' 
                 +'<p>'+product.descriptionp+'</p>'
                 +'<button type="submit" method="post" id="button1" onclick="createRecord('+product.id+')">Cumpara</button>'
                 +'</div>'
                 +'</div>'
                 +'</div>'
                 +  '</figure>'
                 
                    
        
        if(categoryId &&  document.getElementById('hero-image')){
        var div = document.getElementById('hero-image');
        console.log(div)
        div.remove()
       
        }
        else if (categoryId && !document.getElementById('hero-image') ){
        
        $('#columns').html(html)
        
                    var modal = document.getElementById("myModal");

                    // Get the button that opens the modal
                    var btn = document.getElementById("button1");
                    
                    // Get the <span> element that closes the modal
                    var span = document.getElementsByClassName("close")[0];
                    
                    // When the user clicks the button, open the modal 
                    btn.onclick = function() {
                      modal.style.display = "block";
                      	console.log(product.id)
                    }
                    
                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function() {
                      modal.style.display = "none";
                    }
                    
                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function(event) {
                      if (event.target == modal) {
                        modal.style.display = "none";
                      }
                    }
            
        }
                }
                else{
                  var div = document.getElementById('figure');
                 console.log(div)
                  div.remove()
                }
            }
        )
            
    })
        
}


function createRecord(id) {
    event.preventDefault();
    $.ajax({
        url: '/insert/'+id,
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        //data:
        success: function(data) {
            
        } 
    });
}


