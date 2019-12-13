$(function(){
	if (window.host.indexOf("one.") >= 0) return false;

	if ( (window.host.indexOf("w.personalslim") < 0) && (window.host.indexOf("personalslim.ru") >= 0) && (($(".price_field_s1").val()=="1")||($(".price_field_s1").val()=="0"))){
		return false;
		console.log('exit');
	}
	if ((window.country == "MD") && ($(".price_field_s1").val()=="175")){
		return false;
	}
	if ((window.country == "UA") && ($(".price_field_s1").val()=="1")){
		return false;
	}
	
	if (((window.host.indexOf("gelmifort") >= 0) || (window.host.indexOf("galitoks") >= 0) || (window.host.indexOf("nailz") >= 0) || (window.host.indexOf("dialux") >= 0) || (window.host.indexOf("smoking-lock") >= 0) || (window.host.indexOf("loromax") >= 0) || (window.host.indexOf("skin-matrix") >= 0) || (window.host.indexOf("inblanc") >= 0) || (window.host.indexOf("papiderm") >= 0) || (window.host.indexOf("ironprost") >= 0) || (window.host.indexOf("alkotoxic") >= 0) || (window.host.indexOf("inderm") >= 0) || (window.host.indexOf("gipertonium") >= 0) || (window.host.indexOf("recept-gor") >= 0) || (window.host.indexOf("pantogor") >= 0) || (window.host.indexOf("varanga") >= 0) || (window.host.indexOf("alligator") >= 0)) && (window.country == "BY") && ($(".price_field_s1").val()=="1")){
		return false;
	}
 
 	// window.country = 'MD';
 	console.log(window.country);

	sale_countries = ["KZ", "GE", "RU"];
	//sale_countries = ["KZ", "GE", "RU", "MD"];
	if( (sale_countries.indexOf(window.country) < 0) && ( (window.country == 'AM' || window.country == 'MD') && ((window.host.indexOf("ssn.w.personalslim")>=0) || (window.host.indexOf("ss.w.personalslim")) >= 0) )  
		|| (window.country == 'KZ' && window.host.indexOf("oxy") >= 0) 
		|| ((window.country == 'KZ' || window.country == 'BY') && window.host.indexOf("zb-painrelief") >= 0) 
		|| (window.country == 'KZ' && window.host.indexOf("plastgemo") >= 0)){
		$("form button + p").hide();
		$("a.order-btn + p").hide();
		$(".discount-off").hide();
		$("form sup").hide();
		$(".price_land_curr + sup").hide();
		console.log('hide');
	}else{
		$("form button + p").show();
		$("form sup").show();
		$(".discount-off").show();
		$(".price_land_curr + sup").show();
		console.log('show');
	}
}); 