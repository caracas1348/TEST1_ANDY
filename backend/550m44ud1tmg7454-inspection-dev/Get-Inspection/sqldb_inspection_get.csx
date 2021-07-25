using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessInspectionGet
{
    public List<InspectionGet> funGetInspectionList(ILogger log, long vnid
                                                , string vvcode
                                                , long vnform_id
                                                , long vnarea_id
                                                , long vnlocation_id
                                                , int vnfrequency_id
                                                , int vnassignment_type_id
                                                , int vntype
                                                , long vnstatus_id
                                                , string vvyear
                                                , string vvcreated_by
                                                , string vvcreated_date
                                                , string vvlast_updated_by
                                                , string vvlast_updated_date
                                                , long vninspector_id
                                                , string vvinspector_id_hash
                                                , string vvinspection_name
                                                , string vvcreated_date_end
                                                , long vnunit_id
                                                , int wCantResponses) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);
        var vvsqlconnectionOS = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureOperationsecure",EnvironmentVariableTarget.Process);
        List<InspectionGet> lobjs = new List<InspectionGet>();
        InspectionGet curobj;

        SqlDataReader dataReader;
        SqlDataReader dataReaderOS;
        SqlDataReader dataReaderRES;


        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
        {
            conn.Open();

            var textselect = "SELECT ";
            textselect = textselect + " i.Id, ";
            textselect = textselect + " i.Code, ";
            textselect = textselect + " i.FormularioId, ";
            textselect = textselect + " i.AreaId, ";
            textselect = textselect + " i.SedeId, ";
            textselect = textselect + " i.FrecuenciaId, ";
            textselect = textselect + " i.AsignacionTipoId, ";
            textselect = textselect + " i.TipoId, ";
            textselect = textselect + " i.StatusId, ";
            textselect = textselect + " i.Year, ";
            textselect = textselect + " i.Created_By, ";
            textselect = textselect + " i.Created_Date, ";
            textselect = textselect + " i.Last_Updated_By, ";
            textselect = textselect + " i.Last_Updated_Date, ";
            textselect = textselect + " s.Description, ";
            textselect = textselect + " a.Description, ";
            textselect = textselect + " un.Description, ";
            textselect = textselect + " ta.Description, ";
            textselect = textselect + " ti.Description, ";
            textselect = textselect + " i.InspectorId, ";
            textselect = textselect + " i.InspectorIdHash, ";
            textselect = textselect + " f.Description, ";
            textselect = textselect + " ins.PersonName, ";
            textselect = textselect + " st.Description, ";
            textselect = textselect + " i.WorkerNum, ";
            textselect = textselect + " i.Ep, ";
            textselect = textselect + " i.Reason, ";
            textselect = textselect + " i.Detail, ";
            textselect = textselect + " un.Address, ";
            textselect = textselect + " i.InspectorName ";
            //
            textselect = textselect + "FROM ssoma.Inspeccion i ";
            textselect = textselect + "LEFT JOIN auditoria.Sede s ON (s.Id = i.SedeId) ";
            textselect = textselect + "LEFT JOIN ssoma.Area a ON (i.AreaId = a.Id) ";
            textselect = textselect + "LEFT JOIN auditoria.Unidad_Negocio un ON (a.UnidadNegocioId=un.Id) ";
            textselect = textselect + "LEFT JOIN ssoma.Tipo_Asignacion ta ON (ta.Id=i.AsignacionTipoId) ";
            textselect = textselect + "LEFT JOIN ssoma.Frecuencia f ON (f.Id=i.FrecuenciaId) ";
            textselect = textselect + "LEFT JOIN ssoma.Inspector ins ON (ins.HashId=i.InspectorIdHash) ";
            textselect = textselect + "LEFT JOIN ssoma.Inspeccion_Status st ON (st.Id=i.StatusId) ";
            textselect = textselect + "LEFT JOIN ssoma.Tipo_Inspeccion ti  ON (ti.Id=i.TipoId) WHERE i.Active=1 ";
            if (vnid != 0) {
                textselect = textselect + String.Format(" AND i.[Id] = {0}",vnid);
            }
            if (vvcode != null) {
                textselect = textselect + String.Format(" AND i.[Code] = '{0}'",vvcode);
            }
            if (vnform_id > 0) {
                textselect = textselect + String.Format(" AND i.[FormularioId] = {0}",vnform_id);
            }
            if (vnarea_id > 0) {
                textselect = textselect + String.Format(" AND i.[AreaId] = {0}",vnarea_id);
            }
            if (vnlocation_id > 0) {
                textselect = textselect + String.Format(" AND i.[SedeId] = {0}",vnlocation_id);
            }
            if (vnfrequency_id > 0) {
                textselect = textselect + String.Format(" AND i.[FrecuenciaId] = {0}",vnfrequency_id);
            }
            if (vnassignment_type_id > 0) {
                textselect = textselect + String.Format(" AND i.[AsignacionTipoId] = {0}",vnassignment_type_id);
            }
            if (vntype > 0) {
                textselect = textselect + String.Format(" AND i.[TipoId] = {0}",vntype);
            }
            if (vnstatus_id > 0) {
                textselect = textselect + String.Format(" AND i.[StatusId] = {0}",vnstatus_id);
            }
            if (vvyear != null) {
                textselect = textselect + String.Format(" AND i.[Year] = '{0}'",vvyear);
            }

            if (vvcreated_by != null) {
                textselect = textselect + String.Format(" AND i.[Created_By] = {0}",vvcreated_by);
            }
            if (vvcreated_date != null) {
                textselect = textselect + String.Format(" AND i.[Created_Date] >= '{0}'",vvcreated_date);
            }
            if (vvcreated_date_end != null) {
                textselect = textselect + String.Format(" AND i.[Created_Date] <= '{0}'",vvcreated_date_end);
            }
            if (vvlast_updated_by != null) {
                textselect = textselect + String.Format(" AND i.[Last_Updated_By] = {0}",vvlast_updated_by);
            }
            if (vvlast_updated_date != null) {
                textselect = textselect + String.Format(" AND i.[Last_Updated_Date] = {0}",vvlast_updated_date);
            }
            if (vninspector_id > 0) {
                textselect = textselect + String.Format(" AND i.[InspectorId] = {0}",vninspector_id);
            }
            if (vvinspector_id_hash != null) {
                textselect = textselect + String.Format(" AND i.[InspectorIdHash] = '{0}'",vvinspector_id_hash);
            }
            if (vnunit_id > 0) {
                textselect = textselect + String.Format(" AND un.[Id] = '{0}'",vnunit_id);
            }

            var StrQuery = textselect + " ORDER BY i.Id DESC";

            log.LogInformation("StrQuery:"+StrQuery);

            using (SqlCommand cmd = new SqlCommand(StrQuery, conn)) 
            {
                using (dataReader = cmd.ExecuteReader()) 
                {
                    while (dataReader.Read())
                    {
                        log.LogInformation("Ejecutado y momento de recuperar las variables");
                        curobj = new InspectionGet();
                        curobj.Id = (long)(dataReader.GetValue(0));
                        if (!dataReader.IsDBNull(1)){ curobj.Code = (string)(dataReader.GetValue(1)); }
                        if (!dataReader.IsDBNull(2)){ curobj.FormularioId = (long)(dataReader.GetValue(2)); }
                        if (!dataReader.IsDBNull(3)){ curobj.AreaId = (long)(dataReader.GetValue(3)); }
                        if (!dataReader.IsDBNull(4)){ curobj.SedeId = (long)(dataReader.GetValue(4)); }
                        if (!dataReader.IsDBNull(5)){ curobj.FrecuenciaId = (int)(dataReader.GetValue(5)); }
                        if (!dataReader.IsDBNull(6)){ curobj.AsignacionTipoId = (int)(dataReader.GetValue(6)); }
                        if (!dataReader.IsDBNull(7)){ curobj.TipoId = (int)(dataReader.GetValue(7)); }
                        if (!dataReader.IsDBNull(8)){ curobj.StatusId = (int)(dataReader.GetValue(8)); }
                        if (!dataReader.IsDBNull(9)){ curobj.Year = (string)(dataReader.GetValue(9)); }

                        if (!dataReader.IsDBNull(14)){ curobj.LocationName = (string)(dataReader.GetValue(14)); }
                        if (!dataReader.IsDBNull(15)){ curobj.AreaName = (string)(dataReader.GetValue(15)); }
                        if (!dataReader.IsDBNull(16)){ curobj.UnitName = (string)(dataReader.GetValue(16)); }
                        if (!dataReader.IsDBNull(17)){ curobj.AssignTypeName = (string)(dataReader.GetValue(17)); }
                        if (!dataReader.IsDBNull(18)){ curobj.TypeName = (string)(dataReader.GetValue(18)); }


                        if (!dataReader.IsDBNull(10)){ curobj.Created_By = (string)(dataReader.GetValue(10)); }
                        if (!dataReader.IsDBNull(11)){ 
                            curobj.Created_Date = (DateTime)(dataReader.GetValue(11)); 
                            string formatted = curobj.Created_Date.ToString("dd/M/yyyy");
                            curobj.FCreated_Date = formatted;
                        }
                        if (!dataReader.IsDBNull(12)){ curobj.Last_Updated_By = (string)(dataReader.GetValue(12)); }
                        if (!dataReader.IsDBNull(13)){ curobj.Last_Updated_Date = (DateTime)(dataReader.GetValue(13)); }
                        if (!dataReader.IsDBNull(19)){ curobj.InspectorId = (long)(dataReader.GetValue(19)); }
                        if (!dataReader.IsDBNull(20)){ curobj.InspectorIdHash = (string)(dataReader.GetValue(20)); }
                        if (!dataReader.IsDBNull(21)){ curobj.FrequencyName = (string)(dataReader.GetValue(21)); }
                        if (!dataReader.IsDBNull(22)){ 
                            curobj.InspectorName = (string)(dataReader.GetValue(22)); 
                        }else{
                            if (!dataReader.IsDBNull(29)){ 
                                curobj.InspectorName = (string)(dataReader.GetValue(29)); 
                            }
                        }
                        if (!dataReader.IsDBNull(23)){ curobj.StatusName = (string)(dataReader.GetValue(23)); }
                        if (!dataReader.IsDBNull(24)){ curobj.WorkerNum = (int)(dataReader.GetValue(24)); }
                        if (!dataReader.IsDBNull(25)){ curobj.Ep = (string)(dataReader.GetValue(25)); }
                        if (!dataReader.IsDBNull(26)){ curobj.Reason = (string)(dataReader.GetValue(26)); }
                        if (!dataReader.IsDBNull(27)){ curobj.Detail = (string)(dataReader.GetValue(27)); }
                        if (!dataReader.IsDBNull(14)){ curobj.UnitAddress = (string)(dataReader.GetValue(14)); }

                        using (SqlConnection connOS= new SqlConnection(vvsqlconnectionOS))
                        {
                        connOS.Open();  
                            var QueryOS = String.Format("SELECT title FROM operationsecure.form WHERE id = {0}",(long)(dataReader.GetValue(2)));
                            
                            //log.LogInformation(QueryOS);

                            using (SqlCommand cmdOS = new SqlCommand(QueryOS, connOS))
                            {  
                                //Ejecutar Comando
                                using (dataReaderOS = cmdOS.ExecuteReader())  
                                {   
                                //Navegar en el Conjunto de Datos Recuperados
                                    while (dataReaderOS.Read())  
                                    {   
                                        if(!dataReaderOS.IsDBNull(0)){ curobj.FormTitle  = (string)(dataReaderOS.GetValue(0)); }

                                    }
                                }
                            }

                        connOS.Close();    
                        }

                        if(wCantResponses==1){
                            if(!dataReader.IsDBNull(20))
                            {
                                var QueryRES = "SELECT COUNT(InspectionId) FROM ssoma.Response WHERE  FlagFinalize = 1 ";
                                QueryRES = QueryRES + String.Format(" AND InspectionId = {0}",(long)(dataReader.GetValue(0)));

                                //log.LogInformation(QueryRES);

                                using (SqlCommand cmdRES = new SqlCommand(QueryRES, conn))                             
                                {  
                                    //Ejecutar Comando
                                    using (dataReaderRES = cmdRES.ExecuteReader())  
                                    {   
                                    //Navegar en el Conjunto de Datos Recuperados
                                        while (dataReaderRES.Read())  
                                        {   
                                            if(!dataReaderRES.IsDBNull(0)){ curobj.Responces  = (int)(dataReaderRES.GetValue(0)); }

                                        }
                                    }
                                } 
                            }
                        }
                        

                        if (vvinspection_name != null && vvinspection_name != "") {
                            //log.LogInformation("Se envio busqueda de nombre de inspeccion");
                            if(curobj.FormTitle.ToUpper().Contains(vvinspection_name.ToUpper())){
                                //log.LogInformation("coincide,agrego a la lista");
                                lobjs.Add(curobj);
                            }else{
                                //log.LogInformation("no coincide, descarto");
                            }
                        }else{
                            //log.LogInformation("No se envio busqueda de nombre, agrego a la lista");
                            lobjs.Add(curobj);
                        }
                        
                    }
                }
            }
            conn.Close();
            return lobjs;
        }
    }

    public List<InspectionGet> funGetInspectionListApp(ILogger log, long vnid
                                                , string vvcode
                                                , long vnform_id
                                                , long vnarea_id
                                                , long vnlocation_id
                                                , int vnfrequency_id
                                                , int vnassignment_type_id
                                                , int vntype
                                                , long vnstatus_id
                                                , string vvyear
                                                , string vvcreated_by
                                                , string vvcreated_date
                                                , string vvlast_updated_by
                                                , string vvlast_updated_date
                                                , long vninspector_id
                                                , string vvinspector_id_hash
                                                , string vvinspection_name
                                                , string vvcreated_date_end
                                                , long vnunit_id
                                                , int wCantResponses
                                                , int wIASII) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);
        var vvsqlconnectionOS = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureOperationsecure",EnvironmentVariableTarget.Process);
        List<InspectionGet> lobjs = new List<InspectionGet>();
        InspectionGet curobj;

        SqlDataReader dataReader;
        SqlDataReader dataReaderOS;
        SqlDataReader dataReaderRES;


        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
        {
            conn.Open();

            var textselect = "SELECT ";
            textselect = textselect + " i.Id, ";
            textselect = textselect + " i.Code, ";
            textselect = textselect + " i.FormularioId, ";
            textselect = textselect + " i.AreaId, ";
            textselect = textselect + " i.SedeId, ";
            textselect = textselect + " i.FrecuenciaId, ";
            textselect = textselect + " i.AsignacionTipoId, ";
            textselect = textselect + " i.TipoId, ";
            textselect = textselect + " i.StatusId, ";
            textselect = textselect + " i.Year, ";
            textselect = textselect + " i.Created_By, ";
            textselect = textselect + " i.Created_Date, ";
            textselect = textselect + " i.Last_Updated_By, ";
            textselect = textselect + " i.Last_Updated_Date, ";
            textselect = textselect + " s.Description, ";
            textselect = textselect + " a.Description, ";
            textselect = textselect + " un.Description, ";
            textselect = textselect + " ta.Description, ";
            textselect = textselect + " ti.Description, ";
            textselect = textselect + " i.InspectorId, ";
            textselect = textselect + " i.InspectorIdHash, ";
            textselect = textselect + " f.Description, ";
            textselect = textselect + " ins.PersonName, ";
            textselect = textselect + " st.Description, ";
            textselect = textselect + " i.WorkerNum, ";
            textselect = textselect + " i.Ep, ";
            textselect = textselect + " i.Reason, ";
            textselect = textselect + " i.Detail, ";
            textselect = textselect + " un.Address ";
            //
            textselect = textselect + "FROM ssoma.Inspeccion i ";
            textselect = textselect + "LEFT JOIN auditoria.Sede s ON (s.Id = i.SedeId) ";
            textselect = textselect + "LEFT JOIN ssoma.Area a ON (i.AreaId = a.Id) ";
            textselect = textselect + "LEFT JOIN auditoria.Unidad_Negocio un ON (a.UnidadNegocioId=un.Id) ";
            textselect = textselect + "LEFT JOIN ssoma.Tipo_Asignacion ta ON (ta.Id=i.AsignacionTipoId) ";
            textselect = textselect + "LEFT JOIN ssoma.Frecuencia f ON (f.Id=i.FrecuenciaId) ";
            textselect = textselect + "LEFT JOIN ssoma.Inspector ins ON (ins.HashId=i.InspectorIdHash) ";
            textselect = textselect + "LEFT JOIN ssoma.Inspeccion_Status st ON (st.Id=i.StatusId) ";
            textselect = textselect + "LEFT JOIN ssoma.Tipo_Inspeccion ti  ON (ti.Id=i.TipoId) WHERE i.Active=1 ";
            if (vnid != 0) {
                textselect = textselect + String.Format(" AND i.[Id] = {0}",vnid);
            }
            if (vvcode != null) {
                textselect = textselect + String.Format(" AND i.[Code] = '{0}'",vvcode);
            }
            if (vnform_id > 0) {
                textselect = textselect + String.Format(" AND i.[FormularioId] = {0}",vnform_id);
            }
            if (vnarea_id > 0) {
                textselect = textselect + String.Format(" AND i.[AreaId] = {0}",vnarea_id);
            }
            if (vnlocation_id > 0) {
                textselect = textselect + String.Format(" AND i.[SedeId] = {0}",vnlocation_id);
            }
            if (vnfrequency_id > 0) {
                textselect = textselect + String.Format(" AND i.[FrecuenciaId] = {0}",vnfrequency_id);
            }
            if (vnassignment_type_id > 0) {
                textselect = textselect + String.Format(" AND i.[AsignacionTipoId] = {0}",vnassignment_type_id);
            }
            if (vntype > 0) {
                textselect = textselect + String.Format(" AND i.[TipoId] = {0}",vntype);
            }
            if (vnstatus_id > 0) {
                textselect = textselect + String.Format(" AND i.[StatusId] = {0}",vnstatus_id);
            }
            if (vvyear != null) {
                textselect = textselect + String.Format(" AND i.[Year] = '{0}'",vvyear);
            }

            if (vvcreated_by != null) {
                textselect = textselect + String.Format(" AND i.[Created_By] = '{0}'",vvcreated_by);
            }
            if (vvcreated_date != null) {
                textselect = textselect + String.Format(" AND i.[Created_Date] >= '{0}'",vvcreated_date);
            }
            if (vvcreated_date_end != null) {
                textselect = textselect + String.Format(" AND i.[Created_Date] <= '{0}'",vvcreated_date_end);
            }
            if (vvlast_updated_by != null) {
                textselect = textselect + String.Format(" AND i.[Last_Updated_By] = {0}",vvlast_updated_by);
            }
            if (vvlast_updated_date != null) {
                textselect = textselect + String.Format(" AND i.[Last_Updated_Date] = {0}",vvlast_updated_date);
            }
            if (vninspector_id > 0) {
                textselect = textselect + String.Format(" AND i.[InspectorId] = {0}",vninspector_id);
            }
            if (vvinspector_id_hash != null) {
                textselect = textselect + String.Format(" AND i.[InspectorIdHash] = '{0}'",vvinspector_id_hash);
            }
            if (vnunit_id > 0) {
                textselect = textselect + String.Format(" AND un.[Id] = '{0}'",vnunit_id);
            }

            if (wIASII==1){
                textselect = textselect + String.Format(" AND i.[FormularioId] IN (358,359) ");
            }else{
                textselect = textselect + String.Format(" AND i.[FormularioId] NOT IN (358,359) ");
            }

            var StrQuery = textselect + " ORDER BY i.Id DESC";

            log.LogInformation("StrQuery:"+StrQuery);

            using (SqlCommand cmd = new SqlCommand(StrQuery, conn)) 
            {
                using (dataReader = cmd.ExecuteReader()) 
                {
                    while (dataReader.Read())
                    {
                        log.LogInformation("Ejecutado y momento de recuperar las variables");
                        curobj = new InspectionGet();
                        curobj.Id = (long)(dataReader.GetValue(0));
                        if (!dataReader.IsDBNull(1)){ curobj.Code = (string)(dataReader.GetValue(1)); }
                        if (!dataReader.IsDBNull(2)){ curobj.FormularioId = (long)(dataReader.GetValue(2)); }
                        if (!dataReader.IsDBNull(3)){ curobj.AreaId = (long)(dataReader.GetValue(3)); }
                        if (!dataReader.IsDBNull(4)){ curobj.SedeId = (long)(dataReader.GetValue(4)); }
                        if (!dataReader.IsDBNull(5)){ curobj.FrecuenciaId = (int)(dataReader.GetValue(5)); }
                        if (!dataReader.IsDBNull(6)){ curobj.AsignacionTipoId = (int)(dataReader.GetValue(6)); }
                        if (!dataReader.IsDBNull(7)){ curobj.TipoId = (int)(dataReader.GetValue(7)); }
                        if (!dataReader.IsDBNull(8)){ curobj.StatusId = (int)(dataReader.GetValue(8)); }
                        if (!dataReader.IsDBNull(9)){ curobj.Year = (string)(dataReader.GetValue(9)); }

                        if (!dataReader.IsDBNull(14)){ curobj.LocationName = (string)(dataReader.GetValue(14)); }
                        if (!dataReader.IsDBNull(15)){ curobj.AreaName = (string)(dataReader.GetValue(15)); }
                        if (!dataReader.IsDBNull(16)){ curobj.UnitName = (string)(dataReader.GetValue(16)); }
                        if (!dataReader.IsDBNull(17)){ curobj.AssignTypeName = (string)(dataReader.GetValue(17)); }
                        if (!dataReader.IsDBNull(18)){ curobj.TypeName = (string)(dataReader.GetValue(18)); }


                        if (!dataReader.IsDBNull(10)){ curobj.Created_By = (string)(dataReader.GetValue(10)); }
                        if (!dataReader.IsDBNull(11)){ 
                            curobj.Created_Date = (DateTime)(dataReader.GetValue(11)); 
                            string formatted = curobj.Created_Date.ToString("dd/M/yyyy");
                            curobj.FCreated_Date = formatted;
                        }
                        if (!dataReader.IsDBNull(12)){ curobj.Last_Updated_By = (string)(dataReader.GetValue(12)); }
                        if (!dataReader.IsDBNull(13)){ curobj.Last_Updated_Date = (DateTime)(dataReader.GetValue(13)); }
                        if (!dataReader.IsDBNull(19)){ curobj.InspectorId = (long)(dataReader.GetValue(19)); }
                        if (!dataReader.IsDBNull(20)){ curobj.InspectorIdHash = (string)(dataReader.GetValue(20)); }
                        if (!dataReader.IsDBNull(21)){ curobj.FrequencyName = (string)(dataReader.GetValue(21)); }
                        if (!dataReader.IsDBNull(22)){ curobj.InspectorName = (string)(dataReader.GetValue(22)); }
                        if (!dataReader.IsDBNull(23)){ curobj.StatusName = (string)(dataReader.GetValue(23)); }
                        if (!dataReader.IsDBNull(24)){ curobj.WorkerNum = (int)(dataReader.GetValue(24)); }
                        if (!dataReader.IsDBNull(25)){ curobj.Ep = (string)(dataReader.GetValue(25)); }
                        if (!dataReader.IsDBNull(26)){ curobj.Reason = (string)(dataReader.GetValue(26)); }
                        if (!dataReader.IsDBNull(27)){ curobj.Detail = (string)(dataReader.GetValue(27)); }
                        if (!dataReader.IsDBNull(14)){ curobj.UnitAddress = (string)(dataReader.GetValue(14)); }

                        using (SqlConnection connOS= new SqlConnection(vvsqlconnectionOS))
                        {
                        connOS.Open();  
                            var QueryOS = String.Format("SELECT title FROM operationsecure.form WHERE id = {0}",(long)(dataReader.GetValue(2)));
                            
                            //log.LogInformation(QueryOS);

                            using (SqlCommand cmdOS = new SqlCommand(QueryOS, connOS))
                            {  
                                //Ejecutar Comando
                                using (dataReaderOS = cmdOS.ExecuteReader())  
                                {   
                                //Navegar en el Conjunto de Datos Recuperados
                                    while (dataReaderOS.Read())  
                                    {   
                                        if(!dataReaderOS.IsDBNull(0)){ curobj.FormTitle  = (string)(dataReaderOS.GetValue(0)); }

                                    }
                                }
                            }

                        connOS.Close();    
                        }

                        if(wCantResponses==1){
                            if(!dataReader.IsDBNull(20))
                            {
                                var QueryRES = "SELECT COUNT(InspectionId) FROM ssoma.Response WHERE  FlagFinalize = 1 ";
                                QueryRES = QueryRES + String.Format(" AND InspectionId = {0}",(long)(dataReader.GetValue(0)));

                                //log.LogInformation(QueryRES);

                                using (SqlCommand cmdRES = new SqlCommand(QueryRES, conn))                             
                                {  
                                    //Ejecutar Comando
                                    using (dataReaderRES = cmdRES.ExecuteReader())  
                                    {   
                                    //Navegar en el Conjunto de Datos Recuperados
                                        while (dataReaderRES.Read())  
                                        {   
                                            if(!dataReaderRES.IsDBNull(0)){ curobj.Responces  = (int)(dataReaderRES.GetValue(0)); }

                                        }
                                    }
                                } 
                            }
                        }
                        

                        if (vvinspection_name != null && vvinspection_name != "") {
                            //log.LogInformation("Se envio busqueda de nombre de inspeccion");
                            if(curobj.FormTitle.ToUpper().Contains(vvinspection_name.ToUpper())){
                                //log.LogInformation("coincide,agrego a la lista");
                                lobjs.Add(curobj);
                            }else{
                                //log.LogInformation("no coincide, descarto");
                            }
                        }else{
                            //log.LogInformation("No se envio busqueda de nombre, agrego a la lista");
                            lobjs.Add(curobj);
                        }
                        
                    }
                }
            }
            conn.Close();
            return lobjs;
        }
    }


    public InspectionGet funGetInspection(ILogger log, long vnid) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);
        var vvsqlconnectionOS = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureOperationsecure",EnvironmentVariableTarget.Process);
        InspectionGet curobj = new InspectionGet();

        SqlDataReader dataReader;
        SqlDataReader dataReaderOS;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
            {
                conn.Open();

                var textselect = "SELECT ";
                textselect = textselect + " i.Id, ";
                textselect = textselect + " i.Code, ";
                textselect = textselect + " i.FormularioId, ";
                textselect = textselect + " i.AreaId, ";
                textselect = textselect + " i.SedeId, ";
                textselect = textselect + " i.FrecuenciaId, ";
                textselect = textselect + " i.AsignacionTipoId, ";
                textselect = textselect + " i.TipoId, ";
                textselect = textselect + " i.StatusId, ";
                textselect = textselect + " i.Year, ";
                textselect = textselect + " i.Created_By, ";
                textselect = textselect + " i.Created_Date, ";
                textselect = textselect + " i.Last_Updated_By, ";
                textselect = textselect + " i.Last_Updated_Date, ";
                textselect = textselect + " s.Description, ";
                textselect = textselect + " a.Description, ";
                textselect = textselect + " un.Description, ";
                textselect = textselect + " ta.Description, ";
                textselect = textselect + " ti.Description, ";
                textselect = textselect + " i.InspectorId, ";
                textselect = textselect + " i.InspectorIdHash, ";
                textselect = textselect + " f.Description, ";
                textselect = textselect + " ins.PersonName, ";
                textselect = textselect + " st.Description, ";
                textselect = textselect + " i.WorkerNum, ";
                textselect = textselect + " i.Ep, ";
                textselect = textselect + " i.Reason, ";
                textselect = textselect + " i.Detail, ";
                textselect = textselect + " un.Address, ";
                textselect = textselect + " un.Id ";
                //
                textselect = textselect + "FROM ssoma.Inspeccion i ";
                textselect = textselect + "LEFT JOIN auditoria.Sede s ON (s.Id = i.SedeId) ";
                textselect = textselect + "LEFT JOIN ssoma.Area a ON (i.AreaId = a.Id) ";
                textselect = textselect + "LEFT JOIN auditoria.Unidad_Negocio un ON (a.UnidadNegocioId=un.Id) ";
                textselect = textselect + "LEFT JOIN ssoma.Tipo_Asignacion ta ON (ta.Id=i.AsignacionTipoId) ";
                textselect = textselect + "LEFT JOIN ssoma.Frecuencia f ON (f.Id=i.FrecuenciaId) ";
                textselect = textselect + "LEFT JOIN ssoma.Inspector ins ON (ins.HashId=i.InspectorIdHash) ";
                textselect = textselect + "LEFT JOIN ssoma.Inspeccion_Status st ON (st.Id=i.StatusId) ";
                textselect = textselect + "LEFT JOIN ssoma.Tipo_Inspeccion ti  ON (ti.Id=i.TipoId) WHERE 1=1 ";
                
                if (vnid > 0) {
                    textselect = textselect + String.Format(" AND i.[Id] = {0}",vnid);
                }

                var StrQuery = textselect;

                log.LogInformation("StrQuery:"+StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn)) 
                {
                    using (dataReader = cmd.ExecuteReader()) 
                    {
                        while (dataReader.Read())
                        {
                            curobj.Id = (long)(dataReader.GetValue(0));
                            if (!dataReader.IsDBNull(1)){ curobj.Code = (string)(dataReader.GetValue(1)); }
                            if (!dataReader.IsDBNull(2)){ curobj.FormularioId = (long)(dataReader.GetValue(2)); }
                            if (!dataReader.IsDBNull(3)){ curobj.AreaId = (long)(dataReader.GetValue(3)); }
                            if (!dataReader.IsDBNull(4)){ curobj.SedeId = (long)(dataReader.GetValue(4)); }
                            if (!dataReader.IsDBNull(5)){ curobj.FrecuenciaId = (int)(dataReader.GetValue(5)); }
                            if (!dataReader.IsDBNull(6)){ curobj.AsignacionTipoId = (int)(dataReader.GetValue(6)); }
                            if (!dataReader.IsDBNull(7)){ curobj.TipoId = (int)(dataReader.GetValue(7)); }
                            if (!dataReader.IsDBNull(8)){ curobj.StatusId = (int)(dataReader.GetValue(8)); }
                            if (!dataReader.IsDBNull(9)){ curobj.Year = (string)(dataReader.GetValue(9)); }

                            if (!dataReader.IsDBNull(14)){ curobj.LocationName = (string)(dataReader.GetValue(14)); }
                            if (!dataReader.IsDBNull(15)){ curobj.AreaName = (string)(dataReader.GetValue(15)); }
                            if (!dataReader.IsDBNull(16)){ curobj.UnitName = (string)(dataReader.GetValue(16)); }
                            if (!dataReader.IsDBNull(17)){ curobj.AssignTypeName = (string)(dataReader.GetValue(17)); }
                            if (!dataReader.IsDBNull(18)){ curobj.TypeName = (string)(dataReader.GetValue(18)); }

                            if (!dataReader.IsDBNull(10)){ curobj.Created_By = (string)(dataReader.GetValue(10)); }
                            if (!dataReader.IsDBNull(11)){ 
                                curobj.Created_Date = (DateTime)(dataReader.GetValue(11)); 
                                string formatted = curobj.Created_Date.ToString("dd/M/yyyy");
                                curobj.FCreated_Date = formatted;
                            }
                            if (!dataReader.IsDBNull(12)){ curobj.Last_Updated_By = (string)(dataReader.GetValue(12)); }
                            if (!dataReader.IsDBNull(13)){ curobj.Last_Updated_Date = (DateTime)(dataReader.GetValue(13)); }
                            if (!dataReader.IsDBNull(19)){ curobj.InspectorId = (long)(dataReader.GetValue(19)); }
                            if (!dataReader.IsDBNull(20)){ curobj.InspectorIdHash = (string)(dataReader.GetValue(20)); }
                            if (!dataReader.IsDBNull(21)){ curobj.FrequencyName = (string)(dataReader.GetValue(21)); }
                            if (!dataReader.IsDBNull(22)){ curobj.InspectorName = (string)(dataReader.GetValue(22)); }
                            if (!dataReader.IsDBNull(23)){ curobj.StatusName = (string)(dataReader.GetValue(23)); }
                            if (!dataReader.IsDBNull(24)){ curobj.WorkerNum = (int)(dataReader.GetValue(24)); }
                            if (!dataReader.IsDBNull(25)){ curobj.Ep = (string)(dataReader.GetValue(25)); }
                            if (!dataReader.IsDBNull(26)){ curobj.Reason = (string)(dataReader.GetValue(26)); }
                            if (!dataReader.IsDBNull(27)){ curobj.Detail = (string)(dataReader.GetValue(27)); }
                            if (!dataReader.IsDBNull(28)){ curobj.UnitAddress = (string)(dataReader.GetValue(28)); }
                            if (!dataReader.IsDBNull(29)){ curobj.UnitId = (long)(dataReader.GetValue(29)); }

                            curobj.Inspector = funGetInspectoresAll(log, vnid);


                            using (SqlConnection connOS= new SqlConnection(vvsqlconnectionOS))
                            {
                            connOS.Open();  
                                var QueryOS = String.Format("SELECT title FROM operationsecure.form WHERE id = {0}",(long)(dataReader.GetValue(2)));
                                
                                log.LogInformation(QueryOS);

                                using (SqlCommand cmdOS = new SqlCommand(QueryOS, connOS))
                                {  
                                    //Ejecutar Comando
                                    using (dataReaderOS = cmdOS.ExecuteReader())  
                                    {   
                                    //Navegar en el Conjunto de Datos Recuperados
                                        while (dataReaderOS.Read())  
                                        {   
                                            if(!dataReaderOS.IsDBNull(0)){ curobj.FormTitle  = (string)(dataReaderOS.GetValue(0)); }

                                        }
                                    }
                                }

                                

                            connOS.Close();    
                            }
                        }
                    }
                }
                conn.Close();
                //return curobj;
            }
        }
        catch (Exception ex)
        {

        }

        return curobj;
    }
    public List<Inspector> funGetInspectoresAll(ILogger log, long vnid)
    {
         var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);
        Inspector curobjIns;
        List<Inspector> lobjsI = new List<Inspector>();

        SqlDataReader dataReader;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
            {
                conn.Open();

                var textselect = "SELECT i.PersonName, i.HashId FROM ssoma.Inspector i INNER JOIN ssoma.Inspeccion_Status_Log sl  ON (i.HashId=sl.InspectorId)  WHERE 1=1 ";
                      
                                if (vnid > 0) {
                    textselect = textselect + String.Format(" AND sl.InspectionId = {0}",vnid);
                }

                var StrQuery = textselect;

                log.LogInformation("StrQuery:"+StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn)) 
                {
                    using (dataReader = cmd.ExecuteReader()) 
                    {
                        while (dataReader.Read())
                        {
                             curobjIns = new Inspector();
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("PersonName"))){ curobjIns.PersonName = (string)(dataReader.GetValue(dataReader.GetOrdinal("PersonName"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("HashId"))){ curobjIns.HashId = (string)(dataReader.GetValue(dataReader.GetOrdinal("HashId"))); }
                            lobjsI.Add(curobjIns);

                        }
                    }
                }
                conn.Close();
                return lobjsI;
            }
        }
        catch (Exception ex)
        {

        }

        return lobjsI;
        
    }

    public Inspector funGetInspector(ILogger log, string vvhash_id) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        Inspector curobj = new Inspector();

        SqlDataReader dataReader;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
            {
                conn.Open();

                var textselect = "SELECT ";
                textselect = textselect + " i.PersonName, ";
                textselect = textselect + " i.HashId, ";
                textselect = textselect + " i.Email ";

                textselect = textselect + "FROM ssoma.Inspector i ";
                textselect = textselect + "WHERE 1=1 ";

                if (vvhash_id != null) {
                    textselect = textselect + String.Format(" AND i.[HashId] = '{0}'",vvhash_id);
                }

                var StrQuery = textselect;

                log.LogInformation("StrQuery:"+StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn)) 
                {
                    using (dataReader = cmd.ExecuteReader()) 
                    {
                        while (dataReader.Read())
                        {
                            
                            if (!dataReader.IsDBNull(0)){ curobj.PersonName = (string)(dataReader.GetValue(0)); }
                            if (!dataReader.IsDBNull(1)){ curobj.HashId = (string)(dataReader.GetValue(1)); }
                            if (!dataReader.IsDBNull(2)){ curobj.Email  = (string)(dataReader.GetValue(2)); }

                        }
                    }
                }
                conn.Close();
                //return curobj;
            }
        }
        catch (Exception ex)
        {

        }

        return curobj;
    }
    
}

public class InspectionGet 
{
    public long Id {get;set;}
    public string Code {get;set;}
    public long FormularioId {get;set;}
    public long AreaId {get;set;}
    public long SedeId {get;set;} 
    public int FrecuenciaId {get;set;} 
    public int AsignacionTipoId {get;set;}
    public int TipoId {get;set;}
    public int StatusId {get;set;}
    public string Year {get;set;}
    public long InspectorId {get;set;}
    public int WorkerNum {get;set;}
    public string Ep {get;set;}
    public string Reason {get;set;}
    public string Detail {get;set;}
    public string LocationName {get;set;}
    public string AreaName {get;set;}
    public long UnitId {get;set;}
    public string UnitName {get;set;}
    public string UnitAddress {get;set;}
    public string AssignTypeName {get;set;}
    public string TypeName {get;set;}
    public string InspectorIdHash {get;set;}
    public string FrequencyName {get;set;}
    public string InspectorName {get;set;}
    public string FormTitle {get;set;}
    public string StatusName {get;set;}
    public string FCreated_Date {get;set;}

    public int Responces {get;set;}
    public string Created_By {get;set;}
    public DateTime Created_Date {get;set;}
    public string Last_Updated_By {get;set;}
    public DateTime Last_Updated_Date {get;set;}
    public List<Inspector> Inspector { get; set; }

}

public class listapp 
{
    public int numias {get;set;}
    public int numinopinadas {get;set;}
    public List<InspectionGet> lista { get; set; }
}

public class listapp2 
{
    public List<InspectionGet> lista { get; set; }
    public List<InspectionGet> listaOtras { get; set; }
}

public class Inspector 
{    
    public string PersonName {get;set;}
    public string HashId {get;set;}
    public string Email {get;set;}

}