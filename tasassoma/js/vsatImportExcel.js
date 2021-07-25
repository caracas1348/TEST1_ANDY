function builexcel  () 
{
    //Reference the FileUpload element.
   
    var fileUpload = $("#fileUpload22")[0];

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
                    
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) 
                {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    
                    ProcessExcel(data);
                    //ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("Este navegador no soporta HTML5.");
        }
    } else {
        //alert("Por favor importe un archivo excel válido con el formato proporcionado");
        swal({
            title: "Formato inválido",
            text: "Por favor importe un archivo excel válido con el formato proporcionado.",
            timer: 6000,
            type: "info",
            showConfirmButton: true,
            confirmButtonText: "De acuerdo",
            });
        
    }
}
var lengexcel=0;
function ProcessExcel(data) {
    //Read the Excel File data.
   
    var workbook = XLSX.read(data, {
        type: 'binary'
    });
    var firstSheet = workbook.SheetNames[0];
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    lengexcel=0;
    if(excelRows.length>0)
    {

        vw_covid_list.cancelarForm();
        excelRows.map(item=>{
            var empr;
            var emprid;
           
            jsonExternalCompany.map(itemm=>{

               if(item.EMPRESA) 
               {
                    if((itemm.name.toLowerCase()).search(item.EMPRESA.toLowerCase())!=-1)
                    {
                        empr=itemm.name;
                        emprid=itemm.id;
                    }
              }

            });
            if(item.DOCUMENTO) 
            vw_covid_list.addContact(empr?empr:item.EMPRESA,item.NOMBRE,item.APELLIDO,item.DOCUMENTO,item.SEDE,item.AREA,item.OCUPACION,item.FECHA,emprid,item.RUC,item.TIPO);

        })
    }

    $("#fileUpload22").val("");
    
};



//reincorporación 
function builexcelReincorporacion() 
{
    //Reference the FileUpload element.
    var fileUpload = $("#fileUploadReincorporacion")[0];
    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcelReincorporacion(e.target.result);                    
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) 
                {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    
                    ProcessExcelReincorporacion(data);
                    //ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("Este navegador no soporta HTML5.");
        }
    } else {
        //alert("Por favor importe un archivo excel válido con el formato proporcionado");
        swal({
            title: "Formato inválido",
            text: "Por favor importe un archivo excel válido con el formato proporcionado.",
            timer: 6000,
            type: "info",
            showConfirmButton: true,
            confirmButtonText: "De acuerdo",
            });
        
    }
}

function ProcessExcelReincorporacion(data) {
    //Read the Excel File data.   
    var jsonReincorporacion =[];
    var workbook = XLSX.read(data, {
        type: 'binary'
    });
    var firstSheet = workbook.SheetNames[0];
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    lengexcel=0;
    if(excelRows.length>0)
    {
        vw_covid_list.cancelarForm();
        excelRows.map(item=>{
            var empr;
            var emprid;           
            
            if(item.DOCUMENTO) {
                var json = {
                    identity_document:item.DOCUMENTO,
                    start_date:item.FECHA,
                    final_date: moment().format("DD/MM/YYYY"),
                    id_status_alta_medica:3,
                    name_status_alta_medica:"Retornó a labores"

                }
            }
            //vw_covid_list.addContact(empr?empr:item.EMPRESA,item.NOMBRE,item.APELLIDO,item.DOCUMENTO,item.SEDE,item.AREA,item.OCUPACION,item.FECHA,emprid,item.RUC,item.TIPO);
        
        })
    }
    $("#fileUploadReincorporacion").val("");    
};