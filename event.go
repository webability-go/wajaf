package wajaf

type Event NodeDef

func NewEvent(name string, value string) Event {

	e := NewNode("event", name)
	e.SetData(value)

	return e
}
