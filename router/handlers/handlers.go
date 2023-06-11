package handlers

import (
	"WSChatRooms/globals"
	"WSChatRooms/models"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"

	"log"
	"math/rand"
	"strconv"
	"time"
)

func EstablishClientWS(conn *websocket.Conn) {

	// Register the client
	client := &models.Client{
		Name:       conn.Params("name"),
		RoomNumber: conn.Params("room"),
		Connection: conn,
	}
	globals.Register <- client

	// When the function returns, unregister the client and close the connection
	defer func() {
		globals.Unregister <- client
		client.Connection.Close()
	}()

	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Println("read error:", err)
			}
			return // Calls the deferred function, i.e. closes the connection on error
		}

		if messageType == websocket.TextMessage {
			// Broadcast the received message
			globals.Broadcast <- &models.NewMessage{
				Client:       client,
				Message:      string(message),
				IsFromClient: true,
			}
		} else {
			log.Println("websocket message received of type", messageType, "which is not supported to", client.Name, "in room", client.RoomNumber)
		}
	}
}

func GenerateEmptyRoom(c *fiber.Ctx) error {
	var roomNumber string
	for {
		rand.Seed(time.Now().UnixNano())
		roomNumber = strconv.Itoa(rand.Intn(9999) + 1)
		// "12" -> "0012"
		for len(roomNumber) < 4 {
			roomNumber = "0" + roomNumber
		}
		if _, ok := globals.Rooms[roomNumber]; ok == false {
			break
		}
	}
	return c.SendString(roomNumber)
}
