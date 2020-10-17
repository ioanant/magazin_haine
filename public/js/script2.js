$(document).ready(function(){
    showProduct()
 

})

function showProduct() {
        var html = ''
    $.get( "/selected_items", function( data ) {
        
    $.each(data,function(index,selected_items) {
            console.log(selected_items)

    $.get( "/products/"+selected_items.id_product, function(data ) {
      
        console.log(data)
        $.each(data,function(index,product){
        console.log(product)
      
            html = html + 
                '<figure class="figure">'+
                 '<img src="'+product.image_path+'">'+
	             '<figcaption>'+product.namep+'</figcaption>'
	             if(product.onsale===true){
	            var price_new=product.price-(product.price*product.commsale/100)
            html= html+
                 '<br><span class="price_new">'+price_new+' RON</span>'
	             }
	             else{
	            html= html+ '<span class="price">'+product.price+' RON</span>'
	            
	             }
	             
	            html=html+'<button id="button1" onclick="deleteRecord('+selected_items.id+')">Delete</button>'+'</figure>'
              
      
        })
        console.log(html+'1')
     $('.columns_4').html(html)
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
        url: '/selected_items/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
            location.reload(true);
        }
    });
}



