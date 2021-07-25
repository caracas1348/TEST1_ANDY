#r "Newtonsoft.Json"
#load "../Get-Question-Response/sqldb_questionresponse_get.csx"
#load "../Get-Item-Response/sqldb_itemresponse_get.csx"
#load "../Get-Option-Response/sqldb_optionresponse_get.csx"
#load "sqldb_response_get.csx"


using System;
using System.Globalization;
using System.Net;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Configuration;
using System.Collections;
using System.Text;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json; 

public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    var requestHeader = req.Headers;
    var vvapikeysecure = Environment.GetEnvironmentVariable("apikey",EnvironmentVariableTarget.Process);
    string vvapiKeyparameter = requestHeader["apiKey"];

    string vvhttpmethod = req.Query["httpmethod"];
    log.LogInformation("httpmethod: "+vvhttpmethod);

    long vnid = System.Convert.ToInt64(req.Query["id"]);
    string vvarea_responsible_id = req.Query["area_responsible_id"];
    long vvinspection_id = System.Convert.ToInt64(req.Query["inspection_id"]);
    long vninspector_id = System.Convert.ToInt64(req.Query["inspector_id"]);
    string vvinspector_id_hash = req.Query["inspector_id_hash"];


    DataAccessResponseGet vobj_ResponseData = new DataAccessResponseGet();
    DataAccessQuestionResponseGet vobj_sqldataQResponseData = new DataAccessQuestionResponseGet();
    DataAccessItemResponseGet vobj_sqldataIResponseData = new DataAccessItemResponseGet();
    DataAccessOptionResponseGet vobj_sqldataOResponseData = new DataAccessOptionResponseGet();

    string jsonrspt = "";

    if (vvapikeysecure != vvapiKeyparameter )
    {
        vvhttpmethod="";
        jsonrspt="{}";
    }

    if (vvhttpmethod == "objectlist")
    {
        List<Response> lobjs = vobj_ResponseData.funGetResponseList(log
                                                                        ,vnid
                                                                        ,vvarea_responsible_id
                                                                        ,vvinspection_id
                                                                        ,vninspector_id
                                                                        ,vvinspector_id_hash
                                                                        ,0
                                                                        );

        foreach (var response in lobjs)
        {
            List<QuestionResponse> qobjs = vobj_sqldataQResponseData.funGetQuestionResponseList(log,0,response.Id,0,null);
            response.response_question_list = qobjs;

            foreach (var question in qobjs)
            {
                List<ItemResponse> iobjs = vobj_sqldataIResponseData.funGetItemResponseList(log, 0, question.Id, 0, null, 0, null);

                ResponseTypes response_types1 = new ResponseTypes();
                response_types1.type_object_id = 1;

                ResponseTypes response_types2 = new ResponseTypes();
                response_types2.type_object_id = 2;

                ResponseTypes response_types3 = new ResponseTypes();
                response_types3.type_object_id = 3;

                ResponseTypes response_types4 = new ResponseTypes();
                response_types4.type_object_id = 4;

                ResponseTypes response_types5 = new ResponseTypes();
                response_types5.type_object_id = 5;

                ResponseTypes response_types6 = new ResponseTypes();
                response_types6.type_object_id = 6;

                ResponseTypes response_types7 = new ResponseTypes();
                response_types7.type_object_id = 7;

                ResponseTypes response_types8 = new ResponseTypes();
                response_types8.type_object_id = 8;

                List<ItemResponse> rItemList1 = new List<ItemResponse>();
                List<ItemResponse> rItemList2 = new List<ItemResponse>();
                List<ItemResponse> rItemList3 = new List<ItemResponse>();
                List<ItemResponse> rItemList4 = new List<ItemResponse>();
                List<ItemResponse> rItemList5 = new List<ItemResponse>();
                List<ItemResponse> rItemList6 = new List<ItemResponse>();
                List<ItemResponse> rItemList7 = new List<ItemResponse>();
                List<ItemResponse> rItemList8 = new List<ItemResponse>();

                List<ResponseTypes> responseTypes = new List<ResponseTypes>();

                foreach (var r_item in iobjs) {                
                    if(r_item.TypeObjectId == 1){
                        log.LogInformation("añado tipo 1");
                        rItemList1.Add(r_item);
                    }
                    if(r_item.TypeObjectId == 2){
                        log.LogInformation("añado tipo 2");
                        rItemList2.Add(r_item);
                    }
                    if(r_item.TypeObjectId == 3){
                        log.LogInformation("añado tipo 3");
                        rItemList3.Add(r_item);
                    }
                    if(r_item.TypeObjectId == 4){
                        log.LogInformation("añado tipo 4");
                        rItemList4.Add(r_item);
                    }
                    if(r_item.TypeObjectId == 5){
                        log.LogInformation("añado tipo 5");
                        rItemList5.Add(r_item);
                    }
                    if(r_item.TypeObjectId == 6){
                        log.LogInformation("añado tipo 6 y buscamos options");

                        List<OptionResponse> oobjs = vobj_sqldataOResponseData.funGetOptionResponseList(log,0,r_item.Id,0,null);
                        r_item.response_option_list = oobjs;

                        rItemList6.Add(r_item);
                    }
                    if(r_item.TypeObjectId == 7){
                        log.LogInformation("añado tipo 7");
                        
                        rItemList7.Add(r_item);
                    }
                    if(r_item.TypeObjectId == 8){
                        log.LogInformation("añado tipo 8 y buscamos options");

                        List<OptionResponse> oobjs = vobj_sqldataOResponseData.funGetOptionResponseList(log,0,r_item.Id,0,null);
                        r_item.response_option_list = oobjs;

                        rItemList8.Add(r_item);
                    }
                }

                response_types1.response_item_list = rItemList1;
                response_types2.response_item_list = rItemList2;
                response_types3.response_item_list = rItemList3;
                response_types4.response_item_list = rItemList4;
                response_types5.response_item_list = rItemList5;
                response_types6.response_item_list = rItemList6;
                response_types7.response_item_list = rItemList7;
                response_types8.response_item_list = rItemList8;

                responseTypes.Add(response_types1);
                responseTypes.Add(response_types2);
                responseTypes.Add(response_types3);
                responseTypes.Add(response_types4);
                responseTypes.Add(response_types5);
                responseTypes.Add(response_types6);
                responseTypes.Add(response_types7);
                responseTypes.Add(response_types8);

                question.response_types = responseTypes;
            
            }
        }

        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
    }

    if (vvhttpmethod == "object")
    {
            Response vobjs = vobj_ResponseData.funGetResponse(log, vnid, vvinspection_id);
        
            List<QuestionResponse> qobjs = vobj_sqldataQResponseData.funGetQuestionResponseList(log,0,vobjs.Id,0,null);
            vobjs.response_question_list = qobjs;

            foreach (var question in qobjs)
            {
                List<ItemResponse> iobjs = vobj_sqldataIResponseData.funGetItemResponseList(log, 0, question.Id, 0, null, 0, null);

                ResponseTypes response_types1 = new ResponseTypes();
                response_types1.type_object_id = 1;

                ResponseTypes response_types2 = new ResponseTypes();
                response_types2.type_object_id = 2;

                ResponseTypes response_types3 = new ResponseTypes();
                response_types3.type_object_id = 3;

                ResponseTypes response_types4 = new ResponseTypes();
                response_types4.type_object_id = 4;

                ResponseTypes response_types5 = new ResponseTypes();
                response_types5.type_object_id = 5;

                ResponseTypes response_types6 = new ResponseTypes();
                response_types6.type_object_id = 6;

                ResponseTypes response_types7 = new ResponseTypes();
                response_types7.type_object_id = 7;

                ResponseTypes response_types8 = new ResponseTypes();
                response_types8.type_object_id = 8;

                List<ItemResponse> rItemList1 = new List<ItemResponse>();
                List<ItemResponse> rItemList2 = new List<ItemResponse>();
                List<ItemResponse> rItemList3 = new List<ItemResponse>();
                List<ItemResponse> rItemList4 = new List<ItemResponse>();
                List<ItemResponse> rItemList5 = new List<ItemResponse>();
                List<ItemResponse> rItemList6 = new List<ItemResponse>();
                List<ItemResponse> rItemList7 = new List<ItemResponse>();
                List<ItemResponse> rItemList8 = new List<ItemResponse>();

                List<ResponseTypes> responseTypes = new List<ResponseTypes>();

                foreach (var r_item in iobjs) {                
                    if(r_item.TypeObjectId == 1){
                        log.LogInformation("añado tipo 1");
                        rItemList1.Add(r_item);
                    }
                    if(r_item.TypeObjectId == 2){
                        log.LogInformation("añado tipo 2");
                        rItemList2.Add(r_item);
                    }
                    if(r_item.TypeObjectId == 3){
                        log.LogInformation("añado tipo 3");
                        rItemList3.Add(r_item);
                    }
                    if(r_item.TypeObjectId == 4){
                        log.LogInformation("añado tipo 4");
                        rItemList4.Add(r_item);
                    }
                    if(r_item.TypeObjectId == 5){
                        log.LogInformation("añado tipo 5");
                        rItemList5.Add(r_item);
                    }
                    if(r_item.TypeObjectId == 6){
                        log.LogInformation("añado tipo 6 y buscamos options");

                        List<OptionResponse> oobjs = vobj_sqldataOResponseData.funGetOptionResponseList(log,0,r_item.Id,0,null);
                        r_item.response_option_list = oobjs;

                        rItemList6.Add(r_item);
                    }
                    if(r_item.TypeObjectId == 7){
                        log.LogInformation("añado tipo 7");
                        
                        rItemList7.Add(r_item);
                    }
                    if(r_item.TypeObjectId == 8){
                        log.LogInformation("añado tipo 8 y buscamos options");

                        List<OptionResponse> oobjs = vobj_sqldataOResponseData.funGetOptionResponseList(log,0,r_item.Id,0,null);
                        r_item.response_option_list = oobjs;

                        rItemList8.Add(r_item);
                    }
                }

                response_types1.response_item_list = rItemList1;
                response_types2.response_item_list = rItemList2;
                response_types3.response_item_list = rItemList3;
                response_types4.response_item_list = rItemList4;
                response_types5.response_item_list = rItemList5;
                response_types6.response_item_list = rItemList6;
                response_types7.response_item_list = rItemList7;
                response_types8.response_item_list = rItemList8;

                responseTypes.Add(response_types1);
                responseTypes.Add(response_types2);
                responseTypes.Add(response_types3);
                responseTypes.Add(response_types4);
                responseTypes.Add(response_types5);
                responseTypes.Add(response_types6);
                responseTypes.Add(response_types7);
                responseTypes.Add(response_types8);

                question.response_types = responseTypes;
            
            }

        if( vobjs.Id > 0 )
        {
            jsonrspt = JsonConvert.SerializeObject(vobjs, Formatting.Indented);
        }
        else 
        {
            jsonrspt="{}"; 
        }
    }


    if (vvhttpmethod == "objectIO")
    {

        List<Response> lobjs = vobj_ResponseData.funGetResponseList(log
                                                                    ,vnid
                                                                    ,vvarea_responsible_id
                                                                    ,vvinspection_id
                                                                    ,vninspector_id
                                                                    ,vvinspector_id_hash
                                                                    ,1
                                                                    );
        foreach (var response in lobjs)
        {
            List<QuestionResponse> qobjs = vobj_sqldataQResponseData.funGetQuestionResponseList(log,0,response.Id,0,null);

            foreach (var question in qobjs)
            {
                 List<ItemResponse> iobjs = vobj_sqldataIResponseData.funGetItemResponseList(log, 0, question.Id, 0, null, 0, null);
                 question.response_item_list = iobjs;
            }

            response.response_question_list = qobjs; 
        }



        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);

    }


    if (vvhttpmethod == "objectIAS")
    {
        Response vobjs = vobj_ResponseData.funGetResponse(log, vnid, vvinspection_id);
    
        List<QuestionResponse> qobjs = vobj_sqldataQResponseData.funGetQuestionResponseList(log,0,vobjs.Id,0,null);
        

            foreach (var question in qobjs)
            {
                List<Item> nItems = new List<Item>();
                List<ItemResponse> iobjs = vobj_sqldataIResponseData.funGetItemResponseList(log, 0, question.Id, 0, null, 0, null);
                int order = 1;
                int cant = 0;
                long id = 0;
                string title = "";
                bool hasObservation = false;
                string firstPoint = "";
                long firstPointId = 0;
                string secondPoint = "";
                long secondPointId = 0;
                string thirdPoint = "";
                long thirdPointId = 0;
                string observation = "";
                long observationId = 0;
                long criticality = 0;
                long indicatorResponseId = 0;
                long ObservationResponseId = 0;
                long criticalityResponseId = 0;
                long firstPointResponseId = 0;
                long secondPointResponseId = 0;
                long thirdPointResponseId = 0;
                foreach (var item in iobjs)
                {
                    cant = cant + 1;
                    
                    if(item.TypeObjectId == 6 && item.ItemDescription != null){
                        title = item.ItemDescription;
                        id = item.QuestionItemId;
                        indicatorResponseId = item.Id;
                        //buscar optiones item.Id
                        List<OptionResponse> lOobjs = vobj_sqldataOResponseData.funGetOptionResponseList(log,0,item.Id,0,null);

                        foreach (var option in lOobjs){
                            if(option.OptionDescription == "0.33"){
                                firstPoint = option.Text;
                                firstPointId = option.ItemOptionId;
                                firstPointResponseId = option.Id;
                            }else if(option.OptionDescription == "1"){
                                secondPoint = option.Text;
                                secondPointId = option.ItemOptionId;
                                secondPointResponseId = option.Id;
                            }else if(option.OptionDescription == "3"){
                                thirdPoint = option.Text;
                                thirdPointId = option.ItemOptionId;
                                thirdPointResponseId = option.Id;
                            }
                        }

                    }else if(item.TypeObjectId == 6 && item.ItemDescription == null){
                        criticality = item.QuestionItemId;
                        criticalityResponseId = item.Id;

                    }else if(item.TypeObjectId == 4 ){
                        if(item.Justify != null && item.Justify != ""){
                            hasObservation = true;
                        }
                        observation = item.Justify;
                        observationId = item.QuestionItemId;
                        ObservationResponseId = item.Id;
                    }

                    if(cant == 3){
                        Item nItem = new Item();
                        nItem.id = id;
                        nItem.title = title;
                        nItem.hasObservation = hasObservation;
                        nItem.firstPoint = firstPoint;
                        nItem.firstPointId = firstPointId;
                        nItem.secondPoint = secondPoint;
                        nItem.secondPointId = secondPointId;
                        nItem.thirdPoint = thirdPoint;
                        nItem.thirdPointId = thirdPointId;
                        nItem.observation = observation;
                        nItem.observationId = observationId;
                        nItem.criticality = criticality;
                        nItem.indicatorResponseId = indicatorResponseId;
                        nItem.firstPointResponseId = firstPointResponseId;
                        nItem.secondPointResponseId = secondPointResponseId;
                        nItem.thirdPointResponseId = thirdPointResponseId;
                        nItem.ObservationResponseId = ObservationResponseId;
                        nItem.criticalityResponseId = criticalityResponseId;

                        nItems.Add(nItem);

                        id = 0;
                        title = "";
                        hasObservation = false;
                        firstPoint = "";
                        firstPointId = 0;
                        secondPoint = "";
                        secondPointId = 0;
                        thirdPoint = "";
                        thirdPointId = 0;
                        observation = "";
                        observationId = 0;
                        criticality = 0;
                        firstPointResponseId = 0;
                        secondPointResponseId = 0;
                        thirdPointResponseId = 0;
                        indicatorResponseId = 0;
                        ObservationResponseId = 0;
                        criticalityResponseId = 0;
                        cant = 0;
                    }
                }                
                
                question.items = nItems;
            }

        vobjs.dataAsk = qobjs;

        if( vobjs.Id > 0 )
        {
            jsonrspt = JsonConvert.SerializeObject(vobjs, Formatting.Indented);
        }
        else 
        {
            jsonrspt="{}"; 
        }
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}