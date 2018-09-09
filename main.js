var btn = document.querySelector('.btn');
var result =JSON.parse(localStorage.getItem('listResult')) || [];
var list = document.querySelector('.list');
var circle = document.querySelector('.circle');
var BMIText = document.querySelector('.BMIText');
var BMINumber = document.querySelector('.BMINumber');
var reset = document.querySelector('.reset');
var inputValue = document.querySelectorAll('.input');

btn.addEventListener('click',saveItem);
updatelist(result);
list.addEventListener('click',deleItem);
reset.addEventListener('click',resetItem);



function saveItem(){

    checkValue();
    //show result
    if (inputValue[0].classList.contains('error') || inputValue[1].classList.contains('error')) {
        return;
        
    } else {
        btn.style.display = "none";
        circle.style.display = "flex";
        BMIText.style.display="block";
       
    }
    var height = document.querySelector('.height').value;
    var weight = document.querySelector('.weight').value;

        var data = {
            kg:weight,
            cm:height
        }
        result.push(data);
        updatelist(result);
        localStorage.setItem('listResult',JSON.stringify(result));
    
        //change circle
    
        var num = weight / (height * 0.01 * height * 0.01) ;
        var BMI = num.toFixed(2);
        BMINumber.innerHTML = BMI +'<br><span style="font-size:10px;">BMI</span>';
        if(BMI < 18.5){
            BMIText.textContent = '過輕';
            BMIText.style.color ='#31BAF9';
            BMINumber.style.color ='#31BAF9';
            circle.style.border = '6px solid #31BAF9';
            reset.style.backgroundColor ='#31BAF9';
        }
        if( BMI == 18.5 || BMI > 18.5 && BMI < 24 ){
            BMIText.textContent = '理想';
            BMIText.style.color ='#86D73F ';
            BMINumber.style.color ='#86D73F ';
            circle.style.border = '6px solid #86D73F ';
            reset.style.backgroundColor ='#86D73F ';
        }
        if( BMI == 24 || BMI > 24 && BMI < 27 ){
            BMIText.textContent = '過重';
            BMIText.style.color ='#FF982D';
            BMINumber.style.color ='#FF982D';
            circle.style.border = '6px solid #FF982D';
            reset.style.backgroundColor ='#FF982D';
        }
        if( BMI == 27 || BMI > 27 && BMI < 30 ){
            BMIText.textContent = '輕度肥胖';
            BMIText.style.color ='#FF6C03';
            BMINumber.style.color ='#FF6C03';
            circle.style.border = '6px solid #FF6C03';
            reset.style.backgroundColor ='#FF6C03';
        }
        if( BMI == 30 || BMI > 30 && BMI < 35 ){
            BMIText.textContent = '中度肥胖';
            BMIText.style.color ='#FF6C03';
            BMINumber.style.color ='#FF6C03';
            circle.style.border = '6px solid #FF6C03';
            reset.style.backgroundColor ='#FF6C03';
        }
        if( BMI == 35 || BMI > 35 ){
            BMIText.textContent = '中度肥胖';
            BMIText.style.color ='#FF1200';
            BMINumber.style.color ='#FF1200';
            circle.style.border = '6px solid #FF1200';
            reset.style.backgroundColor ='#FF1200';
        }
        
        
    }
    
    function checkValue() {
        inputValue.forEach(function(e){
            if(e.value == '' || isNaN(e.value)){
                e.classList.add('error');
                e.nextElementSibling.textContent = '請輸入數字';
                e.nextElementSibling.style.color = 'rgb(245, 37, 37)';
            }else{
                e.classList.remove('error');
                e.nextElementSibling.textContent = '';
            }
        })
       
    }   
    
    
    
    function resetItem(){
        btn.style.display = "block";
        circle.style.display = "none";
        BMIText.style.display="none";
        //clear input
        document.querySelector('.height').value = '';
        document.querySelector('.weight').value = '';
    }
    
    
    
    function updatelist(item){

        var str = '';
        
        var list = document.querySelector('.list');
        for(i = 0; i<item.length;i++){
            var num = item[i].kg / (item[i].cm * 0.01 * item[i].cm * 0.01) ;
            var BMI = num.toFixed(2);
            
            str += '<li><div class="color"></div><div class="description"></div><div class="">BMI   '+ BMI +'</div><div class="">身高   '+item[i].cm+'cm</div><div class="">體重   '+item[i].kg+'kg</div><a href="#" data-index="'+i+'"><span></span><span></span></a></li>';
            
        }
        list.innerHTML = str;
        for(var i =0;i<item.length;i++){
            var color = document.querySelectorAll('.color');
            var description = document.querySelectorAll('.description');
            var BMI =item[i].kg / (item[i].cm * 0.01 * item[i].cm * 0.01);
            if( BMI < 18.5){
                color[i].style.backgroundColor = "#31BAF9";
                description[i].textContent = '過輕'
            }
            if( BMI == 18.5 || BMI > 18.5 && BMI < 24 ){
                color[i].style.backgroundColor = "#86D73F";
                description[i].textContent = '理想'
            }
            if( BMI == 24 || BMI > 24 && BMI < 27 ){
                color[i].style.backgroundColor = "#FF982D";
                description[i].textContent = '過重'
            }
            if( BMI == 27 || BMI > 27 && BMI < 30 ){
                color[i].style.backgroundColor = "#FF982D";
                description[i].textContent = '輕度肥胖'
            }
            if( BMI == 30 || BMI > 30 && BMI < 35 ){
                color[i].style.backgroundColor = "#FF6C03";
                description[i].textContent = '中度肥胖'
            }
            if( BMI == 35 || BMI > 35 ){
                color[i].style.backgroundColor = "#FF1200";
                description[i].textContent = '重度肥胖'
            }
            
        }
}


function deleItem(e){
    e.preventDefault();
    var index = e.target.dataset.index;
    
    if(e.target.nodeName!=='A' && e.target.nodeName!=='SPAN'){return}
    result.splice(index,1);
    updatelist(result);
    localStorage.setItem('listResult',JSON.stringify(result));
   
}