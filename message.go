package wajaf

type Message NodeDef

func NewMessage(name string, value string) Message {

	e := NewNode(name, "")
	e.SetData(value)

	return e
}
