
var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIRL="/api/irl";
var jpdbIML="/api/iml";
var DBNAME="SCHOOL-DB";
var RelationName="STUDENT-TABLE";
var connToken="90932164|-31949215330494139|90963872";
    $("#rollno").focus();
    function validateData() {
            var rollno = $("#rollno").val();
            if (rollno === "") {
                alert("Role Number is Required Value");
                $("#rollno").focus();
                return "";
            }
            var stuname = $("#stuname").val();
            if (stuname === "") {
                alert("Student Name is Required Value");
                $("#stuname").focus();
                return "";
            }
            var stuclass = $("#stuclass").val();
            if (stuclass === "") {
                alert("Class is Required Value");
                $("#stuclass").focus();
                return "";
            }
            var dob = $("#dob").val();
            if (dob === "") {
                alert("Student DOB is Required Value");
                $("#dob").focus();
                return "";
            }
            var address = $("#address").val();
            if (address === "") {
                alert("Student Address is Required Value");
                $("#address").focus();
                return "";
            }
            var enrolldate=$("#enrolldate").val();
            if(enrolldate==="")
            {
                alert("Student Enrollment Date in Required");
                $("#enrolldate").focus();
                return "";
            }
            var jsonStrObj = {
                rollno:rollno,
                name:stuname,
                class:stuclass,
                dob:dob,
                address:address,
                enrolldate:enrolldate
            };
            return JSON.stringify(jsonStrObj);
      }

    function resetForm() {
            $("#rollno").val("");
            $("#stuname").val("");
            $("#stuclass").val("");
            $("#dob").val("");
            $("#address").val("");
            $("#enrolldate").val("");
            $("#rollno").prop("disabled",false);
            $("#save").prop("disabled",true);
            $("#change").prop("disabled",true);
            $("#reset").prop("disabled",true);
            $("#rollno").focus();
    }
    function saveData() {
            var jsonStr = validateData();
            if (jsonStr === "") {
            return;
            }
            var putReqStr = createPUTRequest(connToken,
            jsonStr, DBNAME, RelationName);
            alert(putReqStr);
            jQuery.ajaxSetup({async: false});
            var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
            jpdbBaseURL, jpdbIML);
            jQuery.ajaxSetup({async: true});
            resetForm();
       }
       function changeData()
       {
         $("#change").prop("disabled",true);
         jsonStr=validateData();
         var updateRequest=createUPDATERecordRequest(connToken,jsonStr,DBNAME,RelationName,localStorage.getItem("recno"));
           jQuery.ajaxSetup({async:false});
           var resultObj = executeCommandAtGivenBaseUrl(updateRequest,
            jpdbBaseURL, jpdbIML);
            jQuery.ajaxSetup({async: true});
            resetForm();
        }
        function saveRecNo2Ls(jsonObj)
        {
             var lvData=JSON.parse(jsonObj.data);
             localStorage.setItem("recno",lvData.rec_no)
        }
        function getStuIdAsJsonObj()
        {
            var Id=$("#rollno").val();
            var jsonStr={
                rollno:Id
            };
            return JSON.stringify(jsonStr);
        }
        function fillData(jsonObj)
        {
            saveRecNo2Ls(jsonObj);
            var data=JSON.parse(jsonObj.data).record;
            $("#stuname").val(data.name);
            $("#stuclass").val(data.class);
            $("#dob").val(data.dob);
            $("#address").val(data.address);
            $("#enrolldate").val(data.enrolldate);
        }
        function getStudent()
        {
            var empIdJsonOBj=getStuIdAsJsonObj();
            var getRequest=createGET_BY_KEYRequest(connToken,DBNAME,RelationName,empIdJsonOBj);
            jQuery.ajaxSetup({async:false});
            var resultObj = executeCommandAtGivenBaseUrl(getRequest,
             jpdbBaseURL, jpdbIRL);
             jQuery.ajaxSetup({async: true});
             if(resultObj.status===400)
             {
                     $("#save").prop("disabled",false);
                     $("#reset").prop("disabled",false);
                     $("#change").prop("disabled",true);
                     $("#stuname").focus();
             }
             else if(resultObj.status===200)
             {
                $("#save").prop("disabled",true);
                $("#rollno").prop("disabled",true);
                fillData(resultObj);
                $("#reset").prop("disabled",false);
                $("#change").prop("disabled",false);
                $("#stuname").focus();
             }
             
        }
