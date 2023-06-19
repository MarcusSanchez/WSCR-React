package models

import (
	"github.com/gofiber/websocket/v2"

	"sync"
)

type Client struct {
	Mu         sync.Mutex
	Name       string
	RoomNumber string
	Connection *websocket.Conn
}

type NewMessage struct {
	Client         *Client
	Message        string
	IsAnnouncement bool
}

type Room struct {
	Number  string
	Count   int
	Clients map[*Client]bool
}
