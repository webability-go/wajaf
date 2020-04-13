package wajaf

type TextAreaFieldElement NodeDef

func NewTextAreaFieldElement(id string) TextAreaFieldElement {

	e := NewNode("element", "textareafieldElement")
	e.SetID(id)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom",
		"areawidth", "areaheight", "minlength", "maxlength", "minwords", "maxwords", "format", "visible", "info", "disabled", "readonly", "notnull", "helpmode"})
	//	e.RegisterKnownMessages([]string{"defaultvalue", "helpdescription", "statusnotnull", "statusbadformat", "statustooshort", "statustoolong", "statustoofewwords", "statustoomanywords", "statuscheck"})

	return e
}
