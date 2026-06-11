

$(function(){
    $('#s').on('click', function(e){
       // var page = $(this).data('idd');
        // Directly navigate the browser to the new URL
       e.preventDefault();
        
        $.ajax({
            type:'GET',
            url:'/signup',
            success:function(response){
            window.location.href = '/signup';
            return;
            }
            
        })
            

        
    });
});



