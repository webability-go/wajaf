package wajaf

type Event NodeDef

func NewEvent(etype string, code string) Event {

	e := NewNode("event", etype)
	c := NewNode("code", "")
	c.SetData(code)
	e.AddChild(c)

	return e
}
