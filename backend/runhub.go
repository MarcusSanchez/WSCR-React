package main

import (
	"WSChatRooms/globals"
	"WSChatRooms/models"
	"encoding/json"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"

	"log"
	"sync"
)

func runHub() {
	for {
		select {
		case client := <-globals.Register:
			go registerClient(client)

		case newMessage := <-globals.Broadcast:
			go broadcastMessage(newMessage)

		case client := <-globals.Unregister:
			go unregisterClient(client)
		}
	}
}

var commonMu = &sync.Mutex{}
var roomsMutexes = make(map[string]*sync.Mutex)

func registerClient(client *models.Client) {
	commonMu.Lock()
	roomsMu, ok := roomsMutexes[client.RoomNumber]
	if !ok {
		roomsMu = &sync.Mutex{}
		roomsMutexes[client.RoomNumber] = roomsMu
	}
	commonMu.Unlock()
	roomsMu.Lock()
	if room, ok := globals.Rooms[client.RoomNumber]; !ok {
		room = &models.Room{
			Number:  client.RoomNumber,
			Count:   1,
			Clients: make(map[*models.Client]bool),
		}
		room.Clients[client] = true
		globals.Rooms[client.RoomNumber] = room
		roomsMu.Unlock()
	} else {
		roomsMu.Unlock()
		room.Clients[client] = true
		room.Count++
	}
	globals.Broadcast <- &models.NewMessage{
		Client:         client,
		Message:        client.Name + " has joined the room",
		IsAnnouncement: true,
		Type:           "join",
	}
	globals.Clients[client.Connection] = client
	log.Println("connection registered:  ", client.Name, "in room", client.RoomNumber)
}

func broadcastMessage(newMessage *models.NewMessage) {
	// Send the message to all clients
	createMessageWorker := func(client *models.Client) {
		client.Mu.Lock()
		defer client.Mu.Unlock()

		var jsonMessage []byte
		if newMessage.IsAnnouncement {
			announcement := fiber.Map{
				"type": "announcement",
				"data": fiber.Map{
					"message": newMessage.Message,
					"name":    newMessage.Client.Name,
					"type":    newMessage.Type,
				},
			}
		jsonMessage, _ = json.Marshal(announcement)
		} else {
			message := fiber.Map{
				"type": "message",
				"data": fiber.Map{
					"name":    newMessage.Client.Name,
					"message": newMessage.Message,
				},
			}
			jsonMessage, _ = json.Marshal(message)
		}
		if err := client.Connection.WriteMessage(websocket.TextMessage, jsonMessage); err != nil {
			log.Println("write error:", err)

			client.Connection.WriteMessage(websocket.CloseMessage, []byte{})
			client.Connection.Close()
			globals.Unregister <- client
		}
	}
	for client := range (globals.Rooms[newMessage.Client.RoomNumber]).Clients {
		if client != newMessage.Client || newMessage.IsAnnouncement {
			go createMessageWorker(client)
		}
	}
}

func unregisterClient(client *models.Client) {
	// Remove the client from the hub
	room, _ := globals.Rooms[client.RoomNumber]
	if room.Count == 1 {
		delete(globals.Rooms, client.RoomNumber)
		delete(roomsMutexes, client.RoomNumber)
	} else {
		room.Count--
		globals.Broadcast <- &models.NewMessage{
			Client:         client,
			Message:        client.Name + " has left the room",
			IsAnnouncement: true,
			Type:           "leave",
		}
	}
	delete(globals.Clients, client.Connection)
	delete(room.Clients, client)
	log.Println("connection unregistered:", client.Name, "in room", client.RoomNumber)
}
