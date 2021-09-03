function getListMyInvitations()
{

    var url = apiurlaccessrequest+"/api/Get-AccessRequest-All?httpmethod=objectlist&code="+GetAccessRequestAll+"";    
    
   
    var headers ={
        "apikey":"r$3#23516ewew5"
       
    }
    $.ajax({                    
        method: "POST",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function( data)
    {
       
       console.log(data)

       

    })
   
    
}