

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

    $('#about').on('click', function(e){
       // var page = $(this).data('idd');
        // Directly navigate the browser to the new URL
       e.preventDefault();
        
        $.ajax({
            type:'GET',
            url:'/about',
            success:function(response){
            window.location.href = '/about';
            return;
            }
            
        })   
    });

    $('#contacts').on('click', function(e){
       // var page = $(this).data('idd');
        // Directly navigate the browser to the new URL
       e.preventDefault();
        
        $.ajax({
            type:'GET',
            url:'/about',
            success:function(response){
            window.location.href = '/contacts';
            return;
            }
            
        })   
    });

    $('#service').on('click', function(e){
       // var page = $(this).data('idd');
        // Directly navigate the browser to the new URL
       e.preventDefault();
        
        $.ajax({
            type:'GET',
            url:'/service',
            success:function(response){
            window.location.href = '/service';
            return;
            }
            
        })   
    });

     $('#home').on('click', function(e){
       // var page = $(this).data('idd');
        // Directly navigate the browser to the new URL
       e.preventDefault();
        
        $.ajax({
            type:'GET',
            url:'/',
            success:function(response){
            window.location.href = '/';
            return;
            }
            
        })   
    });


});



