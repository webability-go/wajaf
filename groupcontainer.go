package wajaf

type GroupContainer NodeDef

func NewGroupContainer(id string) GroupContainer {

	c := NewNode("container", "groupcontainer")
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener",
		"mode", "authmodes", "varkey", "key", "varorder", "varmode"})
	//	c.RegisterKnownMessages([]string{"alertmessage", "servermessage", "titleinsert", "titleupdate", "titledelete", "titleview", "insertok", "updateok", "deleteok"})
	c.RegisterKnownChildren([]string{"zone", "dataset"})

	return c
}

type GroupZone NodeDef

func NewGroupZone(id string) GroupZone {

	z := NewNode("zone", "")
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}

type GroupDataset NodeDef

func NewGroupDataset(data string) GroupDataset {

	d := NewNode("dataset", "")
	d.SetData(data)

	return d
}
