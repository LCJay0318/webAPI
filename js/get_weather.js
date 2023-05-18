$(function(){
    $.ajax({
        url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-007?Authorization=CWB-C5E0D8F8-4125-4CE0-B5CE-A0F221F88E56&locationName=%E4%B8%AD%E5%A3%A2%E5%8D%80&elementName=T",
        type: 'GET',
        datatype:'json',
        success: function(resource){
            console.log(resource);
            console.log(resource.records.locations[0].location[0].locationName);
            let weekday = ["SUN","MON","TUE","WED","THU","FRI","SAT"] ;// "SUN","MON","TUE","WED","THU","FRI","SAT"
            let weektemp = []
            for ( let i = 0 ; i < resource.records.locations[0].location[0].weatherElement[0].time.length ; i++) {
                if ( i % 2 == 0 ) {
                    weektemp.push(resource.records.locations[0].location[0].weatherElement[0].time[i].elementValue[0].value);
                    console.log(resource.records.locations[0].location[0].weatherElement[0].time[i].elementValue[0].value);
                }
            }

            let d=new Date() ; //取得今天日期
            let num = d.getDay() ; //取得今天星期幾，星期:1,2,3,4,5,6,7

            for ( let j = 0 ; j < 5 ; j++ ) {

                $("#weekday").find("h6").eq(j).html("<strong>"+weektemp[j]+"&#176;</strong>") ;
                
                if ( num == 7) { // weekday陣列為0~6，當超過6時要回到0
                    num = 0 ; // 帶入後陣列回到0
                }
                
                $("#weekday").find("small").eq(j).html(weekday[num]);
                num++
            }
            $("#city_name").html(resource.records.locations[0].location[0].locationName);
            $('#district').html(resource.records.locations[0].locationsName);
            $("#tempture").html(resource.records.locations[0].location[0].weatherElement[0].time[0].elementValue[0].value+"&#176;");
            console.log($("#weekday").find("h6"));

        },
        error: function(error){
            console.log(error);
        }
    })    
})