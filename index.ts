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
    melakukan beberapa setup.

*/ 