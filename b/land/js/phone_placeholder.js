var phone_mask = {
    'RU': '+7 (916) 123-45-67',
    'UA': '+380 000 00-00-00',
    'KZ': '+7 (000) 000-00-00',
    'AZ': '+994 0000000000',
    'MD': '+373 (00) 00-00-00',
    'BY': '+375 (00) 000-00-00',
    'GE': '+995 (000) 00-00-00',
    'UZ': '+998 (000) 00-00-00',
    'TH': '+66 (2) 123-45-67',
    'VN': '+84 1234567890',
    'KG': '+996 700 123 456',
    'AM': '+374 10 00-00-00',
    'DE': '+49 0000 00000000',
    'ES': '+34 000 00 00 00',
    'MY': '+60 00-000 0000',
    'ID': '+62 000-0000-0000',
    'IT': '+39 000-000-00-00',
    'PT': '+351 000 000 000',
    'RO': '+40 000 00 00 00',
    'BG': '+359 000 000 000',
    '-': '+0000000000000'
};
$(function () {
 $('input[name=phone]').attr('placeholder', phone_mask[window.country]);
 var field = document.body.querySelectorAll('label[for=f_tel] font');
 //console.log(field);
 if( field.length > 0 ){
   for (var i = 0; i < field.length; i++) {
      field[i].innerHTML = '(Например: ' +phone_mask[window.country]+')'
   }
 }
});
