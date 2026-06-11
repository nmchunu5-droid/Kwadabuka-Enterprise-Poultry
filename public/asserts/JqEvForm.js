

$(function(){
    
    // 1. Define the requester function outside or at the top so it is available
    var requester = function(formdata, form_url){
        $.ajax({
            type: 'POST',
            url: '/Formdata/'+form_url,
            data: formdata,
            success: function(data){
                window.location.href = '/signup/signupP';
                console.log("Success:", data);
                // Handle what happens after successful signup here
                //window.location.href = '/index/signup/signupP';
            },
            error: function(err) {
                console.log("AJAX error:", err);
            }
        });
    };


    // 2. Pass 'e' into the function to prevent default form submission
    $('form').on('submit', function(e){
        e.preventDefault();
        
        console.log('Form submitted');
        var sid = $(this).data('sid');
        

        switch(sid){
            // 3. Put quotes around the string case
            case 'email_verifyer':
                // 4. Corrected data retrieval: target actual input elements inside this form
               
                var formdata={
                        useremail: $(this).find('.email-input').val(),
                        code:'',   
                    };
                
                // 5. URL must match your Express backend route
                var form_url = 'email_verifyer';

                requester(formdata, form_url);
                break;

            case 'signupP':
                var formdata={
                    username:$(this).find('.username').val(),
                    userpassword:$(this).find('.userpassword').val(),
                    useremail_Key:$(this).find('.useremail').val(),
                }

                var form_url = 'user_profile';
                
                requester(formdata, form_url);
                break;



            default: 
                console.log("SUBMIT BUTTON ID NOT FOUND");
        }
    });

   /* $('#submitFromEmailVerityer').on('click',function(e){
        e.preventDefault();
        window.location.href = '/index/signup/signupP';
    })*/


});
