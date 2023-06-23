package main

import (
	"WSChatRooms/middleware/isWebsocket"
	"WSChatRooms/router"
	"os"

	"github.com/gofiber/fiber/v2/middleware/cors"
	recovery "github.com/gofiber/fiber/v2/middleware/recover"

	"github.com/gofiber/fiber/v2"

	"log"
)

func main() {
	app := initFiber()
	initRunHubs()
	router.StartRouting(app)

	port := initPort()
	log.Fatal(app.Listen("0.0.0.0:" + port))
}

func initFiber() *fiber.App {
	app := fiber.New()
	app.Static("/", "./public")
	app.Use("/ws", isWebsocket.New())
	app.Use(cors.New())
	app.Use(recovery.New())
	return app
}

func initRunHubs() {
	for i := 0; i < 3; i++ {
		go runHub()
	}
}

func initPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	return port
}
