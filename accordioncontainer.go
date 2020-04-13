package wajaf

type AccordionContainer struct {
	NodeDef
}

func NewAccordionContainer(id string) *AccordionContainer {

	c := &AccordionContainer{
		NodeDef: NewNode("container", "accordionContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone", "event", "help"})

	return c
}

func (c *AccordionContainer) NewZone(ztype string, id string) NodeDef {
	z := NewAccordionZone(ztype, id)
	c.AddChild(z)
	return z
}

type AccordionZone NodeDef

func NewAccordionZone(ztype string, id string) AccordionZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element", "event", "help"})

	return z
}
