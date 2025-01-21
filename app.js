

// JS-LESSON81 (Last lesson of this finance project
//Cahnge event-ттэй ажиллах буюу орлого, зарлага оруулахад өнгөөр ялгах

//*********************  Дэлгэцтэй ажиллах контроллер
 var uiController = ( function() {
     var x = 1;

    var DOMstrings = {
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        addBtn:'.add__btn',
        incomeList:".income__list",
        expenseList:".expenses__list",
        tusuvLabel:".budget__value",
        incLabel:".budget__income--value",
        expLabel:".budget__expenses--value",
        procentLabel:".budget__expenses--percentage",
        containerDiv:'.container',
        expensePercentageLabel:".item__percentage",
        dateLabel:".budget__title--month",



    };



    var nodeListForEach = function(list, callback) {
     for ( i = 0; i < list.length; i++) {
        // forEach function нь эхний аргументээр нь элемэентийг хүлээж аваад 2 дахь аргументээр нь  индекс авдаг, 3 дахь аргументээр нь тухайн элементийг өөрийг нь дамжуулдаг.


      callback(list[i], i, list) 
     }
    };

    // 
    var formatMoney = function(too, type) {
        // Энэ too-гэдэг нь жинхэнэ number-орж ирээд байна. Гэтэл бид formatMoney функц дээр тэмдэгт мөр гэж ажилласан байгаа. Одоо тоог тэмдэгт мөр болгох хамгийн амархан арга бол: too = "" + too; тоогоо хоосон тэмдэгт мөр дээр залгах юм.Ингэхээр type coercion-явагдаад урд тал нь тэмдэгт мөр байна + хойд тал нь тоо байна гээд тэгвэл тэмдэгт мөр болгочихъё гээд болгодог байгаа.
    too = "" + too;
     var x = too.split('').reverse().join('');
     var y = '';
     var count = 1;

     for(var i = 0; i < x.length; i++) {
        y = y + x[i];
        if(count % 3 === 0) {
            y = y + ','
        };
        count++
     }

     var z = y.split('').reverse().join('');
     if(z[0] === ',') {
        z = z.substring(1, z.length - 1);
      
     };
     if(type === 'inc') {
        z = '+' + z;
     } else {
        z = '-' + z;
     }
     return z;
    };
return {

    // 
   displayDate: function() {
    var today = new Date();
  document.querySelector(DOMstrings.dateLabel).textContent = today.getFullYear() + ' year ' + (today.getMonth() + 1) + ' month';

   },
//    Event change 

changeType: function() {
var fieldsInput = document.querySelectorAll(DOMstrings.inputType + ',' + DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
// энэ fieldsInput -дотор массив ирэхгүй харин nodeList-гэдэг юм ирдэг ба nodeList- дотор forEach-байдаггүй. 

nodeListForEach(fieldsInput, function(el) {
el.classList.toggle('red-focus');
});
// 
document.querySelector(DOMstrings.addBtn).classList.toggle('red');

},

//    
    name:'Bold' + x,
     // 1.Оруулах өгөгдлүүдийг  дэлгэцээс олж авна
    getInput: function() {
        return {
            type:document.querySelector(DOMstrings.inputType).value, // exp, inc 
            Description:document.querySelector(DOMstrings.inputDescription).value,
            value: parseInt(document.querySelector(DOMstrings.inputValue).value), 
        

        };
    },
    


    // Зарлагын элемент бүрийн хувийг өөрчилж өгдөг public service
    displayPercentages: function(allPercentages) {
        // 1.Зарлагын nodeList-ийг олох
       
        var elements = document.querySelectorAll(DOMstrings.expensePercentageLabel);
        // 2.Элемент болгоны хувьд зарлагын хувийг массиваас авч шивж оруулах

        /*
        nodeListForEach-функцийн эхнийх рүү нь list-ээ дамжуулах буюу одоо энэ нь шүүж авсан elements байна. 2 дахь аргумент нь callback function дамжуулан гэсэн. 
        */
        nodeListForEach(elements, function(el, index) {
        el.textContent = allPercentages[index] + '%';
        });
   


    },

    // Дараагийн public server-тавьж өгье
    getDOMstrings:function() {
      return DOMstrings;

    },

    //  Оролтын талбаруудыг цэвэрлэх public server:
    clearFields: function() {
        var Fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);


        // Convert list to Array
      var fieldsArr = Array.prototype.slice.call(Fields);

    //   for(var i = 0; i < fieldsArr.length; i++  ) {
    //     fieldsArr[i].value = '';
    //   }
     
    fieldsArr.forEach(function(element, index, array) {
        element.value = '';
    });

    // Курсорыг focus хийх input.description дээр аваачих

    fieldsArr[0].focus();

    },

    // Дэлгэц дээр төсвийг үзүүлэх
  

     tusviigGargajUzuuleh: function(tusuvGargah) {
        var type;
        if(tusuvGargah.tusuv > 0) type = 'inc';
        else type ='exp';

     document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(tusuvGargah.tusuv, type),
     document.querySelector(DOMstrings.incLabel).textContent =formatMoney(tusuvGargah.totalInc,'inc'),
     document.querySelector(DOMstrings.expLabel).textContent =formatMoney(tusuvGargah.totalExp,'exp');
     if(tusuvGargah.procent  !== 0) {
         document.querySelector(DOMstrings.procentLabel).textContent = tusuvGargah.procent + '%'

     } else {
         document.querySelector(DOMstrings.procentLabel).textContent = tusuvGargah.procent;
     }
     },

        


     // Дэлгэцгээс элемент усгахад дууддаг public server:


     deleteListItem: function(id) {
     var el = document.getElementById(id);
     el.parentNode.removeChild(el);
     },
     
     // Дэлгэц рүү юм нэмэхэд дууддаг public server:
    // Дараа нь AddListItems-функцийг appController дээр дуудаж өгнө.


    AddListItems: function(item, type) {
        //1. Орлого, зарлагын элементийг агуулсан html-ийг бэлтгэнэ

        var html, list;
        //Энд html-ийг авчраад тэмдэгт мөр болгож хувиргаад хийчихлээ гэсэн үг.
        if(type === 'inc') {
            list = DOMstrings.incomeList;
            html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$description$$</div><div class="right clearfix"><div class="item__value">$$value$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else {
            list = DOMstrings.expenseList;
           html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$description$$</div><div class="right clearfix"><div class="item__value">$$value$$</div><div class="item__percentage">10%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }


        //2. Тэр html-дотроо орлого, зарлагын утгуудыг REPLACE функц ашиглаж өөрчилж өгнө

   
       var html = html.replace('%id%', item.id);
       var html = html.replace('$$description$$', item.description);
       var html = html.replace('$$value$$', formatMoney(item.value, type));



        //3. Бэлтгэсэн html-ээ DOM руу хийж өгнө. incDiv.insertAdjacentHTML('beforeend', '<br><br>Hello Muugii salary : $4500');  <div class="income__list"></div>
        document.querySelector(list).insertAdjacentHTML('beforeend', html);





    }

}

 })();



 
// ************************* Санхүүтэй ажиллах контроллер

 var financeController = ( function() {

    // Байгуулагч функцийг томоор бичнэ гэсэн бичигдээгүй аман дүрэм байна.
    
var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    
     };

// JS-LESSON78
     var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
        
     };

     Expense.prototype.calcPercentage = function(totalIncome) {
        if(totalIncome > 0)
      this.percentage = Math.round((this.value / totalIncome ) * 100); 
    else this.percentage = 0;
     };

     Expense.prototype.getPercentage = function() {
        return this.percentage;
     };


     
    //  Массивыг элемент болгоноор давталт хийгээд
    //  anonymous function-аар нийлбэрийг нь бодож олно.
     var calculateTotal = function(type) {
         var sum = 0;
        data.allItems[type].forEach( function(el) {
          sum = sum +el.value;
        });

        data.totals[type] = sum;

     }

    //  Одоо бид id-ийг гараараа үүсгэхгүй буюу програм маань үүнийг dynamic-аар үүсгээд массивт хадгална.
//   Хувьсагчдыг ингэж үүсгэх нь бидэнд уян хатан боломжийг олгоно.
    var data = {
        allItems : {
            inc:[],
            exp:[],
        },
        totals:{
         inc:0,
         exp:0,
        },
        tusuv:0,
        procent:0,
    };


    return {

        tusuvTootsooloh: function () {
            // Бүх орлогуудыг тооцсон санхүүгийн дотоод далд функцээ дуудна.
            calculateTotal('inc');
            // Нийт зарлагуудын нийлбэр олдог функц
            calculateTotal('exp');
            // Төсвийг шинээр тооцоолно
            data.tusuv = data.totals.inc - data.totals.exp;
            // Орлого, зарлагын хувийг тооцоолно
            if(data.totals.inc >0)
            data.procent = Math.round((data.totals.exp / data.totals.inc) * 100);
        else data.procent = 0;
          
        }, 

        // js-lesson78
        calculatePercentages: function() {
         data.allItems.exp.forEach(function(el) {
            // нийт орлогоо дамжуулж өгнө
        el.calcPercentage(data.totals.inc)
         });
        },
        // exp-дотор давталт хийгээд бүх зарлагын обьектуудаас тооцсон хувиа өг гэж бүгдээс нь цуглуулж аваад, цаанаа нэг массив үүсгээд тэр массиваа нэхээд байгаа газар руу нь дамжуулна гэсэн үг.
        getPercentages: function() {
            var allPercentages = data.allItems.exp.map(function(el) {
             return el.getPercentage();
            });

            return allPercentages;

        },
        
        tusviigAvah: function () {
      

            return {

                tusuv:data.tusuv,
                procent: data.procent,
                totalInc:data.totals.inc,
                totalExp:data.totals.exp

            }

        },



          deleteItem: function(type, id) {
             var ids = data.allItems[type].map(function(el) {
               return el.id;
             });

       console.log('ids:is here ' + ids);
       

            var index = ids.indexOf(id);
            console.log('index is here: ' + index);

            if(index !== -1) {
                console.log('DELETE хийх гэж байа.');
                data.allItems[type].splice(index, 1);
            };
        },


        addItem: function(type, desc, val) {
            var item, id;
            // id meaning identification -тодорхойлдог хүчин зүйл гэсэн үг тул үл давхардах ёстой. 

            if(data.allItems[type].length === 0)
                {id = 1}   else {
                 id = data.allItems[type][data.allItems[type].length-1].id + 1;
            }


            if( type === 'inc') {
            item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }

            data.allItems[type].push(item);
            console.log('Item added');
            return item;
            
        },


        seeData: function() {
        return data;
        }
    };
     

 })();





// ******************* Програмын холбогч контроллер
 var appController = ( function(uiCont, fnCont) {
     
     var ctrlAddItem = function() {
         // This is Pseudocode Algorithm:


         // 1.Оруулах өгөгдлийг дэлгэцээс олж авна(хэрэглэгчийн оруулсан утга)

         var input = uiController.getInput();
        //  console.log(input + 'Энд хэрэглэгч оруулсан утга гарч ирнэ');
        // console.log(uiController.getInput());
    
        // console.log(uiController.getDOMstrings());
        // Утга гараас оруулаагүй бол ажиллахгүй болгох.
        if(input.Description !== '' && input.value !== '') {
        

        // 2.Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
        // financeController.addItem(input.type, input.Description, input.value);
        var item = financeController.addItem(input.type, input.Description, input.value);
        // console.log(financeController.seeData());
    
         // 3.Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана
    
         uiController.AddListItems(item, input.type);
         uiController.clearFields();
         //   Төслийн үлдэгдлийг шинээр тооцоолоод дэлгэцэнд үзүүлнэ.
         updateTusuv();
       

    }
       
         
        };

       var updateTusuv = function () {
          // 4.Төсвийг тооцоолно.
          financeController.tusuvTootsooloh();
          // 5. Эцсийн үлдэгдэл 
                  var tusuv = financeController.tusviigAvah();
                  console.log(financeController.tusviigAvah());
                  
         //  6.  Төсвийн тооцоог   тооцоог дэлгэцэнд гаргана.
                 // console.log(tusuv);
        
         uiController.tusviigGargajUzuuleh(tusuv);
   
        //  7.Элементүүдийн хувийг тооцоолно. (lesson78)

           financeController.calculatePercentages();
        // 8.Элементүүдийн хувийг хүлээж авна.
        var allPercentages = financeController.getPercentages();

        // 9.Элементүүдийн хувийг дэлгэцэнд гаргана.
        uiController.displayPercentages(allPercentages);
        console.log(allPercentages);
        

       }
        
        
  //   sertup-бэлтгэх, тохируулах 
   var setupEventListeners = function() {
    var DOM = uiController.getDOMstrings();

    try {
        // Click event
        document.querySelector(DOM.addBtn).addEventListener('click', function() {
     
           ctrlAddItem();
            
        });
        
        // Гарны товчлуурын эвент
     document.addEventListener('keypress', function (event) {
    
        if(event.keyCode === 13 || event.which === 13 ) {
        ctrlAddItem();
      };

    //  event change 
    document.querySelector(DOM.inputType).addEventListener('change', uiController.changeType);
    console.log(uiController.changeType());
    



    //   Устгах эвент 
    document.querySelector(DOM.containerDiv).addEventListener('click', function(event) {
      
      var id = (event.target.parentNode.parentNode.parentNode.parentNode.id);

    if(id) {

        var arr = id.split('-');
        var type = arr[0];
        // convert string to number

        var itemId = parseInt(arr[1]);
        //  console.log(itemId);

         console.log(type + '========>' + itemId);

        // Одоо устгал хийхэд бэлэн боллоо. Үүнийг ямар дарааллаар хийхээ бичье. Доорх 3 үйлдлийг хийснээр устгах гэдэг үйлдэл бүрэн дуусах юм. 

        // №1 Санхүүгийн модулиас type, id-ашиглан устгана.

        financeController.deleteItem(type, itemId);

        // №2 Дэлгэц дээрээс энэ элементийг устгана.
         uiController.deleteListItem(id);

        // №3 Үлдэгдэл тооцоох шинэчлэн харуулна.
               //   Төслийн үлдэгдлийг шинээр тооцоолоод дэлгэцэнд үзүүлнэ.
               updateTusuv();
          
    }
    })
    
    });
        
    } catch(error) {
        console.log('Event listener үүсгэх явцад алдаа гарлаа: ' + error);
        
        
    };

};

// Одоо манайд public serves байхгүй тул гаднаас нь хандаж чадахгүй. 

return {
init: function() {
    console.log( 'Application started ...');
    // Програм эхлэхэд төсвийг бүгдийг тэг утгаас эхлүүлнэ
    uiController.tusviigGargajUzuuleh({
        tusuv:0,
        procent: 0,
        totalInc:0,
        totalExp:0
    })
    setupEventListeners();
    
}

};


 })(uiController,financeController);

 appController.init();

 console.log(financeController.seeData());
 console.log(uiController.displayDate());
 


 
 
 
