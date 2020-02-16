# Phaser Typescript Template

### Description:
This project provides a dockerized node development environment template for building a Phaser Typescript game project along with deployment bundling

### Dev Usage:
1. Simply run ` make run ` to start a dockerized development server
2. Updated files in "./src" and "./assets" will automatically be recompiled by **webpack**

### Deployment
1. Run ` make bundle ` to build a "static" web deployment package at "./dist" which can be statically served by your desired web server (e.g. S3 or Nginx on a VPS)

### Details
"./src/ts/main.ts" implements the Phaser tutorial: https://phaser.io/tutorials/making-your-first-phaser-3-game
