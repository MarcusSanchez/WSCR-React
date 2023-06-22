package main

import (
	"WSChatRooms/middleware/isWebsocket"
	"WSChatRooms/router"
	"github.com/gofiber/fiber/v2/middleware/cors"
	recover2 "github.com/gofiber/fiber/v2/middleware/recover"

	"github.com/gofiber/fiber/v2"

	"log"
)

func main() {
	app := initFiber()
	initRunHubs()
	router.StartRouting(app)

	log.Fatal(app.Listen(":3000"))
}

func initFiber() *fiber.App {
	app := fiber.New()
	app.Static("/", "./public")
	app.Use("/ws", isWebsocket.New())
	app.Use(cors.New())
	app.Use(recover2.New())
	return app
}

func initRunHubs() {
	for i := 0; i < 3; i++ {
		go runHub()
	}
}
