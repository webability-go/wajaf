package wajaf

type TextFieldElement NodeDef

func NewTextFieldElement(id string, data string) TextFieldElement {

	e := NewNode("element", "textfieldelement")
	e.SetID(id)
	e.SetData(data)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom",
		"size", "minlength", "maxlength", "minwords", "maxwords", "format", "visible", "info", "disabled", "readonly", "notnull", "helpmode"})
	e.RegisterKnownMessages([]string{"defaultvalue", "helpdescription", "statusnotnull", "statusbadformat", "statustooshort", "statustoolong", "statustoofewwords", "statustoomanywords", "statuscheck"})

	return e
}
