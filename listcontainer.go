package wajaf

type ListContainer NodeDef

func NewListContainer(id string) ListContainer {

	c := NewNode("container", "listContainer")
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone", "template", "dataset"})

	return c
}

type ListZone NodeDef

func NewListZone(id string) ListZone {

	z := NewNode("zone", "")
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}

type ListTemplate NodeDef

func NewListTemplate(name string) ListTemplate {

	t := NewNode("template", "")

	t.RegisterKnownAttributes([]string{"name"})
	t.RegisterKnownChildren([]string{"container", "element"})

	t.SetAttribute("name", name)

	return t
}

type ListDataset NodeDef

func NewListDataset(data string) ListDataset {

	d := NewNode("dataset", "")
	d.SetData(data)

	return d
}
