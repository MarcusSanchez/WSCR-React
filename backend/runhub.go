package main

import (
	"WSChatRooms/globals"
	"WSChatRooms/models"
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

var roomsMu = sync.Mutex{}

func registerClient(client *models.Client) {
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
		Client:       client,
		Message:      client.Name + " has joined the room",
		IsFromClient: false,
	}
	globals.Clients[client.Connection] = client
	log.Println("connection registered:  ", client.Name, "in room", client.RoomNumber)
}

func broadcastMessage(newMessage *models.NewMessage) {
	// Send the message to all clients
	createMessageWorker := func(client *models.Client) {
		client.Mu.Lock()
		defer client.Mu.Unlock()

		var message string
		if newMessage.IsFromClient {
			message = newMessage.Client.Name + ": " + newMessage.Message
		} else {
			message = newMessage.Message
		}
		if err := client.Connection.WriteMessage(websocket.TextMessage, []byte(message)); err != nil {
			log.Println("write error:", err)

			client.Connection.WriteMessage(websocket.CloseMessage, []byte{})
			client.Connection.Close()
			globals.Unregister <- client
		}
	}
	for client := range (globals.Rooms[newMessage.Client.RoomNumber]).Clients {
		go createMessageWorker(client)
	}
}

func unregisterClient(client *models.Client) {
	// Remove the client from the hub
	room, _ := globals.Rooms[client.RoomNumber]
	if room.Count == 1 {
		delete(globals.Rooms, client.RoomNumber)
	} else {
		room.Count--
		globals.Broadcast <- &models.NewMessage{
			Client:       client,
			Message:      client.Name + " has left the room",
			IsFromClient: false,
		}
	}
	delete(globals.Clients, client.Connection)
	delete(room.Clients, client)
	log.Println("connection unregistered:", client.Name, "in room", client.RoomNumber)
}
