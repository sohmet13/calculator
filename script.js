$(document).ready(function() { 
  var result=0;
  $('.button').on('mousedown', function(){
    var button = $(this).text();
    var head = $('h1');
    var str = $('p');
    //проверяем, что нажатая копка с цифрой
     if (button.match(/[0-9]/)){
       //проверяем что в заголовке не 0, не математические знаки и это не законченное выражение
       if (head.text()==='0' || head.text().match(/[/*+]|-/) || str.text().match(/=/g)){
        head.text(button);
       } else {
         head.text(head.text()+button);
       }
       //проверяем что в подстрочке не ноль, не превышение длины строки и не законченное выражение
       if (str.text()==='Digit Limit Met' || str.text()==='0' || str.text().match(/[=]/g)){
          str.text(button);
       } else if (!str.text().match(/[/*+=]|-/)) {
         str.text(head.text());
       } else {
         str.text(str.text()+button);
       }
     }
    //точки
    if (button==='.') {
      head.text(head.text()+button);
      str.text(str.text()+button);
      //одноточие
      if (head.text().match(/[.]/g).length>1 || str.text().match(/=/g) || str.text()[str.text().length-2].match(/[/*+]|-/)) {
        str.text(str.text().slice(0, -1));
        head.text(head.text().slice(0, -1));
      }
      if (!str.text().match(/[/*+=]|-/g)) {
         str.text(head.text());
       }
      if (str.text().match(/[=]/g)) {
        str.text(0+button);
        head.text(0+button);
      }
    }
    //выполняем математические операции
    if(button.match(/[/*+]|-/)) {
      if (head.text()!=0 && str.text()!=0){
        head.text(button);
      //проверяем что в подстрочке все в порядке
      if (str.text()==='Digit Limit Met' || str.text()==='0') {
          str.text(button);
       } else if (str.text().match(/[=]/g)) {
         str.text(result+button);
       } else {
         str.text(str.text()+button);
       }
      //предотвращаем лишние математические операции
      if (str.text()[str.text().length-2].match(/[/*+]|-/)) {
        str.text(str.text().slice(0, -1));
        head.text(str.text()[str.text().length-1]);
      }
     }
    }
    //что делать после равно
    if (button==='=') {
      result = eval(str.text());
      if (result!==Math.round(result)) {
       if (result==result.toFixed(1)){ 
          result = result.toFixed(1);
       } else {
          result = result.toFixed(2); 
       }
      }
      head.text(result);
      str.text(str.text()+'='+result);
    }
    //очищаем обе строчки
    if (button==='AC'){
        head.text(0);
        str.text(0);
     }
    //убираем последнее введенное значение 
    if (button==='CE') {
      if (str.text().match(/[=]/g)) {
        str.text(0);
      } 
      if (head.text().match(/[/*+]|-/)) {
        str.text(str.text().slice(0, -1));
      } 
      if (head.text().match(/[0-9]/)) {
        str.text(str.text().slice(0, -head.text().length));
        if (!str.text().match(/[0-9./*+]|-/) || str.text().length===1 || str.text()===head.text()) {
          str.text(0);
        }
      }
      head.text(0);
    }
    //очищаем строчки за превышение длины строки
    if (head.text().length>9 || str.text().length>25) {
      head.text(0);
      str.text('Digit Limit Met');
    }
  });
});
