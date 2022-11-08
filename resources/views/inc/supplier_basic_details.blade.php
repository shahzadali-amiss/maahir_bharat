<!-- Name -->
<div class="row justify-content-center">
    <x-label class="col-lg-4 py-2" for="name" :value="__('Business Name :')" />

    <x-input class="col-lg-6 block mt-1 w-full border border-none rounded py-2 py-lg-1" id="name" type="text" name="name" :value="old('name')" required autofocus />
</div>

<!-- Email Address -->
<div class="mt-4 row justify-content-center">
    <x-label class="col-4 py-2" for="email" :value="__('Email :')" />

    <x-input id="email" class="col-6 block mt-1 w-full border border-none rounded" type="email" name="email" :value="old('email')" required />
</div>

<!-- Password -->
<div class="mt-4 row justify-content-center">
    <x-label class="col-4 py-2" for="password" :value="__('Password')" />

    <x-input id="password" class="col-6 block mt-1 w-full border border-none rounded"
                    type="password"
                    name="password"
                    required autocomplete="new-password" />
</div>

<!-- Confirm Password -->
<div class="mt-4 row justify-content-center">
    <x-label class="col-4 py-2" for="password_confirmation" :value="__('Confirm Password :')" />

    <x-input id="password_confirmation" class="col-6 block mt-1 w-full border border-none rounded"
                    type="password"
                    name="password_confirmation" required />
</div>

<div>

    <div class="">
        <button type="submit" class="d-block m-auto mt-3 px-4 btn btn-primary">
            Register
        </button>
    </div>
</div>

<div class="flex text-center justify-end mt-4">
    Already registered? 
    <a class="text-decoration-underline text-sm text-dark" href="{{ route('login') }}">
        {{ __('Login') }}
    </a>
</div>