$(document).ready(function(){
  createRecord()
    saveRecord()
    showSelectedItem();
    showProduct()
 

})
function showSelectedItem() {
        
         
        
}
function showProduct() {
    
    $.get( "/selected_items", function( data ) {
    $.each(data,function(index,selected_items) {
            console.log(selected_items)

    $.get( "/products/"+selected_items.id_product, function(data ) {
        console.log(data)
        $.each(data,function(index,product){
        console.log(product)
        var html = ''
            html = html + 
            
                '<figure class="figure">'+
                 '<img src="'+product.image_path+'">'+
	             '<figcaption>'+product.namep+'</figcaption>'
	             if(product.onsale===true){
	            var price_new=product.price-(product.price*product.commsale/100)
            html= html+ '<span class="price_old">'+product.price+' RON</span> <br>'+
                 '<span class="price_new">'+price_new+' RON</span>'+'</figure>'
	             }
	             else{
	            html= html+ '<span class="price">'+product.price+' RON</span>'
	            +'</figure>'
	             }
              
       $('.columns_4').html(html)
        })
      
    })
    })
})
}

function saveRecord() {
    var formData = $('#record_form').serializeObject();
        createRecord(formData);
    
}

function createRecord(formData) {
    $.ajax({
        url: '/orders',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
             //  window.location('comanda.html')
        } 
    });
}

function deleteRecord(id) {
    $.ajax({
        url: '/products/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}



