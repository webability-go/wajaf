package wajaf

type BarContainer NodeDef

func NewBarContainer(id string) BarContainer {

	c := NewNode("container", "barContainer")
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone"})

	return c
}

type BarZone NodeDef

func NewBarZone(id string) BarZone {

	z := NewNode("zone", "")
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}
