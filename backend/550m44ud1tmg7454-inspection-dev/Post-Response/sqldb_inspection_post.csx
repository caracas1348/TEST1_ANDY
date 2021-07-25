using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessPutStatusInspection
{

    public string funPutStatusInspection(ILogger log, long curid,int StatusId, string InspectorId, string Last_Updated_By)
    {
        log.LogInformation("en funPutStatusInspection: StatusId -> "+StatusId);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);
        long IdStatusPrevio= 0;
        SqlDataReader dataReader;

        log.LogInformation("curid :"+curid);

        TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");
            DateTime Last_Updated_Date= TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);

        long newlongid;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            var textselectpart1 = "UPDATE ssoma.Inspeccion SET  ";
            var textselectpart2 = " WHERE 1=1 AND Id = @vncurid ";

            textselectpart1 = textselectpart1 + " Last_Updated_By = @last_updated_by,Last_Updated_Date = @last_updated_date";

            textselectpart1 = textselectpart1 + ", StatusId = @status_id";


            textselectpart2 = textselectpart2 + " ; ";

            var StrQuery =  textselectpart1 + textselectpart2;

            log.LogInformation("StrQuery:"+StrQuery);

            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {
                cmd.Parameters.AddWithValue("@vncurid", curid);
                cmd.Parameters.AddWithValue("@last_updated_date",Last_Updated_Date);
                cmd.Parameters.AddWithValue("@last_updated_by", Last_Updated_By);
                cmd.Parameters.AddWithValue("@status_id", StatusId);

                var modified1 = cmd.ExecuteNonQuery();
                log.LogInformation("modified:"+modified1);
            }

                var textselect = "SELECT L.StatusId FROM ssoma.Inspeccion_Status_Log L WHERE 1=1 AND L.InspectionId =" + curid.ToString() + " AND L.Active = 1;";

                 var StrQuery1 = textselect;

                log.LogInformation("StrQuery:"+StrQuery1);

                  using (SqlCommand cmd = new SqlCommand(StrQuery1, conn))
                {
                    using (dataReader = cmd.ExecuteReader())
                    {
                        while(dataReader.Read())
                        {

                             IdStatusPrevio = (int)(dataReader.GetValue(0));



                        }


                    }
                }

            log.LogInformation("Ingreso Metodo: luego de open");

            var sqlDel = "UPDATE ssoma.Inspeccion_Status_Log SET Active = 0 WHERE InspectionId = " + curid.ToString() + "; ";

            var textselectpartI1 = "INSERT INTO ssoma.Inspeccion_Status_Log (  ";
            var textselectpartI2 = " output INSERTED.ID VALUES( ";

            textselectpartI1 = textselectpartI1 + " Active,Created_By,Created_Date,Last_Updated_By,Last_Updated_Date";
            textselectpartI2 = textselectpartI2 + " @active,@created_by,@created_date,@last_updated_by,@last_updated_date";

            if (curid > 0) {
                textselectpartI1 = textselectpartI1 + ",InspectionId";
                textselectpartI2 = textselectpartI2 + ",@inspection_id";
            }
            if (StatusId > 0) {
                textselectpartI1 = textselectpartI1 + ",StatusId";
                textselectpartI2 = textselectpartI2 + ",@status_id";
            }
            if (InspectorId != ""){
                textselectpartI1 = textselectpartI1 + ",InspectorId";
                textselectpartI2 = textselectpartI2 + ",@inspector_id";
            }

               if (IdStatusPrevio > 0 ) {
                textselectpartI1 = textselectpartI1 + ",IdStatusPrevio";
                textselectpartI2 = textselectpartI2 + ",@IdStatusPrevio";
            }

            textselectpartI1 = textselectpartI1 + " ) ";
            textselectpartI2 = textselectpartI2 + " ); ";

            var StrQuery2 = sqlDel + textselectpartI1 + textselectpartI2;

            log.LogInformation("StrQuery:"+StrQuery2);

            using (SqlCommand cmd = new SqlCommand(StrQuery2, conn))
            {
                cmd.Parameters.AddWithValue("@active", 1);
                cmd.Parameters.AddWithValue("@created_date", Last_Updated_Date);
                cmd.Parameters.AddWithValue("@last_updated_date", Last_Updated_Date);
                cmd.Parameters.AddWithValue("@created_by", Last_Updated_By);
                cmd.Parameters.AddWithValue("@last_updated_by", Last_Updated_By);

                cmd.Parameters.AddWithValue("@inspection_id", curid);
                cmd.Parameters.AddWithValue("@status_id",StatusId);
                if (InspectorId != "") cmd.Parameters.AddWithValue("@inspector_id", InspectorId);
                cmd.Parameters.AddWithValue("@IdStatusPrevio",IdStatusPrevio);


                var modified = cmd.ExecuteNonQuery();
                newlongid = Convert.ToInt64(modified);
                log.LogInformation("modified:"+modified);
            }



            if (conn.State == System.Data.ConnectionState.Open) {
                conn.Close();
            }
            return "success";
        }
        return "error";
    }

}



