// جلب عناصر الإدخال من الصفحة عبر ID
let title= document.getElementById('title');
let price= document.getElementById('price');
let taxes= document.getElementById('taxes');
let ads= document.getElementById('ads');
let discount= document.getElementById('discount');
let total= document.getElementById('total');
let count= document.getElementById('count');
let category= document.getElementById('category');
let submit= document.getElementById('submit');

// متغير لتحديد وضع الإنشاء أو التحديث
let mood = 'create';
// لتخزين رقم العنصر عند التحديث
let tmp;

// دالة لحساب إجمالي السعر
function getTotal()
{
    // إذا وُضع سعر في الحقل
    if(price.value !=''){
        // جمع السعر + الضريبة + الإعلانات - الخصم
        let result= (+price.value + +taxes.value + +ads.value)- +discount.value;
        // عرض النتيجة
        total.innerHTML = result;
        // تغيير لون الخلفية
        total.style.background='#040';
    }else{
        // تفريغ الإجمالي إذا السعر فارغ
        total.innerHTML='';
        total.style.background='#5f0d36'
    }
}

// مصفوفة المنتجات
let datapro;
// إذا وجد بيانات مخزنة مسبقاً في localStorage
if(localStorage.product !=null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}

// عند الضغط على زر الإنشاء
submit.onclick= function(){
    // إنشاء كائن بيانات المنتج
    let newpro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    // التحقق أن الحقول الأساسية غير فارغة وعدد النسخ أقل من أو يساوي 100
    if(title.value !=''
        && price.value !=''
        &&category.value !=''
        &&newpro.count<=100 ){
           
            // إذا كان الوضع إنشاء
            if(mood ==='create'){
                // إذا المستخدم يريد إنشاء أكثر من نسخة
                if(newpro.count>1){
                    // تكرار العملية بعدد النسخ المطلوبة
                    for(let i=0 ;i <newpro.count;i++){
                        datapro.push(newpro);
                    }
                }else{
                    // إنشاء نسخة واحدة
                    datapro.push(newpro);
                }

            }else{
                // في حالة التحديث: استبدال العنصر القديم بالجديد
                datapro [tmp]= newpro;
                mood='create';
                submit.innerHTML='Create';
                // إعادة إظهار حقل العدد
                count.style.display='block';
            }

            // تفريغ الحقول بعد الإضافة
            cleardata();
    }

    // حفظ البيانات داخل localStorage
    localStorage.setItem('product',JSON.stringify(datapro));
    // عرض البيانات في الجدول
    showdata();
}

// دالة لتفريغ الحقول بعد الإنشاء
function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// دالة عرض البيانات في الجدول
function showdata()
{
    getTotal();
    let table = '';

    // تمر على المنتجات وعمل صف لكل منتج
    for( let i=0;i < datapro.length;i++){
       table += `<tr>
                    <td> ${i+1} </td>
                    <td> ${datapro[i].title} </td>
                    <td>${datapro[i].price} </td>
                    <td>${datapro[i].taxes} </td>
                    <td>${datapro[i].ads} </td>
                    <td>${datapro[i].discount} </td>
                    <td>${datapro[i].total} </td>
                    <td>${datapro[i].category} </td>
                    <td><button onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                </tr>`;
    }

    // وضع الجدول داخل tbody
    document.getElementById('tbody').innerHTML = table;

    // زر حذف الكل
    let btndelete = document.getElementById('deleteall')
    if(datapro.length > 0){
        btndelete.innerHTML = `
        <button onclick="deleteall()">delete All (${datapro.length})</button>
        `
    }else{
        btndelete.innerHTML= '';
    }
}
showdata();

// دالة حذف عنصر واحد
function deletedata(i)
{
    datapro.splice(i,1); // حذف العنصر من المصفوفة
    localStorage.product= JSON.stringify(datapro); // تحديث التخزين
    showdata(); // إعادة تحميل البيانات
}

// دالة حذف جميع البيانات
function deleteall()
{
    localStorage.clear(); // مسح التخزين بالكامل
    datapro.splice(0); // تفريغ المصفوفة
    showdata(); // تحديث الجدول
}

// دالة التحديث
function updatedata(i)
{
    // تعبئة الحقول ببيانات المنتج المحدد
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display='none'; // إخفاء حقل العدد في التحديث
    category.value = datapro[i].category;
    submit.innerHTML= 'Update'; // تغيير زر الإرسال
    mood = 'update'; // وضع التحديث
    tmp=i; // حفظ رقم العنصر
    scroll({top:0,
        behavior:'smooth'
    }) // الصعود للأعلى
}

// وضع البحث الافتراضي
let searchmood= 'title';

// دالة لتحديد نوع البحث (عنوان أو تصنيف)
function getsearchmood(id)
{
    let search =document.getElementById('search');
    if(id == 'searchtitle'){
        searchmood= 'title';
    }else{
        searchmood= 'category';
    }

    search.placeholder ='Search By '+searchmood;
    search.focus();
    search.value='';
    showdata();
}

// دالة البحث
function searchdata(value){
    let table='';
    for(let i=0;i< datapro.length;i++){
       
        // البحث حسب العنوان
        if(searchmood == 'title'){
       
            if(datapro[i].title.includes(value.toLowerCase())){
                 table += `<tr>
                    <td> ${i} </td>
                    <td> ${datapro[i].title} </td>
                    <td>${datapro[i].price} </td>
                    <td>${datapro[i].taxes} </td>
                    <td>${datapro[i].ads} </td>
                    <td>${datapro[i].discount} </td>
                    <td>${datapro[i].total} </td>
                    <td>${datapro[i].category} </td>
                    <td><button onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                </tr>`;
            }

        // البحث حسب التصنيف
        }else{
            if(datapro[i].category.includes(value.toLowerCase())){
                 table += `<tr>
                    <td> ${i} </td>
                    <td> ${datapro[i].title} </td>
                    <td>${datapro[i].price} </td>
                    <td>${datapro[i].taxes} </td>
                    <td>${datapro[i].ads} </td>
                    <td>${datapro[i].discount} </td>
                    <td>${datapro[i].total} </td>
                    <td>${datapro[i].category} </td>
                    <td><button onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                </tr>`;
            }
        }
    }

    // عرض نتائج البحث
    document.getElementById('tbody').innerHTML = table;
}
