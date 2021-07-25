using System;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading;
using System.ComponentModel;

public class PushSendEmail
{           
    public Account sendEmail(ILogger log, DataEmail dEmail)
    {        
        Account oAccount = new Account();
        try
         {
             System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage();
             //string To          = "erivas@visualsat.com";
             //dEmail.From
             if(dEmail.Attachments!=null){
                 foreach(var attachment in dEmail.Attachments){
                    var bytes = Convert.FromBase64String(attachment.base64);
                    MemoryStream strm = new MemoryStream(bytes);
                    Attachment data = new Attachment(strm, attachment.name);
                    mail.Attachments.Add(data);                     
                 }
             }
             mail.From          = new MailAddress("visualsatuser@tasa.com.pe");
             mail.To.Add(new MailAddress(dEmail.To));
             mail.Subject       = dEmail.Subject;
             mail.Body          = dEmail.Body;
             mail.IsBodyHtml    = true;
            var client          = new SmtpClient();
            /*client.Host         = "smtp.gmail.com";
            client.Port         = 587;
            client.Credentials  = new NetworkCredential("rivasmej@gmail.com","qhbuyfvjcbmzinov");
            client.EnableSsl    = true;*/
            client.Host         = "smtp.office365.com";
            client.Port         = 587;
            client.Credentials  = new NetworkCredential("visitasa@tasa.com.pe","V1s174sa000779");  
            //client.Credentials  = new NetworkCredential("visualsatuser@tasa.com.pe","mfcvelazVsat12");                         
            client.UseDefaultCredentials = false; 
            client.EnableSsl    = false;
            client.TargetName = "STARTTLS/smtp.office365.com";
            // Send it...         
            client.Send(mail);
            log.LogInformation("Email sccessfully sent");            
            oAccount.error=0;
            oAccount.message="Email sccessfully sent";
            return oAccount;
         }
        catch (Exception ex)
        {
            log.LogInformation("Error in sending email: "+ ex.Message);
            //Console.WriteLine("Error in sending email: " + ex.Message);
            //Console.ReadKey();            
            oAccount.error=1;
            oAccount.message=ex.Message;
            return oAccount;
        }
    }
    
}

public class Account
{
    public int error { get; set; }
    public string message { get; set; }
}

public class DataEmail
{
    public string To { get; set; }
    public string From { get; set; }
    public string Subject { get; set; }    
    public string Body { get; set; }      
    public List<Files> Attachments {get; set;}  
}

public class Files
{
    public string base64 { get; set; }
    public string name { get; set; }

}