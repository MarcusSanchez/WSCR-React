package router

import (
	"WSChatRooms/router/handlers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

func StartRouting(app *fiber.App) {
	app.Get("/ws/:name/:room", websocket.New(handlers.EstablishClientWS))
	app.Get("/generateRoom", handlers.GenerateEmptyRoom)
	app.Get("/info/:room", handlers.GetRoomInfo)
}
