using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using System.Dynamic;
using System.Linq;

class BodyCheckListClass
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

       public List<CheckList> fnGetGroupCheckList()
            {
                List<CheckList> lobjs = new List<CheckList>();
                CheckList obj;

                using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
                {
                    conn.Open();
                    var textselect = "SELECT * FROM ssoma.Grupo WHERE 1=1 AND Active=1 ";
                    var StrQuery = textselect;
                    using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                    {

                        using (SqlDataReader dr = cmd.ExecuteReader())
                            while (dr.Read())
                            {
                                obj = new CheckList();
                                if (!dr.IsDBNull(dr.GetOrdinal("Id")))
                                {
                                    obj.Id = (int)(dr.GetValue(dr.GetOrdinal("Id")));
                                }
                                if (!dr.IsDBNull(dr.GetOrdinal("Description")))
                                {
                                    obj.Description = (string)(dr.GetValue(dr.GetOrdinal("Description")));
                                }
                                if (!dr.IsDBNull(dr.GetOrdinal("Tipo_Control")))
                                {
                                    obj.Tipo = (int)(dr.GetValue(dr.GetOrdinal("Tipo_Control")));
                                }
                                lobjs.Add(obj);
                            }
                    }
                    return lobjs;
                }

            }

            public List<SubGrupo> fnGetSubGrupoCheckList(int Id)
            {
                List<SubGrupo> lobjs = new List<SubGrupo>();
                SubGrupo obj;

                using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
                {
                    conn.Open();
                    var textselect = "SELECT * FROM ssoma.Subgrupo r WHERE 1=1 AND Active=1 ";
                    textselect = textselect + String.Format(" AND r.[Id] = {0}", Id);

                    var StrQuery = textselect;
                    using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                    {

                        using (SqlDataReader dr = cmd.ExecuteReader())
                            while (dr.Read())
                            {
                                obj = new SubGrupo();
                                if (!dr.IsDBNull(dr.GetOrdinal("Id")))
                                {
                                    obj.Id = (int)(dr.GetValue(dr.GetOrdinal("Id")));
                                }
                                if (!dr.IsDBNull(dr.GetOrdinal("Description")))
                                {
                                    obj.Description = (string)(dr.GetValue(dr.GetOrdinal("Description")));
                                }
                                if (!dr.IsDBNull(dr.GetOrdinal("Tipo_Control")))
                                {
                                    obj.Tipo = (int)(dr.GetValue(dr.GetOrdinal("Tipo_Control")));
                                }
                                if (!dr.IsDBNull(dr.GetOrdinal("Icono")))
                                {
                                    obj.Description = (string)(dr.GetValue(dr.GetOrdinal("Icono")));
                                }
                                if (!dr.IsDBNull(dr.GetOrdinal("Orden")))
                                {
                                    obj.Tipo = (int)(dr.GetValue(dr.GetOrdinal("Orden")));
                                }
                               
                                lobjs.Add(obj);
                            }
                    }
                    return lobjs;
                }

            }

            public List<Opcion> fnGetOpcionCheckList(int Id)
            {
                List<Opcion> lobjs = new List<Opcion>();
                Opcion obj;

                using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
                {
                    conn.Open();
                    var textselect = "SELECT * FROM ssoma.Opcion r WHERE 1=1 AND Active=1 ";
                    textselect = textselect + String.Format(" AND r.[Id] = {0}", Id);

                    var StrQuery = textselect;
                    using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                    {

                        using (SqlDataReader dr = cmd.ExecuteReader())
                            while (dr.Read())
                            {
                                obj = new Opcion();
                                if (!dr.IsDBNull(dr.GetOrdinal("Id")))
                                { 
                                    obj.Id = (int)(dr.GetValue(dr.GetOrdinal("Id")));
                                }
                               if (!dr.IsDBNull(dr.GetOrdinal("Description")))
                                {
                                    obj.Description = (string)(dr.GetValue(dr.GetOrdinal("Description")));
                                }
                                if (!dr.IsDBNull(dr.GetOrdinal("Tipo_Control"))) 
                                { 
                                    obj.Tipo = (int)(dr.GetValue(dr.GetOrdinal("Tipo_Control"))); 
                                }
                                lobjs.Add(obj);
                            }
                    }
                    return lobjs;
                }

            }
        }

            public class CheckList
            {
                public int Id { get; set; }
                public string Description { get; set; }
                public int Tipo { get; set; }
                public List<SubGrupo> SubGrupos { get; set; }

        }

        public class SubGrupo
        {
            public int Id { get; set;}
            public string Description { get; set; }
            public int Tipo { get; set; }
            public string Icono { get; set; }
            public int Orden { get; set; }
            public List<Opcion> Opcion { get; set; }

        }
        public class Opcion
        {
            public int Id { get; set; }
            public string Description { get; set; }
            public int Tipo { get; set; }

        }