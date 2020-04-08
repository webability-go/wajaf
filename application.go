package wajaf

type Application NodeDef

func NewApplication(id string) Application {

	app := NewNode("application", "")
	app.SetID(id)

	app.RegisterKnownAttributes([]string{"id", "enforce", "style"})
	app.RegisterKnownChildren([]string{"container", "element"})

	return app
}
