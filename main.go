package main

import (
	"WSChatRooms/middleware/isWebsocket"
	"WSChatRooms/router"

	"github.com/gofiber/fiber/v2"

	"log"
)

func main() {
	app := initFiber()
	go initRunHub()
	router.StartRouting(app)

	log.Fatal(app.Listen("10.0.0.94:3000"))
}

func initFiber() *fiber.App {
	app := fiber.New()
	app.Static("/", "./public")
	app.Use("/ws", isWebsocket.New())
	return app
}

func initRunHub() {
	for i := 0; i < 3; i++ {
		go runHub()
	}
	select {}
}
