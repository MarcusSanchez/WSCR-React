package main

import (
	"WSChatRooms/middleware/isWebsocket"
	"WSChatRooms/router"

	"github.com/gofiber/fiber/v2"

	"log"
)

func main() {
	app := initFiber()
	go initRunHubs()
	router.StartRouting(app)

	log.Fatal(app.Listen("10.0.0.94:3000"))
}

func initFiber() *fiber.App {
	app := fiber.New()
	app.Static("/", "./frontend/public")
	app.Use("/ws", isWebsocket.New())
	return app
}

func initRunHubs() {
	for i := 0; i < 3; i++ {
		go runHub()
	}
	select {}
}
