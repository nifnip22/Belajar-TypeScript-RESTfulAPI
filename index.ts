console.log("Hello via Bun!");

/*

    Melanjutkan pembelajaran TypeScript dengan membuat sebuah RestfulAPI tentang Contact Management, dimana RestfulAPI yang akan kita buat
    memiliki fitur sebagai berikut:
    - User Management
        User Data: Username, Password, Name
        User API: Register, Login, Update, Get, Logout
    - Contact Management
        Contact Data: First Name, Last Name, Email, Phone
        Contact API: Create, Update, Get, Search, Remove
    - Address Management
        Address Data: Street, City, Province, Country, Postal Code
        Address API: Create, Update, Get, List, Remove

    Berikut beberapa library dan package yang harus di install:
    - Zod
        'bun add zod'
    - Express
        'bun add express'
        'bun add --save-dev @types/express'
    - Prisma
        'bun add -d prisma'
        'bun add @prisma/client'
    - Winston
        'bun add winston'
    = Bcrypt
        'bun add bcrypt'
        'bun add --save-dev @types/bcrypt'
    - Supertest
        'bun add --save-dev supertest @types/supertest'
        
    Setelah semuanya telah di install, selanjutnya kita akan membuat dokumentasi API Spec. Buat sebuah folder yang diberi nama 'doc'. Di dalam folder doc,
    buat file dalam bentuk markdown sesuai dengan fitur yang akan dibuat

    Setelah membuat dokumentasi API Spec, selanjutnya kita akan setup database MySQL. Setelah membuat database, kita akan melakukan setup Prisma. Jalankan
    perintah di terminal 'bunx prisma init --datasource-provider mysql'. Setelahnya ganti URL Database di .env dan buat model satu per satu pada schema prismanya.
    Setelah membuat model maka kita akan melakukan migration dengan mengetikan perintah di terminal 'bunx prisma migrate dev' (pastikan dijalankan setiap membuat satu
    model baru)

    Setelah membuat database dan model dengan schema prisma, selanjutnya kita akan melakukan setup project. Buat sebuah folder application di dalam folder src untuk 
    melakukan beberapa setup. Setelahnya kita akan membuat beberapa folder di dalam folder src, yang pertama adalah folder controller untuk menyimpan beberapa request 
    handler nya, yang kedua untuk bisnis logic nya kita akan buat dan simpan di folder service, yang ketiga untuk menyimpan data pertukaran data antara request dan
    response kita buat folder model, yang keempat untuk melakukan proses validation kita buat folder validation, yang kelima untuk membuat kondisi error sendiri dengan
    membuat folder error, yang ke enam untuk membuat router kita buat folder route, yang ketujuh adalah folder middleware untuk error. Berikut urutan folder yang diperhatikan:
    1. model
    2. validation
    3. error
    4. service
    5. controller
    6. route
    7. middleware
    8. web.ts (/application)

    Di folder tests kita akan membuat unit bun test untuk melakukan pengujian jika proses seperti register user, login user, get address dan lainnya itu berjalan dengan baik.

*/ 