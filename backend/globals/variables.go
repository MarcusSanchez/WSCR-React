package globals

import (
	"WSChatRooms/models"

	"github.com/gofiber/websocket/v2"
)

var (
	Clients = make(map[*websocket.Conn]*models.Client) // Note: although large maps with pointer-like types (e.g. strings) as keys are slow, using pointers themselves as keys is acceptable and fast
	Rooms   = make(map[string]*models.Room)

	Register   = make(chan *models.Client)
	Unregister = make(chan *models.Client)
	Broadcast  = make(chan *models.NewMessage)
)
