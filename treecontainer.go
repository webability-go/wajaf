package wajaf

type TreeContainer NodeDef

func NewTreeContainer(id string) TreeContainer {

	c := NewNode("container", "treeContainer")
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone", "template", "dataset"})

	return c
}

type TreeZone NodeDef

func NewTreeZone(id string) TreeZone {

	z := NewNode("zone", "")
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}

type TreeTemplate NodeDef

func NewTreeTemplate(name string) TreeTemplate {

	t := NewNode("template", "")

	t.RegisterKnownAttributes([]string{"name"})
	t.RegisterKnownChildren([]string{"container", "element"})

	t.SetAttribute("name", name)

	return t
}

type TreeDataset NodeDef

func NewTreeDataset(data string) TreeDataset {

	d := NewNode("dataset", "")
	d.SetData(data)

	return d
}
