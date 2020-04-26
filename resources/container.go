package resources

type Container map[string][]byte

var ResourcesContainer = NewContainer()

func NewContainer() *Container {
	return &Container{}
}

func (c *Container) Set(name string, data []byte) {
	(*c)[name] = data
}

func (c *Container) Get(name string) []byte {
	return (*c)[name]
}
