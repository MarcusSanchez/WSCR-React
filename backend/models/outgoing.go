package models

type OutgoingMessage struct {
	Type string      `json:"type"`
	Data MessageData `json:"data"`
}

type MessageData struct {
	Name    string `json:"name"`
	Message string `json:"message"`
}

type OutGoingAnnouncement struct {
	Type string           `json:"type"`
	Data AnnouncementData `json:"data"`
}

type AnnouncementData struct {
	Message string `json:"message"`
	Name    string `json:"name"`
	Type    string `json:"type"`
}
