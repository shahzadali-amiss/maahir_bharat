<script type="text/javascript">
  jQuery(document).ready(function($){
    $('#grand_category').on('change', function(){
      $('#child_cont').addClass('d-none');
      if($(this).val() != ""){
        var url = '/api/get-category/'+($(this).val())+'/2';
        $.get(url, function(data, status){
          if(data.status==true){
            if((data.data.length>0)){
              $('#submit').attr('disabled', true);
              console.log(data.data);
              $('#parent_cont').removeClass('d-none');
                bindParentCategory(data.data,'parent_category');
            }else{ 
              $('#submit').attr('disabled', false);
              $('#parent_cont').addClass('d-none');

            }
          }    
        }); 
      } 
    });
    // $('#grand_category').on('change', function(){
    //   if($(this).val() != ""){
    //     $('#submit').attr('disabled', false);
    //   }else{
    //     $('#submit').attr('disabled', true);
    //   }
    // });

    $('#parent_category').on('change', function(){
      if($(this).val() != ""){
        var url = '/api/get-category/'+($(this).val())+'/3';
        $.get(url, function(data, status){
          if(data.status==true){
            if(data.data>0){
              $('#submit').attr('disabled', true);
              console.log(data.data.length);
              $('#child_cont').removeClass('d-none');
              bindParentCategory(data.data,'child_category');
            }else{
              $('#submit').attr('disabled', false);
              $('#child_cont').addClass('d-none');
            }
          }    
        });
      }
    });

    function bindParentCategory(data, element){  
      var sel=document.getElementById(element);
      sel.innerText = "";
      var opt = document.createElement('option');
      if(element=='parent_category'){
        opt.innerHTML = 'Select Parent Category';
      }else if(element=='child_category'){
        opt.innerHTML = 'Select Child Category';
      }else{
        opt.innerHTML = 'Select Category';
      }
      opt.value = "";
      // opt.setAttribute('data-display', 'Please Select');
      sel.appendChild(opt);

          //console.log(data.length);
      // ITERATE TO BIND OPTIONS
      for(var i = 0; i < data.length; i++) {
          var opt = document.createElement('option');
          opt.innerHTML = data[i].name;
          opt.value = data[i].id;
          sel.appendChild(opt);
      }
      // console.log(sel);
    }
  });
</script>