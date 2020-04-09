package wajaf

type TabContainer NodeDef

func NewTabContainer(id string) TabContainer {

	c := NewNode("container", "tabContainer")
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener",
		"mode"})
	c.RegisterKnownChildren([]string{"zone"})

	return c
}

type TabZone NodeDef

func NewTabZone(id string) TabZone {

	z := NewNode("zone", "")
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params",
		"title"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}
