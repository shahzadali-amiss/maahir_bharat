@extends('layouts.seller')
@section('content') 
@php
$supplier_details=getSupplierDetails();
@endphp
<!-- Content-->
<section class="col-lg-8 pt-lg-4 pb-4 mb-3">
  <div class="pt-2 px-4 ps-lg-0 pe-xl-5">
    @include('inc.session-message')
    <!-- <h2 class="h3 py-2 text-center text-sm-start">Change Password</h2> -->

      <!-----Supplier Details-----> 
    <form action="{{ route('seller-change-password') }}" method="post">
      @csrf
      <div class="tab-pane fade show active" id="supplier-details" role="tabpanel">
        <h4 class="text-center">Change Password</h4>
        
        <div class="row gx-4 gy-3 pt-5">
          <div class="col-sm-6">
            <label class="form-label" for="dashboard-fn">Current Password</label>
            <input class="form-control" type="text" name="current" required="" autocomplete="off">
          </div>
          <div class="col-sm-6">
            <label class="form-label" for="email">New Password</label>
            <input class="form-control" type="text" name="new" required="" autocomplete="off">
          </div>
          <div class="col-sm-6">
            <label class="form-label" for="mobile">Confirm Password</label>
            <input class="form-control" type="password" name="confirm" required="" autocomplete="off">
          </div>
          <div class="col-12">
            <hr class="mt-2 mb-4">
            <div class="mt-3">
              <div class="d-sm-flex justify-content-between align-items-center">
                <div class="form-check">
                </div>
                <button type="submit" class="btn btn-primary nav-link">
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</section>
@endsection
@push('styles')
<style>
  .sel-file{
    width:0;
    height: 0;
  }
</style>
@endpush
@push('scripts')
<script type="text/javascript">
  function MyFunc(nextId){
    var el = document.getElementById(nextId);
    console.log(el);
    el.click();
  }
  
  var loadFile = function(event, bindId) {
    var image = document.getElementById(bindId);
    image.src = URL.createObjectURL(event.target.files[0]);
  };

  function clickFile(){
     var ele=document.getElementById('sel-file');
     ele.classList.remove('d-none');
     ele.click();
  }

  jQuery(document).ready(function($){

    $('#i_agree').on('click', function(){
        if(this.checked){
          $('#form-submit').attr('disabled',false);
        }else{
          $('#form-submit').attr('disabled',true);
        }
    });
    if($('#i_agree').is(":checked")){
        $('#form-submit').attr('disabled',false);
    }
    else if($('#i_agree').is(":not(:checked)")){
        $('#form-submit').attr('disabled',true);
    }




    $('#state').on('change', function(){
      if($(this).val() != ""){
        var url = '/api/get-cities-from-state/'+($(this).val());
        $.get(url, function(data, status){
          if(data.status==true){
            
            //console.log(data.data);
            bindParentCategory(data.data,'city');
          }    
        });
      }
    });

    function bindParentCategory(data, element){  
      var sel=document.getElementById(element);
      sel.innerText = "";
      var opt = document.createElement('option');
      opt.innerHTML = 'Select city';
      opt.value = "";
      // opt.setAttribute('data-display', 'Please Select');
      sel.appendChild(opt);

          //console.log(data.length);
      // ITERATE TO BIND OPTIONS
      for(var i = 0; i < data.length; i++) {
          var opt = document.createElement('option');
          opt.innerHTML = data[i].city;
          opt.value = data[i].id;
          sel.appendChild(opt);
      }
    }
  });
</script>
@endpush