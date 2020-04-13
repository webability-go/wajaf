package wajaf

type GroupContainer struct {
	NodeDef
}

func NewGroupContainer(id string) *GroupContainer {

	c := &GroupContainer{
		NodeDef: NewNode("container", "groupContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone",
		"left", "width", "right", "top", "height", "bottom", "haslistener",
		"varmode", "varorder", "varkey",
		"mode", "authmodes", "key"})
	//	c.RegisterKnownMessages([]string{"alertmessage", "servermessage", "titleinsert", "titleupdate", "titledelete", "titleview", "insertok", "updateok", "deleteok"})
	c.RegisterKnownChildren([]string{"zone", "dataset"})

	return c
}

func (c *GroupContainer) NewZone(ztype string, id string) NodeDef {
	z := NewGroupZone(ztype, id)
	c.AddChild(z)
	return z
}

type GroupZone NodeDef

func NewGroupZone(ztype string, id string) GroupZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}

func (c *GroupContainer) NewDataset(dtype string, data string) NodeDef {
	z := NewGroupDataset(dtype, data)
	c.AddChild(z)
	return z
}

type GroupDataset NodeDef

func NewGroupDataset(dtype string, data string) GroupDataset {

	d := NewNode("dataset", dtype)
	d.SetData(data)

	return d
}
