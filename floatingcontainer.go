package wajaf

type FloatingContainer NodeDef

func NewFloatingContainer(id string) FloatingContainer {

	c := NewNode("container", "floatingContainer")
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone"})

	return c
}

type FloatingZone NodeDef

func NewFloatingZone(id string) FloatingZone {

	z := NewNode("zone", "")
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}
