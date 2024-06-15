# belajar_typescript_restfulapi

YouTube video:

```link
https://www.youtube.com/watch?v=1-eEEJF5LCc&list=PL-CtdCApEFH9jIdygiF4vTIs4Xpo_cHhC&index=5&t=98s
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.10. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.



# Setup Project

Create .env file

```
DATABASE_URL="mysql://root:@localhost:3306/belajar_typescript_restful_api"
```

```shell

bun install

bunx prisma migrate dev

bunx prisma generate

bun build ./src/**/*.ts --outdir ./dist/src --target bun --external mock-aws-s3 --external aws-sdk --external nock

bun dist/src/main.js

```