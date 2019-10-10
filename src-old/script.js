$(document).ready(function() {
  var result = 0;
  $('.calc__button').on('mousedown', function(){
    const button = $(this).text();
    const head = $('.screen__input-value');
    const str = $('.screen__expression');
    const equalSign = /[=]/g;
    const limit = 'Digit Limit Met';
    //проверяем, что нажатая копка с цифрой
    if (button.match(/[0-9]/)){
      //проверяем что в заголовке не 0 и в строке выражения, не математические знаки и это не законченное выражение
      if ((head.text()==='0' && (str.text()==='0' || str.text()===limit)) || head.text().match(/[/*+]|-/) || str.text().match(equalSign)){
        head.text(button);
      } else {
        head.text(head.text()+button);
      }
      //проверяем что в строке выражения не ноль, не превышение длины строки и не законченное выражение
      str.text(([limit, '0'].includes(str.text()) || str.text().match(equalSign) ? '' : str.text()) + button)
    }
    //точки
    if (button==='.') {
      head.text(head.text()+button);
      str.text(str.text()+button);
      //одноточие
      if (head.text().match(/[.]/g).length>1) {
        str.text(str.text().slice(0, -1));
        head.text(head.text().slice(0, -1));
      } else if (head.text().match(/[/*+]|-/g)) {
        head.text(0+button);
        str.text(str.text().slice(0, -1)+0+button);
      }
      if (str.text().match(equalSign)) {
        str.text('0'+button);
        head.text('0'+button);
      } 
    }
    //выполняем математические операции
    if(button.match(/[/*+]|-/)) {
      head.text(button);
      //проверяем что в подстрочке все в порядке
      if (str.text()===limit) {
        str.text(button);
        //что в ней нет знака равно
      } else if (str.text().match(equalSign)) {
        str.text(result+button);
        //заменям существующий оператор на нажатый
      } else if (str.text()[str.text().length-1].match(/[/*+]|-/)) {
        str.text(str.text().slice(0, -1)+button);
        //если обошли все трудные случаи - просто вставлем текст
      } else {
        str.text(str.text()+button);
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
    let resett = () => {
      head.text(0);
      str.text(0);
    }
    //убираем последнее введенное значение 
    if (button==='CE') {
      if (str.text().match(equalSign)) {
        str.text(0);
        head.text(0);
      } 
      let piece = str.text().slice(0, -head.text().length);
      piece ? str.text(piece): str.text(0);
      var change = str.text();
      //меняем параметры поиска в зависимости от того, чем заканчивается выражение
      if (str.text()[str.text().length-1].match(/[/*+]|-/)) {
        text(/[0-9.]/)
      } else {
        text(/[/*+]|-/);
      }
      //ищем либо последний оператор либо последнее число в строке выражения для его отображения в главном поле ввода чисел/операторов
      function text(re) {
        let string = change;
        if (string.match(re)){
          let num = string.search(re);
          change = string.slice(num+1); 
          text(re);
        } else {
          head.text(string);
        }
      }  
    }
    //очищаем строчки за превышение длины строки
    if (head.text().length>9 || str.text().length>25) {
      head.text(0);
      str.text(limit);
    }
  });
});
