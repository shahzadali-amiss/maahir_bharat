<x-guest-layout>

    <x-auth-card>
        <x-slot name="logo">
            <div class="w-100 m-auto text-center p-2 p-md-5 pb-md-0">               
                <a href="{{ route('guest-home') }}" title="Go to home" class="" rel="home">
                      <img class="site_logo" id="logo" src="{{ asset('img/logo-dark.png') }}" alt="MAAHIR BHARAT" style="max-width: 200px;">
                </a>
            </div>
        </x-slot>

    <div id="common-home">

        <div class="container">

            @yield('content')

        </div>

        <div class="back-btn d-none d-md-block">
            <a href="{{ route('guest-home') }}" class="text-dark fw-bold text-decoration-none me-3">
                &#8592;Home / Back
            </a>
        </div>

    </x-auth-card>
</x-guest-layout>